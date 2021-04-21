import getConfig from 'next/config'
import type { NextApiRequest, NextApiResponse } from 'next'

const {
  serverRuntimeConfig: {
    services: { apiUrl },
  },
} = getConfig()

export default async function ContactProxy(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(`${apiUrl}/api/v1/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req?.body),
    })

    const json = await response.json()
    console.log(json)
    res.status(response.status).json(json)
  } catch (error) {
    console.error('error:' + error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
