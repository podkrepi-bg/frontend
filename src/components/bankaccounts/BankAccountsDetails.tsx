import { Typography, Card, SxProps, Theme } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { BankAccountResponse } from 'gql/bankaccounts'
import { useViewBankAccount } from 'common/hooks/bankaccounts'
import CloseModalButton from 'components/common/CloseModalButton'
import { ModalStore } from 'stores/dashboard/ModalStore'

export default observer(function BankAccountDetails() {
  const containerStyles: SxProps<Theme> = {
    minWidth: 275,
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
  }

  const { data }: UseQueryResult<BankAccountResponse> = useViewBankAccount(ModalStore.carId)

  return (
    <Card sx={containerStyles}>
      <CloseModalButton onClose={ModalStore.closeModal} />
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Status: {data?.status}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          IBAN: {data?.ibanNumber}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Account holder: {data?.accountHolderName}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Type: {data?.accountHolderType}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Bank: {data?.bankName}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Bank ID: {data?.bankIdCode}
        </Typography>
        <Typography variant="body2">Fingerprint: {data?.fingerprint}</Typography>
      </CardContent>
    </Card>
  )
})
