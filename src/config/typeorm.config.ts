import { ConnectionOptions } from 'typeorm';
import env from './env';

const typeOrmConfig: ConnectionOptions = {
  type: 'mysql',
  host: env.database.host,
  port: env.database.port,
  username: env.database.username,
  password: env.database.password,
  database: env.database.database,
  migrationsTableName: 'order_api_migration',
  migrations: ['database/migrations/*.{js,ts}'],
  cli: {
    migrationsDir: 'database/migrations',
  },
};

export = typeOrmConfig;
