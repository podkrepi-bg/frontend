import { Box, Button, Card, CardContent, Dialog, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

interface Props {
  open: boolean
  closeModal: () => void
  confirmHandler: () => void
}

function DeleteModal({ open, closeModal, confirmHandler }: Props) {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onClose={closeModal} sx={{ top: '-40%' }}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('bootcamp:alert.delete-row.question')}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            {t('bootcamp:titles.delete-content')}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button color="error" onClick={confirmHandler}>
              {t('bootcamp:btns.confirm')}
            </Button>
            <Button onClick={closeModal}>{t('bootcamp:btns.cancel')}</Button>
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  )
}

export default DeleteModal
