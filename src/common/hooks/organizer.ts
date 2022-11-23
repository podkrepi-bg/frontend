import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'
import { OrganizerResponse } from 'gql/organizer'

export function useOrganizersList() {
  const { data: session } = useSession()
  return useQuery<OrganizerResponse[]>([endpoints.organizer.listOrganizer.url], {
    queryFn: authQueryFnFactory(session?.accessToken),
  })
}

export function useViewOrganizer(id: string) {
  const { data: session } = useSession()
  return useQuery<OrganizerResponse>([endpoints.organizer.viewOrganizer(id).url], {
    queryFn: authQueryFnFactory(session?.accessToken),
  })
}
