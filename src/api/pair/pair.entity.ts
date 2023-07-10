import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Pair {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', default: false })
  public pair: string;

  @Column({ type: 'varchar', default: false })
  public name: string;

  @Column({ type: 'varchar', default: false })
  public token0_id: string;

  @Column({ type: 'varchar', default: false })
  public token0_name: string;

  @Column({ type: 'varchar', default: false })
  public token1_id: string;

  @Column({ type: 'varchar', default: false })
  public token1_name: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
