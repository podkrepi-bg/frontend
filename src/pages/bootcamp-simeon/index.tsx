import { GetServerSideProps, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import BootcampSimeonList from 'components/bootcamp-simeon/BootcampSimeonList'

// export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
//   props: {
//     ...(await serverSideTranslations(locale ?? 'bg', ['common'])),
//   },
// })

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', ['common'])),
  },
  revalidate: 10,
})

export default BootcampSimeonList
