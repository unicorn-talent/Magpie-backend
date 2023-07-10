# Magpie Backend test assessment

## Project requirements

- Set up a new NestJS project with TypeScript
- Create any kind of database with a table named 'pairs' containing the following columns
- Create a service to fetch data from the Uniswap subgraph using the GraphQL query provided in the Uniswap documentation
- Implement a function in the service to parse the fetched data and store it in the 'pairs' table, updating existing entries if necessary.
- Set up a periodic task (e.g., using NestJS Cron or setInterval) to fetch data from the Uniswap subgraph and synchronise the data in the database every 30 minutes.
- Provide clear instructions on how to set up the application and run it locally.

## Result run

- Install node modules and postgresql
  1. `npm install`
  2. set environments in .env file - /src/common/envs/development.env
- `npm run start:dev`

## Result view

- Check the database using PAdmin or Navicate
