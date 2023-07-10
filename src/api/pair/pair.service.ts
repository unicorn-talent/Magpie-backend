import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePairDto } from './pair.dto';
import { Pair } from './pair.entity';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Cron } from '@nestjs/schedule';
import gql from 'graphql-tag';

@Injectable()
export class PairService {
  @InjectRepository(Pair)
  private readonly repository: Repository<Pair>;
  public getPair(id: number): Promise<Pair> {
    return this.repository.findOne(id);
  }

  public createPair(body: CreatePairDto): Promise<Pair> {
    const pair: Pair = this.repository.create(body);
    return this.repository.save(pair);
  }

  public async upsert(pair: Pair): Promise<Pair> {
    const existingPair = await this.repository.findOne({ pair: pair.pair });

    if (existingPair) {
      // Pair already exists, perform update
      Object.assign(existingPair, pair);
      return this.repository.save(existingPair);
    } else {
      // Pair does not exist, perform insert
      return this.repository.save(pair);
    }
  }

  @Cron('0 */30 * * * *')
  async handleCron() {
    const subgraphUrl = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';
    const apolloClient: ApolloClient<unknown> = new ApolloClient({
      uri: subgraphUrl,
      cache: new InMemoryCache(),
    });
    const query = gql`
      {
        pools {
          id
          token0 {
            symbol
            name
            id
          }
          token1 {
            symbol
            name
            id
          }
        }
      }
    `;

    try {
      const response = await apolloClient.query({ query });
      const pools = response.data.pools;

      const poolDetails = pools.map((pool) => ({
        pair: pool.id,
        name: `${pool.token0.name} - ${pool.token1.name}`,
        token0_id: pool.token0.id,
        token0_name: pool.token0.name,
        token1_id: pool.token1.id,
        token1_name: pool.token1.name,
      }));

      for (const pool of poolDetails) {
        await this.upsert(pool);
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
      throw error;
    }
  }
}
