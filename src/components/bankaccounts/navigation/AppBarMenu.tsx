import DeleteIcon from '@mui/icons-material/Delete'
import Container from '@mui/material/Container'
import AddIcon from '@mui/icons-material/Add'
import Tooltip from '@mui/material/Tooltip'
import { ModalStore } from 'stores/cars/ModalStore'
import Toolbar from '@mui/material/Toolbar'
import { Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react'
import Box from '@mui/material/Box'
import { routes } from 'common/routes'
import { AlertStore } from 'stores/AlertStore'
import { useTranslation } from 'next-i18next'
const addIconStyles = {
  transform: 'scale(1.3)',
  background: '#4ac3ff',
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 1.2,
  boxShadow: 3,
}
export default observer(function AppBarMenu() {
  const { openCfrm, carSelected } = ModalStore
  const router = useRouter()
  const { t } = useTranslation()
  const deleteHandler = () => {
    carSelected ? openCfrm() : AlertStore.show(t('common:alerts.noselected'), 'info')
  }

  return (
    <AppBar elevation={0} sx={{ background: 'none', pl: 0, pb: 2 }} position="static">
      <Container disableGutters maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4">Банкови сметки</Typography>
          <Box>
            <Tooltip title="Добави">
              <AddIcon
                onClick={() => {
                  router.push(routes.bankaccounts.add)
                }}
                sx={addIconStyles}
                style={{ marginRight: '20px' }}
                fontSize="large"></AddIcon>
            </Tooltip>
            <Tooltip title="Изтрий избраните">
              <DeleteIcon
                style={{ background: '#f7f7f7', color: 'red' }}
                onClick={deleteHandler}
                sx={addIconStyles}
                fontSize="large"></DeleteIcon>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
})
