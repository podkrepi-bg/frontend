import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { publicHash } = req.query

  if (!publicHash || typeof publicHash !== 'string') {
    return res.status(400).json({ error: 'Invalid publicHash parameter' })
  }

  try {
    const { backend } = req.query
    const baseUrl =
      backend === 'production'
        ? 'https://paybyclick.irispay.bg'
        : 'https://dev.paybyclick.irispay.bg'

    const response = await fetch(
      `${baseUrl}/backend/payment/banks/${publicHash}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (!response.ok) {
      return res.status(response.status).json({
        error: `External API error: ${response.statusText}`,
      })
    }

    const data = await response.json()

    // Set CORS headers for your frontend
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    return res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching banks:', error)
    return res.status(500).json({
      error: 'Failed to fetch banks from external API',
    })
  }
}
