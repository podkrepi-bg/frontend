import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import BootcampPage from 'components/admin/bootcamp/BootcampPage'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {
            ...(await serverSideTranslations(ctx.locale ?? 'bg', ['common', 'auth', 'validation'])),
        },
    }
}

export default BootcampPage
