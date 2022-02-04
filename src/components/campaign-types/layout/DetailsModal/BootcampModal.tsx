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
import { CampaignTypesResponse } from 'gql/campaign-types'
import axios from 'axios'
import { endpoints } from 'common/api-endpoints'

function DetailsModal() {
  const [parentType, setParentType] = React.useState<CampaignTypesResponse>()
  const { getDialogs } = DialogStore
  const handleClose = () => {
    DialogStore.hide()
    setParentType(undefined)
  }
  const { t } = useTranslation()
  getParentType()
  async function getParentType() {
    const id = getDialogs[0]?.row.parentId || ''
    if (id !== '') {
      const res = (
        await axios.get(
          'http://localhost:5010/api' + endpoints.campaignTypes.viewCampaignType(id || '').url,
        )
      ).data
      setParentType(res)
    }
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
                <List>
                  <ListItem>
                    <Typography>Campaign type Info</Typography>
                  </ListItem>
                  <Divider></Divider>
                  <ListItem>
                    <Typography>Type: {row.name}</Typography>
                  </ListItem>
                  {row.description ? (
                    <ListItem>
                      <Typography>Description: {row.description}</Typography>
                    </ListItem>
                  ) : null}
                  {parentType ? (
                    <ListItem>
                      <Typography>Category: {parentType?.name}</Typography>
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
