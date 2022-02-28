import { Typography, Card, CSSObject, Divider } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { BeneficiaryType } from 'gql/beneficiary'
import { useViewBeneficiary } from 'service/beneficiary'
import CloseModalButton from 'components/common/CloseModalButton'
import { ModalStore } from 'stores/dashboard/ModalStore'

export default observer(function BankAccountDetails() {
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
  const { data: row }: UseQueryResult<BeneficiaryType> = useViewBeneficiary(ModalStore.carId)

  return (
    <Card sx={containerStyles}>
      <CloseModalButton onClose={ModalStore.closeModal} />
      <CardContent>
        <Typography>Beneficiary Info</Typography>
        <Divider></Divider>
        {row?.personId ? <Typography>Person ID: {row.personId}</Typography> : null}
        {row?.companyId ? <Typography>Company ID: {row.companyId}</Typography> : null}
        {row?.countryCode ? <Typography>Country code: {row.countryCode}</Typography> : null}
      </CardContent>
    </Card>
  )
})
