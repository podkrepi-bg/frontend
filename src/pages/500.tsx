import { NextPageContext } from 'next'
import NextError from 'next/error'

export default function NotFound(ctx: NextPageContext) {
  return (
    <>
      {JSON.stringify(ctx.err)}
      <NextError statusCode={ctx.err?.statusCode || 500} />
    </>
  )
}
