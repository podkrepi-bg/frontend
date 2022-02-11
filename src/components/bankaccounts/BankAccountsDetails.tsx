import { Typography, Card, CSSObject, Divider } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { PersonFormData } from 'gql/person'
import { useViewPerson } from 'common/hooks/person'
import CloseModalButton from 'components/common/CloseModalButton'
import { ModalStore } from 'stores/cars/ModalStore'

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

  const { data: row }: UseQueryResult<PersonFormData> = useViewPerson(ModalStore.carId)

  return (
    <Card sx={containerStyles}>
      <CloseModalButton onClose={ModalStore.closeModal} />
      <CardContent>
        <Typography>Person Info</Typography>
        <Divider></Divider>
        <Typography>
          Name: {row?.firstName} {row?.lastName}
        </Typography>
        <Typography>Email: {row?.email}</Typography>
        {row?.phone ? <Typography>Phone: {row?.phone}</Typography> : null}
        {row?.address ? <Typography>Adress: {row?.address}</Typography> : null}
        {row?.companyName ? <Typography>Company name: {row?.companyName}</Typography> : null}
      </CardContent>
    </Card>
  )
})
