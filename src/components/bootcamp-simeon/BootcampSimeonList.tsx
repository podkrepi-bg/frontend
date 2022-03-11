import { useBootcampSimeonList } from 'common/hooks/bootcamp-simeon'
import Layout from 'components/layout/Layout'
import { useRouter } from 'next/router'
import BootcampAppbar from './Appbar'

export default function BootcampSimeonList() {
  const router = useRouter()
  const { data = [] } = useBootcampSimeonList()

  return (
    <Layout title="BootcampSimeon">
      <BootcampAppbar />
    </Layout>
  )
}
