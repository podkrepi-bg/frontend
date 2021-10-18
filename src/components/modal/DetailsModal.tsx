import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core'
import React from 'react'
import { observer } from 'mobx-react'
import { DialogStore } from 'stores/DialogStore'
import { useTranslation } from 'react-i18next'
import { dateFormatter } from 'common/util/date'
import { Check, Clear } from '@material-ui/icons'

function DetailsModal() {
  const { getDialogs } = DialogStore
  const handleClose = () => DialogStore.hide()
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
              {/* TODO: Extract concrete implementation and use generic one */}
              <Grid item xs={12}>
                <List>
                  <ListItem>
                    <ListItemText
                      primary={`${row.getValue(row.id, 'name')}`}
                      secondary={row.row.person.company}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={row.row.person.email} secondary={row.row.person.phone} />
                  </ListItem>
                  <ListItem>{dateFormatter(row.row.createdAt)}</ListItem>
                  <ListItem>
                    <Typography variant="body2">{row.row.message || row.row.comment}</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="caption">{row.row.person.id}</Typography>
                  </ListItem>
                  {'associationMember' in row.row &&
                    [
                      'associationMember',
                      'benefactorCampaign',
                      'benefactorPlatform',
                      'companyOtherText',
                      'companySponsor',
                      'companyVolunteer',
                      'partnerBussiness',
                      'partnerNpo',
                      'partnerOtherText',
                      'roleAssociationMember',
                      'roleBenefactor',
                      'roleCompany',
                      'rolePartner',
                      'roleVolunteer',
                      'volunteerBackend',
                      'volunteerDesigner',
                      'volunteerDevOps',
                      'volunteerFinancesAndAccounts',
                      'volunteerFrontend',
                      'volunteerLawyer',
                      'volunteerMarketing',
                      'volunteerProjectManager',
                      'volunteerQa',
                      'volunteerSecurity',
                    ].map((k, i) => (
                      <ListItem key={i}>
                        <ListItemText
                          primary={k}
                          secondary={row.row[k] ? <Check color="primary" /> : <Clear />}
                        />
                      </ListItem>
                    ))}
                </List>
              </Grid>
              {/*  */}
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
