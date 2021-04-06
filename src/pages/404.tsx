import { NextPageContext } from 'next'
import NextError from 'next/error'

export default function NotFound(ctx: NextPageContext) {
  return <NextError statusCode={ctx.err?.statusCode || 404} />
}
