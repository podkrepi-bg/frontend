import fs from 'fs'
import { ConnectionOptions } from 'typeorm'
import getConfig from 'next/config'

import { Contact } from 'entity/Contact'

const {
  serverRuntimeConfig: { DB_HOST, DB_USER, DB_PASS, DB_PORT, DB_NAME },
} = getConfig()

export const connectionOptions: ConnectionOptions = {
  name: 'default',
  type: 'cockroachdb',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  schema: 'api',
  // ssl: true,
  // ssl: {
  //   rejectUnauthorized: false,
  //   ca: fs.readFileSync('/certs/ca.crt').toString(),
  //   key: fs.readFileSync('/certs/client.root.key').toString(),
  //   cert: fs.readFileSync('/certs/client.root.crt').toString(),
  // },
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync('/certs/ca.crt').toString(),
    key: fs.readFileSync('/certs/client.root.key').toString(),
    cert: fs.readFileSync('/certs/client.root.crt').toString(),
  },
  // ssl: {
  //   rejectUnauthorized: false,
  //   ca: '/certs/ca.crt',
  //   key: '/certs/client.root.key',
  //   cert: '/certs/client.root.crt',
  // },
}

console.log(connectionOptions)
console.log('./entity/*.{js,ts}')
const config: ConnectionOptions = {
  ...connectionOptions,
  // synchronize: true,
  // entities: ['src/entity/**/*.ts'],
  // migrations: ['db/migrations/**/*.ts'],
  // // subscribers: ['src/subscriber/**/*.ts'],
  // cli: {
  //   entitiesDir: 'src/entity',
  //   migrationsDir: 'db/migrations',
  //   subscribersDir: 'src/subscriber',
  // },

  // entities name should be **.entity.ts
  entities: [Contact],
  // entities: ['entity/*.{js,ts}', './entity/*.{js,ts}', './entity/**/*.{js,ts}'],

  // We are using migrations, synchronize should be set to false.
  // synchronize: process.env.TYPEORM_SYNCHRONIZE
  //  ? process.env.TYPEORM_SYNCHRONIZE.toLowerCase() === 'true'
  //  : false,
  synchronize: true,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,

  logging: true,
  // logger: 'advanced-console',

  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: ['./db/migrations/*{.ts,.js}'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: './db/migrations',
  },
}

export default config
