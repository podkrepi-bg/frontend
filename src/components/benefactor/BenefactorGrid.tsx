import React from 'react'
// import { DataGrid, GridColumns, GridSelectionModel } from '@mui/x-data-grid'
// import { useMutation } from 'react-query'
// import { AxiosError, AxiosResponse } from 'axios'
// import { useRouter } from 'next/router'
// import { useTranslation } from 'next-i18next'
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Typography,
// } from '@mui/material'
// import { makeStyles } from '@mui/styles'
// import DeleteIcon from '@mui/icons-material/Delete'
// import EditIcon from '@mui/icons-material/Edit'
// import PreviewIcon from '@mui/icons-material/Preview'
// import AddIcon from '@mui/icons-material/Add'

// import { useBenefactorList } from 'common/hooks/benefactor'
// import { routes } from 'common/routes'
// import { BenefactorResponse } from 'gql/benefactor'
// import { ApiErrors } from 'common/api-errors'
// import { AlertStore } from 'stores/AlertStore'
// import { deleteBenefactor, getBenefactor } from 'common/rest'
// import Link from 'next/link'

// const useStyles = makeStyles({
//     gridWrapper: {
//       margin: '0 auto',
//       maxWidth: 802,
//     },
//     grid: {
//       marginBottom: 15,
//     },
//     gridTitleWrapper: {
//       display: 'flex',
//       justifyContent: 'space-between',
//     },
//     gridTitle: {
//       marginBottom: 10,
//     },
//     infoBtn: {
//       margin: '0 auto',
//     },
//   })

//   const initialValues: BenefactorResponse = {
//     id: "",
//     personId: "",
//     extCustomerId: "",
//     // createdAt: "",
//     // updatedAt: "",
//   }

//   export default function BenefactorGrid() {
//     const [openRowDel, setOpenRowDel] = React.useState<boolean>(false)
//     const [openRowsDel, setOpenRowsDel] = React.useState<boolean>(false)
//     const [openInfo, setOpenInfo] = React.useState<boolean>(false)
//     const [selectedId, setSelectedId] = React.useState<string>('')
//     const [multipleSelectedIds, setMultipleSelectedIds] = React.useState<string[]>([])
//     const [benefactor, setBenefactor] = React.useState<BenefactorResponse>(initialValues)
//     const classes = useStyles()
//     const { data } = useBenefactorList()
//     const router = useRouter()
//     const { t } = useTranslation()

//     const openDeleteRowDialog = (id: string) => {
//         setSelectedId(id)
//         setOpenRowDel(true)
//       }

//   const closeDeleteRowDialog = () => {
//     setOpenRowDel(false)
//   }

//   const openDeleteRowsDialog = () => {
//     if (multipleSelectedIds.length == 0) {
//       return
//     }
//     setOpenRowsDel(true)
//   }

//   const closeDeleteRowsDialog = () => {
//     setOpenRowsDel(false)
//   }

//   const loadInternInfo = async (id: string) => {
//     try {
//       await infoMutation.mutateAsync(id)
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const closeInfoDialog = () => {
//     setOpenInfo(false)
//   }

//   const infoMutation = useMutation<AxiosResponse<BenefactorResponse>, AxiosError<ApiErrors>, string>({
//     mutationFn: getBenefactor,
//     onError: () => AlertStore.show(t('benefactor:alerts.load-benefactor.error'), 'error'),
//     onSuccess: ({ data }) => {
//       setBenefactor(data)
//       setOpenInfo(true)
//     },
//   })

//   const delMutation = useMutation<AxiosResponse<BenefactorResponse>, AxiosError<ApiErrors>, string>({
//     mutationFn: deleteBenefactor,
//     onError: () => AlertStore.show(t('benefactor:alerts.delete-row.error'), 'error'),
//     onSuccess: () => {
//       return
//     },
//   })

//   const deleteRow = async () => {
//     try {
//       closeDeleteRowDialog()
//       delMutation.mutateAsync(selectedId)
//       AlertStore.show(t('benefactor:alerts.delete-row.success'), 'success')
//       router.push(routes.benefactor.index)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const selectMultipleRows = (ids: GridSelectionModel) => {
//     setMultipleSelectedIds(ids.map((id) => id.toString()))
//   }

//   const deleteRows = async () => {
//     try {
//       closeDeleteRowsDialog()
//       await Promise.all(multipleSelectedIds.map((id) => delMutation.mutateAsync(id)))
//       AlertStore.show(t('benefactor:alerts.delete-rows.success'), 'success')
//       setMultipleSelectedIds([])
//       router.push(routes.benefactor.index)
//     } catch (err) {
//       AlertStore.show(t('benefactor:alerts.delete-rows.error'), 'error')
//     }
//   }

//   type ActionsProps = {
//     id: string
//   }

//   const ActionsButtons = ({ id }: ActionsProps) => {
//     return (
//       <>
//         <IconButton onClick={() => loadInternInfo(id)}>
//           <PreviewIcon />
//         </IconButton>
//         <Link href={routes.benefactor.view(id)} passHref>
//           <IconButton>
//             <EditIcon />
//           </IconButton>
//         </Link>
//         <IconButton onClick={() => openDeleteRowDialog(id)}>
//           <DeleteIcon />
//         </IconButton>
//       </>
//     )
//   }

//   const columns: GridColumns = [
//     { field: 'id', headerName: 'ID', hide: true },
//     {
//       field: 'personId',
//       headerName: t('auth:fields.personId'),
//       valueGetter: (p) => p.row.personId,
//       width: 200,
//     },
//     {
//       field: 'extCustomerId',
//       headerName: t('auth:fields.extCustomerIde'),
//       valueGetter: (p) => p.row.extCustomerId,
//       width: 200,
//     },
//     {
//       field: 'actions',
//       headerName: '',
//       renderCell: (p) => <ActionsButtons id={p.row.id} />,
//       width: 150,
//       type: 'actions',
//     },
//   ]

//      //   createdAt: "",
//     //   updatedAt: "",

// const DeleteRowDialog = () => (
//     <Dialog open={openRowDel} onClose={closeDeleteRowDialog} maxWidth="xs">
//       <DialogTitle>
//         {t('benefactor:alerts.delete-row.question')} ({selectedId})?
//       </DialogTitle>
//       <DialogActions>
//         <Button variant="contained" color="secondary" fullWidth onClick={deleteRow}>
//           {t('benefactor:btns.confirm')}
//         </Button>
//         <Button variant="contained" color="primary" fullWidth onClick={closeDeleteRowDialog}>
//           {t('benefactor:btns.cancel')}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   )

//   const DeleteRowsDialog = () => (
//     <Dialog open={openRowsDel} onClose={closeDeleteRowsDialog} maxWidth="xs">
//       <DialogTitle>{t('benefactor:alerts.delete-rows.question')}?</DialogTitle>
//       <DialogActions>
//         <Button variant="contained" color="secondary" fullWidth onClick={deleteRows}>
//           {t('benefactor:btns.confirm')}
//         </Button>
//         <Button variant="contained" color="primary" fullWidth onClick={closeDeleteRowsDialog}>
//           {t('benefactor:btns.cancel')}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   )

//   const InfoDialog = () => (
//     <Dialog open={openInfo} onClose={closeInfoDialog} maxWidth="xs">
//       <DialogTitle>{t('benefactor:titles.benefactor-info')}</DialogTitle>
//       <DialogContent>
//         <p>
//           <b>Id:</b> {benefactor.id}
//         </p>
//         <p>
//           <b>{t('auth:fields.extCustomerId')}:</b> {benefactor.extCustomerId}
//         </p>
//         <p>
//           <b>{t('auth:fields.personId')}:</b> {benefactor.personId}
//         </p>
//       </DialogContent>
//       <DialogActions>
//         <Button
//           variant="contained"
//           color="primary"
//           className={classes.infoBtn}
//           onClick={closeInfoDialog}>
//           {t('benefactor:btns.close')}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   )
//   return (
//     <>
//       <InfoDialog />
//       <DeleteRowDialog />
//       <DeleteRowsDialog />
//       <div className={classes.gridWrapper}>
//         <div className={classes.gridTitleWrapper}>
//           <Typography variant="h6" className={classes.gridTitle}>
//             {/* {t('benefactor:titles.benefactor')} */}
//             {t('benefactor')}
//           </Typography>

//           <section>
//             <Link href={routes.benefactor.add} passHref>
//               <IconButton>
//                 <AddIcon />
//               </IconButton>
//             </Link>
//             <IconButton onClick={openDeleteRowsDialog}>
//               <DeleteIcon />
//             </IconButton>
//           </section>
//         </div>

//         <DataGrid
//           className={classes.grid}
//           rows={data || []}
//           columns={columns}
//           pageSize={5}
//           autoHeight
//           autoPageSize
//           checkboxSelection
//           disableSelectionOnClick
//           onSelectionModelChange={selectMultipleRows}
//         />
//       </div>
//     </>
//   )
// }
