import type { NextApiRequest, NextApiResponse } from 'next'

export type TimeoutResponse = {
  input: any
  success: boolean
}

function delay(timeout: number, val?: any) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(val)
    }, timeout)
  })
}

export default async (req: NextApiRequest, res: NextApiResponse<TimeoutResponse>) => {
  await delay(1500)

  const success = Math.random() >= 0.5
  const status = success ? 200 : 400
  res.status(status).json({
    success,
    input: req?.body,
  })
}
