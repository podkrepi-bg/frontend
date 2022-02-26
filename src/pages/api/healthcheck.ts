import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse<{ status: string }>) => {
  res.status(200).json({ status: 'OK' })
}
