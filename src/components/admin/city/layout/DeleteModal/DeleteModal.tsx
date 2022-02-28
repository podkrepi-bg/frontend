import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { DeleteModalStore } from './DeleteModalStore'
import { useTheme } from '@mui/styles'
import { AlertStore } from '../NotificationsAlert/AlertStore'
import { useQuery } from 'react-query'
import { CityResponse } from 'gql/city'
import { endpoints } from 'common/api-endpoints'

function DetailsModal() {
  const theme = useTheme()
  const { getDialogs } = DeleteModalStore
  const handleClose = () => DeleteModalStore.hide()
  const { t } = useTranslation()
  const query = useQuery<CityResponse[]>(endpoints.city.listCities.url)

  const onYesButtonClick = async (id: string) => {
    axios
      .delete(`http://localhost:5010/api/city/remove/${id}`)
      .then(() => {
        DeleteModalStore.clear()
        AlertStore.show('Successfully removed city', 'success')
        query.refetch()
      })
      .catch((e) => {
        console.log(e)

        AlertStore.show('An error occured', 'error')
      })
  }

  return (
    <>
      {getDialogs.map(({ id, show, title, row }) => {
        return (
          <Dialog
            key={id}
            onClose={handleClose}
            open={show}
            maxWidth="md"
            PaperProps={{ elevation: 5 }}
            BackdropProps={{ style: { opacity: 0.3 } }}>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent dividers>
              <Grid item xs={12}>
                <Typography variant="h5" style={{ textAlign: 'center' }} component="h2">
                  {t('city:sure')}
                </Typography>
                <div style={{ textAlign: 'center', marginTop: '2%' }}>
                  <Button
                    onClick={async () => await onYesButtonClick(row.id)}
                    variant="outlined"
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: 'white',
                    }}>
                    Yes
                  </Button>
                  <Button
                    onClick={() => DeleteModalStore.clear()}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.background.default,
                    }}
                    variant="outlined"
                    style={{ marginLeft: '1%' }}>
                    No
                  </Button>
                </div>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose} color="primary">
                {t('common:close')}
              </Button>
            </DialogActions>
          </Dialog>
        )
      })}
    </>
  )
}

export default observer(DetailsModal)
