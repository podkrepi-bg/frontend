import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ListIcon from '@mui/icons-material/List'
import AddIcon from '@mui/icons-material/Add'
import ListItem from '@mui/material/ListItem'
import ProfileMenu from './ProfileMenu'
import { Button } from '@mui/material'
import PodkrepiLogo from 'components/brand/PodkrepiLogo'
import { context } from '../context'
import { useRouter } from 'next/router'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import { AlertStore } from '../NotificationsAlert/AlertStore'
import { FormikHelpers } from 'formik'
import { SettingsSharp } from '@mui/icons-material'
import { useCampaignTypesList } from 'common/hooks/campaigns'

interface SearchProps {
  key: string
}

export default function Nav() {
  const router = useRouter()
  const all = useCampaignTypesList().data || []
  const vals: SearchProps = { key: '' }

  const onSubmit = async (values: SearchProps, { resetForm }: FormikHelpers<SearchProps>) => {
    try {
      localStorage.setItem('res', '[]')
      const key = values.key
      const res = all.filter((x) => x.name.toLocaleLowerCase().includes(key.toLocaleLowerCase()))

      localStorage.setItem('res', JSON.stringify(res))
      resetForm()
    } catch (error) {
      console.error(error)
      AlertStore.show('An error occured', 'error')
    }
  }

  const store = React.useContext(context)
  const [open, setOpen] = React.useState(store.isOpen)
  const theme = useTheme()

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{ backgroundColor: 'white', border: 'none', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton onClick={() => router.push('/')} style={{ paddingRight: '20px' }}>
            <PodkrepiLogo />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              store.changeIsOpen(!store.isOpen)
              setOpen(store.isOpen)
            }}>
            <MenuIcon />
          </IconButton>
          <GenericForm initialValues={vals} onSubmit={onSubmit}>
            <FormTextField name="key" type="text" label="Search"></FormTextField>
          </GenericForm>

          <ProfileMenu></ProfileMenu>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        variant="persistent"
        PaperProps={{
          style: {
            height: '100%',
            marginTop: '4.2%',
            border: 'none',
          },
        }}
        sx={{
          width: '15%',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '15%',
            boxSizing: 'border-box',
          },
        }}>
        <Divider />
        <List sx={{ overflow: 'hidden' }}>
          <ListItem button sx={{ ':hover': { color: theme.palette.primary.dark } }}>
            <IconButton
              sx={{ ':hover': { color: theme.palette.primary.dark } }}
              onClick={() => {
                router.push('/admin/campaign-types')
              }}>
              <ListIcon fontSize="small"></ListIcon>
            </IconButton>
            <Button
              onClick={() => {
                router.push('/admin/campaign-types')
              }}
              sx={{ ':hover': { color: theme.palette.primary.main } }}>
              All campaign types
            </Button>
          </ListItem>
          <ListItem sx={{ ':hover': { color: theme.palette.primary.dark } }}>
            <IconButton
              sx={{ ':hover': { color: theme.palette.primary.dark } }}
              onClick={() => {
                router.push('/admin/campaign-types/add')
              }}>
              <AddIcon fontSize="small"></AddIcon>
            </IconButton>
            <Button
              onClick={() => {
                router.push('/admin/campaign-types/add')
              }}
              sx={{ ':hover': { color: theme.palette.primary.main } }}>
              Add campaign type
            </Button>
          </ListItem>
        </List>
        <footer style={{ position: 'relative', top: '450px' }}>
          <IconButton>
            <SettingsSharp></SettingsSharp>
          </IconButton>
          <Button>Настройки</Button>
        </footer>
      </Drawer>
    </Box>
  )
}
