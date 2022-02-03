import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import SearchCity from 'components/city/search/name'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    const client = new QueryClient()
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'bg', [
                'common',
                'auth',
                'validation',
                'city'
            ])),
            dehydratedState: dehydrate(client),
        },
    }
}

export default SearchCity