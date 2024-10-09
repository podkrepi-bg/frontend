import EditPage from 'components/admin/campaign-applications/EditPage'
import { getServerSideProps as getPropsForOrganizerEdit } from 'pages/campaigns/application/[id]/index'

import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = getPropsForOrganizerEdit

export default EditPage
