import type { NextApiRequest, NextApiResponse } from 'next'

export type ContactResponse = {
  input: unknown
  success: boolean
}
export default async (req: NextApiRequest, res: NextApiResponse<ContactResponse>) => {
  res.status(200).json({
    success: true,
    input: req?.body,
  })
}
