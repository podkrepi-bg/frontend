import { Typography, Card, SxProps, Theme } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { CoordinatorResponse } from 'gql/coordinators'
import { useViewCoordinatorResponse } from 'common/hooks/coordinators'
import CloseModalButton from 'components/common/CloseModalButton'
import { ModalStore } from 'stores/dashboard/ModalStoreOld'

export default observer(function CoordinatorDetails() {
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

  const { data }: UseQueryResult<CoordinatorResponse> = useViewCoordinatorResponse(
    ModalStore.carId as string,
  )

  return (
    <Card sx={containerStyles}>
      <CloseModalButton onClose={ModalStore.closeModal} />
      <CardContent>
        <Typography variant="body2" gutterBottom>
          Name: {data?.person.firstName} {data?.person.lastName}
        </Typography>
      </CardContent>
    </Card>
  )
})
