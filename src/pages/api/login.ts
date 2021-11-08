import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosResponse, AxiosError } from 'axios'
import { ApiErrors } from 'common/api-errors'
import { csrf } from 'common/csrf'
import { LoginFormData, LoginResponse } from 'gql/auth'

const login = async (req: NextApiRequest, res: NextApiResponse<LoginResponse>) => {
  //const url = `${process.env.API_URL}/api/login`
  const url = `https://podkrepi.bg/api/login`
  try {
    const result = await axios.post<LoginFormData, AxiosResponse<LoginResponse>>(url, req.body)
    res.status(200).json({ data: result.data })
  } catch (err: unknown) {
    res.status(400).json({
      error: 'critical error',
      data: { error_description: (err as AxiosError<ApiErrors>).message },
    })
  }
}

export default csrf(login)
