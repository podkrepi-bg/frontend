import { Container } from '@mui/material'
import { InfoRequest, useInfoRequestList } from 'common/hooks/infoRequest'
import { UseBaseQueryResult } from 'react-query'
import InfoRequestGrid from '../info-request/InfoRequestGrid'
import AppBarMenu from '../layout/AppBarMenu'
import MainLayout from '../layout/MainLayout'

function InfoRequestPage() {
  return (
    <>
      <MainLayout>
        <InfoRequestGrid />
      </MainLayout>
    </>
  )
}

export default InfoRequestPage
