import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import * as React from 'react'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import Link from 'next/link'
import CustomListItem from './CustomListItem'
import { useRouter } from 'next/router'

type Props = {
  menu: string
  submenu: submenu
  icon: React.ElementType
}
type submenu = {
  label: string
  icon: React.ElementType
  href: string
}[]
export default function SubMenu({ menu, submenu, icon: Icon }: Props) {
  const [openSub, setOpenSub] = React.useState(false)
  const router = useRouter()
  const handleClick = () => {
    setOpenSub(!openSub)
  }
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{<Icon />}</ListItemIcon>
        <ListItemText primary={menu} />
        {openSub ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSub} timeout="auto" unmountOnExit>
        <List sx={{ p: '0rem 0rem', height: '100%', position: 'relative' }}>
          {submenu.map(({ label, icon: Icon, href }) => (
            <CustomListItem
              key={label}
              selected={href !== '#' && router.asPath.includes(href)}
              icon={<Icon />}
              label={label}
              onClick={() => router.push(href)}
              sx={{ pl: 2 }}
            />
          ))}
        </List>
      </Collapse>
    </>
  )
}
