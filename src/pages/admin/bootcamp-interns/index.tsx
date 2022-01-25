// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// import { dehydrate, QueryClient } from 'react-query'
// import { queryFn } from 'common/rest'
// import { GetServerSideProps, GetStaticProps } from 'next'
// import BootcampInternPage from 'components/admin/Bootcamp-Intern/BootcampInternPage'
// import { axios } from 'common/api-client'

// import { endpoints } from 'common/api-endpoints'

// export const getStaticProps: GetServerSideProps = async ({ locale }) => {
// 	const client = new QueryClient()
// 	await client.prefetchQuery('/bootcamp-intern', queryFn)

// 	const bootcampInterns = await axios.get(endpoints.bootcampIntern.listBootcampIntern.url)

// 	return {
// 		props: {
// 			...(await serverSideTranslations(locale ?? 'bg', ['common'])),
// 			dehydrateState: dehydrate(client),
// 			bootcampInterns: bootcampInterns.data
// 		},
// 	}
// }
// export default BootcampInternPage
