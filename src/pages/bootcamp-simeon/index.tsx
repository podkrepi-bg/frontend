import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import BootcampSimeonList from 'components/bootcamp-simeon/BootcampSimeonList'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', ['common'])),
    },
  }
}

export default BootcampSimeonList
