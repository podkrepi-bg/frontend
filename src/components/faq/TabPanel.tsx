import React from 'react'

type Props = {
  value: number
  index: number
  children: JSX.Element[]
}

const TabPanel = ({ value, index, children }: Props) => {
  return <div role="tabpanel">{value === index && children}</div>
}

export default TabPanel
