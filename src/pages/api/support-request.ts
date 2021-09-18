import getConfig from 'next/config'
import { createClient } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'

import { SupportRequestData } from 'components/support-form/helpers/support-form.types'

const {
  serverRuntimeConfig: {
    services: { apiUrl },
  },
} = getConfig()

export async function SupportRequestSupabase(req: NextApiRequest, res: NextApiResponse) {
  try {
    const supportRequest = req?.body
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_KEY || '',
    )
    const { data, error } = await supabase.from<SupportRequestData>('support_requests').insert([
      {
        ...supportRequest,
        environment: process.env.APP_ENV,
      },
    ])
    if (error) {
      res.status(400).json({ error })
    } else {
      res.status(200).json(data)
    }
  } catch (error) {
    console.error('error:' + error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default async function SupportRequestProxy(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(`${apiUrl}/api/v1/support-request`, {
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
