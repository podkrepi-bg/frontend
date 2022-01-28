import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from 'components/layout/Layout'
import { useBootcampDimitar } from '../../../common/hooks/bootcampDimitar'
import { useRouter } from 'next/router'
import Link from 'next/link'

function BootcampDimitar() {
  const router = useRouter()
  const { id: slug } = router.query
  const { data } = useBootcampDimitar(slug as string)

  return (
    <Layout title={'Bootcamp Dimitar'}>
      <Link href="/bootcamp-dimitar">Back to all</Link>
      <h1>Details view:</h1>
      <p>First name: {data?.firstName}</p>
      <p>Last name: {data?.lastName}</p>
      <p>Company: {data?.company}</p>
      <Link href={`/bootcamp-dimitar/${slug}/edit`}>Edit</Link>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', ['common'])),
  },
})

export default BootcampDimitar
