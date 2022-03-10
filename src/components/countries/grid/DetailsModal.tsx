import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'next-i18next'

import { ModalStore } from 'stores/dashboard/ModalStore'
import { useCountry } from 'common/hooks/countries'

import { CountryResponse } from 'gql/countries'

const useStyles = makeStyles({
  infoBtn: {
    margin: '0 auto',
  },
})

export default observer(function DetailsModal() {
  const { isDetailsOpen, hideDetails, selectedRecord } = ModalStore
  const { data }: UseQueryResult<CountryResponse> = useCountry(selectedRecord.id)
  const { t } = useTranslation('countries')

  const classes = useStyles()

  return (
    <Dialog open={isDetailsOpen} onClose={hideDetails} maxWidth="xs" disableScrollLock>
      <DialogTitle>{t('headings.info')}</DialogTitle>
      <DialogContent>
        <p>
          <b>Id:</b> {data?.id}
        </p>
        <p>
          <b>{t('fields.name')}:</b> {data?.name}
        </p>
        <p>
          <b>{t('fields.country-code')}:</b> {data?.countryCode}
        </p>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          className={classes.infoBtn}
          onClick={hideDetails}>
          {t('btns.close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
})
