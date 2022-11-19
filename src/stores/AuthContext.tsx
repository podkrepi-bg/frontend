'use client'

import { SessionProvider, SessionProviderProps } from 'next-auth/react'
import { PropsWithChildren } from 'react'

export default function AuthContext({
  children,
  ...props
}: PropsWithChildren<SessionProviderProps>) {
  return <SessionProvider {...props}>{children}</SessionProvider>
}
