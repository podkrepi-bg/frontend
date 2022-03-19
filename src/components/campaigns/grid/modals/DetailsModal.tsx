// import React from 'react'
// import { UseQueryResult } from 'react-query'
// import { observer } from 'mobx-react'
// import { useTranslation } from 'next-i18next'

// import { CampaignResponse } from 'gql/campaigns'
// import { useCampaignDetailsPage } from 'common/hooks/campaigns'
// import { ModalStore } from 'stores/dashboard/ModalStore'
// import DetailsDialog from 'components/admin/DetailsDialog'

// export default observer(function DetailsModal() {
//   const { selectedRecord } = ModalStore
//   const { data }: UseQueryResult<CampaignResponse> = useCampaignDetailsPage(selectedRecord.id)
//   const { t } = useTranslation('Campaigns')

//   const dataConverted = [
//     '{ name: dan4o }'
//   ]

//   return <DetailsDialog data={dataConverted} />
// })
