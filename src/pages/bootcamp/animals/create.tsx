import CreateAnimal from 'components/bootcamp/CreateAnimal'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function CreateAnimalPage() {
  return <CreateAnimal />
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'validation'])),
    },
  }
}
