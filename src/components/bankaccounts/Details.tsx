import { Typography, Card, CSSObject } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import { ModalStore } from 'stores/cars/ModalStore'
import { useViewBankAccount } from 'common/hooks/cars'
import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { BankAccountResponse } from 'gql/bankaccounts'

export default observer(function BasicCard() {
  const containerStyles: CSSObject = {
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
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {data?.bankName}
        </Typography>
        <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
          Brand: {data?.status}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Year: {data?.fingerprint}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Engine: {data?.bankIdCode}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Price: {data?.accountHolderName}
        </Typography>
      </CardContent>
    </Card>
  )
})
