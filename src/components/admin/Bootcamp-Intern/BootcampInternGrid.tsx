// import { routes } from "common/routes"
// import { ModalContext } from 'context/ModalContext'

// import { DataGrid, GridColumns } from "@mui/x-data-grid"
// import { useRouter } from "next/router"
// import { useContext } from "react"

// const columns: GridColumns = [
// 	{ field: 'id', headerName: 'ID', hide: true },
// 	{
// 		field: 'firstName',
// 		headerName: 'First name',
// 		width: 200,
// 	},
// 	{
// 		field: 'lastName',
// 		headerName: 'Last name',
// 		width: 250,
// 	},
// 	{
// 		field: 'email',
// 		headerName: 'Email',
// 		width: 250,
// 	},
// ]

// export default function BootcampInternGrid(props: any) {
// 	const modal: any = useContext(ModalContext)
// 	const router = useRouter()
// 	return (
// 		<DataGrid
// 			style={{ marginTop: '50px' }}
// 			columns={columns}
// 			rows={props.bootcampInterns}
// 			aria-label={"Grid"}
// 			pageSize={5}
// 			autoHeight
// 			checkboxSelection
// 			autoPageSize
// 			disableSelectionOnClick
// 			onRowClick={(intern) => {
// 				const id = intern.getValue(intern.id, 'id')
// 				console.log(id);
// 				if (typeof id !== 'string') return
// 				router.push(routes.admin.bootcampIntern.view(id))
// 				// modal.openModal()
// 			}}
// 		>
// 		</DataGrid>
// 	)
// }
