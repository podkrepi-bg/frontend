import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'

export const getServerSideProps = () => ({ props: {} })

export default function TestClientError() {
  useEffect(() => {
    try {
      throw new Error('Test Client Error')
    } catch (error) {
      Sentry.captureException(error)
    }
  }, [])

  return (
    <div>
      <button
        onClick={() => {
          throw new Error('Test Runtime Client Error')
        }}>
        Click me
      </button>
    </div>
  )
}
