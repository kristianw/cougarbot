// import { localConfig } from './../../config/local.config.example';
import { Database } from "./interfaces";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { config } from '../../config/local.config';

const dialect = new PostgresDialect({
    pool: new Pool({
      database: config.databaseName,
      host: config.databaseHost,
      user: config.databaseUsername,
      password: config.databasePassword,
      port: config.databasePort,
      max: 20,  
    })
  })
  
  export const db = new Kysely<Database>({
    dialect,
  })
