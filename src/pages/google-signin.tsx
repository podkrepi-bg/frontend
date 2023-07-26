import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'

const GoogleSignIn = () => {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (!session) signIn('google')
    if (session) window.close()
  }, [session, status])

  return null
}

export default GoogleSignIn
