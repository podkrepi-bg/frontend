import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'next-i18next'

import { CountryResponse } from 'gql/countries'

const useStyles = makeStyles({
  infoBtn: {
    margin: '0 auto',
  },
})

type Props = {
  open: boolean
  closeFn: () => void
  country: CountryResponse
}

const InfoDialog = ({ open, closeFn, country }: Props) => {
  const { t } = useTranslation('country')
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={closeFn} maxWidth="xs">
      <DialogTitle>{t('headings.country-info')}</DialogTitle>
      <DialogContent>
        <p>
          <b>Id:</b> {country.id}
        </p>
        <p>
          <b>{t('fields.name')}:</b> {country.name}
        </p>
        <p>
          <b>{t('fields.country-code')}:</b> {country.countryCode}
        </p>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" className={classes.infoBtn} onClick={closeFn}>
          {t('btns.close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default InfoDialog
