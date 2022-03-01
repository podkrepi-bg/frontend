import * as React from 'react'

type Props = {
  children: React.ReactNode
}

export default function BootcampLayout({ children }: Props) {
  return (
    <>
      <h1>Welcome</h1>
      {children}
    </>
  )
}
