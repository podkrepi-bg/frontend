import { createConnection, getConnection } from 'typeorm'
import type { NextApiRequest, NextApiResponse } from 'next'

import 'reflect-metadata'

import { connectionOptions } from 'ormconfig'
import { Contact } from 'entity/Contact'

export type TimeoutResponse = {
  input: unknown
  success: boolean
}

const myConnection = async () => {
  try {
    return getConnection()
  } catch (error) {
    return createConnection(connectionOptions)
  }
}

export default async (req: NextApiRequest, res: NextApiResponse<TimeoutResponse>) => {
  const connection = await myConnection()
  connection.getMetadata(Contact)
  // connection.connect()
  connection.synchronize(true)

  const { manager } = connection

  const contact = manager.create(Contact, {
    firstName: 'ilko',
    lastName: 'kacharov',
    message: 'test message',
  })
  console.log(contact)
  await manager.save(contact)

  console.log(manager.find(Contact))
  // .createQueryBuilder()
  // .insert()
  // .into(User)
  // .values([
  //   { firstName: 'Timber', lastName: 'Saw' },
  //   { firstName: 'Phantom', lastName: 'Lancer' },
  // ])
  // .execute()

  res.status(200).json({
    success: true,
    input: req?.body,
  })
}
