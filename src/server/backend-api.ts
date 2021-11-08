import type { NextApiRequest, NextApiResponse } from 'next'
import { AxiosError } from 'axios'
import { ApiErrors } from 'common/api-errors'
import { apiBackend } from 'common/api-client'
import { csrf } from 'common/csrf'

export const apiHandler = (url: string) =>
  csrf(async (req: NextApiRequest, res: NextApiResponse) => {
    //const url = `https://podkrepi.bg/api/login`
    try {
      const result = await apiBackend.post(url, req.body)
      res.status(200).json({ data: result.data })
    } catch (err: unknown) {
      res.status((err as AxiosError<ApiErrors>).response?.status || 400).json({
        error: 'critical error',
        data: { error_description: (err as AxiosError<ApiErrors>).message },
      })
    }
  })
