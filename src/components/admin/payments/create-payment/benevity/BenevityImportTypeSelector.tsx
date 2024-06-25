import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { CreatePaymentStore, TImportType } from '../../store/CreatePaymentStore'
import { observer } from 'mobx-react'
import { useContext } from 'react'
import { PaymentContext } from '../../store/CreatePaymentContext'

function BenevityImportFirstStep() {
  const { t } = useTranslation()
  const paymentContext = useContext(PaymentContext)

  const handleImportTypeChange = (importType: TImportType) => {
    paymentContext.dispatch({ type: 'SET_BENEVITY_IMPORT_TYPE', payload: importType })
  }

  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: '16px', textAlign: 'center' }}>
        Прикачване на CSV файл
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
        {t('Създаване на дарения от Benevity, чрез CSV файл')} <b />
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
        <Button onClick={() => handleImportTypeChange('file')} variant="outlined">
          {t('Чрез файл')}
        </Button>
        <Button onClick={() => handleImportTypeChange('manual')} variant="outlined">
          {t('Ръчно въвеждане')}
        </Button>
      </Box>
    </>
  )
}

export default observer(BenevityImportFirstStep)
