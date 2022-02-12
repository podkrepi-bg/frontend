import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material'
import React from 'react'
import { observer } from 'mobx-react'
import { DialogStore } from './BootcampModalStore'
import { useTranslation } from 'react-i18next'

function DetailsModal() {
  const { getDialogs } = DialogStore

  const handleClose = () => {
    DialogStore.hide()
  }
  const { t } = useTranslation()

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
                <List>
                  <ListItem>
                    <Typography>Person Info</Typography>
                  </ListItem>
                  <Divider></Divider>
                  <ListItem>
                    <Typography>
                      Name: {row.firstName} {row.lastName}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>Email: {row.email}</Typography>
                  </ListItem>
                  {row.phone ? (
                    <ListItem>
                      <Typography>Phone: {row.phone}</Typography>
                    </ListItem>
                  ) : null}
                  {row.adress ? (
                    <ListItem>
                      <Typography>Adress: {row.adress}</Typography>
                    </ListItem>
                  ) : null}
                  {row.company ? (
                    <ListItem>
                      <Typography>Company: {row.company}</Typography>
                    </ListItem>
                  ) : null}
                </List>
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
