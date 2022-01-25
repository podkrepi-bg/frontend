// import Layout from "components/layout/Layout"
// import GenericForm from "components/common/form/GenericForm"
// import FormTextField from "components/common/form/FormTextField"
// import BootcampInternGrid from "./BootcampInternGrid"

// import { Grid } from '@mui/material'
// import SubmitButton from "components/common/form/SubmitButton"
// import BootcampInternDetailsModal from "./BootcampInternDetailsModal"
// import { useRouter } from 'next/router'
// import { DataGrid, GridColumns } from "@mui/x-data-grid"
// import { Container } from '@mui/material'
// import { useContext } from "react"
// import ModalContextProvider, { ModalContext } from "context/ModalContext"

// export default function BootcampInternPage(props: any) {
// 	console.log(props);
// 	// const initialValues = { firstName: '', lastName: '', email: '' }
// 	return (
// 		<ModalContextProvider>
// 			<Layout>
// 				{/* <GenericForm onSubmit={() => { }} initialValues={initialValues}>
// 				<Grid style={{ marginTop: '100px' }} container spacing={3}>
// 					<Grid item xs={12}>
// 						<FormTextField type="text" label="Your first name ..." name="firstName" />
// 					</Grid>
// 					<Grid item xs={12}>
// 						<FormTextField type="text" label="Your last name ..." name="lastName" />
// 					</Grid>

// 					<Grid item xs={12}>
// 						<FormTextField type="email" label="Your email ..." name="email" />
// 					</Grid>

// 					<Grid item xs={12}>
// 						<SubmitButton fullWidth label="Apply" />
// 					</Grid>
// 				</Grid>
// 			</GenericForm> */}
// 				<BootcampInternDetailsModal></BootcampInternDetailsModal>

// 				<Container maxWidth="lg">
// 					<BootcampInternGrid bootcampInterns={props.bootcampInterns} />
// 				</Container>

// 			</Layout>
// 		</ModalContextProvider>
// 	)
// }
