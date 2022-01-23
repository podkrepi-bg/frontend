import { useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { BootcampersResponse, BootcampersType } from 'gql/bootcamp'

export function useBootcampersList() {
    return useQuery<BootcampersResponse[]>(endpoints.bootcampers.listBootcampers.url)
}

export function useViewBootcamper(slug: string) {
    return useQuery<{ bootcampers: BootcampersResponse }>(endpoints.campaign.viewCampaign(slug).url)
}
