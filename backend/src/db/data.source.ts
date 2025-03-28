import { DataSource } from "typeorm";
import * as dotenv from "dotenv"
import { DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

dotenv.config({
  path: process.env.NODE_ENV !== undefined ? `.${process.env.NODE_ENV.trim()}.env` : '.env'
})


const config: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/../migrations/*{.ts,.js}"],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  extra: {
    connectionLimit: 10, // Evita demasiadas conexiones abiertas
    queueLimit: 0,
    acquireTimeout: 10000, // Tiempo de espera antes de fallar la conexión
  },
}

console.log(config)

export const initDataSource: DataSource = new DataSource(config)
