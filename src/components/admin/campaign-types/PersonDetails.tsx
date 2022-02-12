import { Typography, Card, CSSObject, Divider } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { CampaignTypesResponse } from 'gql/campaign-types'
import { useViewCampaignType } from 'common/hooks/campaign-types'
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

  const { data: row }: UseQueryResult<CampaignTypesResponse> = useViewCampaignType(ModalStore.carId)

  return (
    <Card sx={containerStyles}>
      <CloseModalButton onClose={ModalStore.closeModal} />
      <CardContent>
        <Typography>Campaign type Info</Typography>
        <Divider></Divider>
        <Typography>Type: {row?.name}</Typography>
        {row?.description ? <Typography>Description: {row?.description}</Typography> : null}
        {row?.parentId ? <Typography>Keyword (Category): {row?.parentId}</Typography> : null}
      </CardContent>
    </Card>
  )
})
