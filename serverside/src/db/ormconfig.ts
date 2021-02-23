import path from 'path';
import { ConnectionOptions } from 'typeorm';

import { config } from '@shared/config';

if (config.local == null) {
  throw new Error('config error');
}

const options: ConnectionOptions = {
  name: config.local.database.name,
  type: config.local.database.type,
  host: config.local.database.host,
  username: config.local.database.username,
  password: config.local.database.password,
  database: config.local.database.database,
  synchronize: false,
  entities: ['./serverside/src/db/entities/**/*.ts'],
  migrations: ['./serverside/src/db/migrations/**/*.ts'],
  subscribers: ['./serverside/src/db/subscribers/**/*.ts'],
  cli: {
    entitiesDir: './serverside/src/db/entities',
    migrationsDir: './serverside/src/db/migrations',
    subscribersDir: './serverside/src/db/subscribers',
  },
  logging: true, // ログレベルを設定できるがとりあえずでtrueにしておく
};

console.log(options);
export = options;
