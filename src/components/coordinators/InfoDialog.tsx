import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'next-i18next'
const useStyles = makeStyles({
  infoBtn: {
    margin: '0 auto',
  },
})

type Props = {
  open: boolean
  closeFn: () => void
  data: { id: string; name: string } | undefined
}

const InfoDialog = ({ open, closeFn, data }: Props) => {
  const { t } = useTranslation('countries')
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={closeFn} maxWidth="xs" disableScrollLock>
      <DialogTitle>{t('headings.info')}</DialogTitle>
      <DialogContent>
        <p>
          <b>Id:</b> {data?.id}
        </p>
        <p>
          <b>{t('fields.name')}:</b> {data?.name}
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
