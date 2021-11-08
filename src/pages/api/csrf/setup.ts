import type { NextApiRequest, NextApiResponse } from 'next'
import { setup } from 'common/csrf'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200
  res.json({ message: 'CSRF token added to cookies' })
}

export default setup(handler)
