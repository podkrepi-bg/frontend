import Layout from 'components/layout/Layout'
import BootcampInternGrid from './BootcampInternGrid'
import BootcampInternCreateForm from './BootcampInternCreateForm'

export default function BootcampInternPage(props: any) {
  console.log(props)
  return (
    <Layout>
      <BootcampInternCreateForm />
      <BootcampInternGrid />
    </Layout>
  )
}
