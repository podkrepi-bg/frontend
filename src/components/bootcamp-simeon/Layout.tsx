import * as React from 'react'
import BootcampAppbar from './Appbar'

interface Props {
  children: React.ReactNode
}

function Layout({ children }: Props) {
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpenClose = () => {
    open ? setOpen(false) : setOpen(true)
  }

  return (
    <>
      <BootcampAppbar open={open} handler={handleDrawerOpenClose} />
    </>
  )
}

export default Layout
