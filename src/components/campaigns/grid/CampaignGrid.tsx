import React, { useState } from 'react'
import { UseQueryResult } from 'react-query'
import { useTranslation } from 'next-i18next'
import { observer } from 'mobx-react'
import { Box, Toolbar, Tooltip, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

import { routes } from '../../../common/routes'
import { CampaignResponse } from 'gql/campaigns'
import { useCampaignList } from 'common/hooks/campaigns'
import { ModalStore } from '../../../stores/dashboard/ModalStore'
import GridActions from './GridActions'

import DeleteModal from './modals/DeleteModal'
import { useViewCoordinatorResponse } from '../../../common/hooks/coordinators'
import { useBeneficiary } from '../../../service/beneficiary'
import { useViewPerson } from '../../../service/person'
import { useCampaignType } from '../../../service/campaignTypes'
import { useDeleteCampaign } from '../../../service/campaign'

import { AlertStore } from '../../../stores/AlertStore'
import { useMutation } from 'react-query'
import DetailsModal from './modals/DetailsModal'
import DeleteSelectedModal from './modals/DeleteSelectedModal'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'
import router from 'next/router'
import { useViewBeneficiaryId, useViewBeneficiaryResponse } from 'common/hooks/beneficiary'

interface PersonCellProps {
  params: GridRenderCellParams
}

export default observer(function Grid() {
  const { t } = useTranslation()
  const { data = [] }: UseQueryResult<CampaignResponse[]> = useCampaignList()
  const [selectedId, setSelectedId] = useState<string>('')
  const [isDeleteSelectedModalOpen, setIsDeleteSelectedModalOpen] = React.useState(false)
  const [selectedRows, setSelectedRows] = React.useState<CampaignResponse[]>([])
  type detailsProps = {
    title: string
    slug: string
    description: string
    targetAmount: number
    startDate: string
    endDate: string
    essence: string
    campaignTypeId: string
    beneficiaryId: string
    coordinatorId: string
    currency: string
  }
  const [details, setDetails] = useState<detailsProps>({
    title: '',
    slug: '',
    description: '',
    targetAmount: 0,
    startDate: '',
    endDate: '',
    essence: '',
    campaignTypeId: '',
    beneficiaryId: '',
    coordinatorId: '',
    currency: '',
  })

  const { setSelectedIdsToDelete } = ModalStore

  setSelectedIdsToDelete([])

  const RenderCoordinator = ({ params }: PersonCellProps) => {
    const coordinator = useViewCoordinatorResponse(params.row.coordinatorId)
    return <>{coordinator.data?.person.firstName + ' ' + coordinator.data?.person.lastName}</>
  }

  const RenderBeneficiary = ({ params }: PersonCellProps) => {
    const beneficiary = useViewBeneficiaryResponse(params.row.beneficiaryId)
    return <>{beneficiary.data?.person.firstName + ' ' + beneficiary.data?.person.lastName}</>
  }

  const RenderCampaignType = ({ params }: PersonCellProps) => {
    const type = useCampaignType(params.row.campaignTypeId)
    return <>{type.data?.name}</>
  }

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 180,
    headerAlign: 'left',
  }

  const columns: GridColumns = [
    {
      field: 'state',
      headerName: t('campaigns:status'),
      ...commonProps,
    },
    {
      field: 'title',
      headerName: t('campaigns:title'),
      ...commonProps,
      width: 350,
    },
    {
      field: 'essence',
      headerName: t('campaigns:essence'),
      align: 'right',
      ...commonProps,
      width: 350,
    },
    {
      field: 'coordinator',
      headerName: t('campaigns:coordinator'),
      ...commonProps,
      renderCell: (params: GridRenderCellParams) => {
        return <RenderCoordinator params={params}></RenderCoordinator>
      },
    },
    {
      field: 'beneficiary',
      headerName: t('campaigns:beneficiary'),
      ...commonProps,
      renderCell: (params: GridRenderCellParams) => {
        return <RenderBeneficiary params={params}></RenderBeneficiary>
      },
    },
    {
      field: 'campaignType',
      headerName: t('campaigns:campaignType'),
      ...commonProps,
      renderCell: (params: GridRenderCellParams) => {
        return <RenderCampaignType params={params}></RenderCampaignType>
      },
      width: 250,
    },
    {
      field: 'description',
      headerName: t('campaigns:description'),
      align: 'right',
      ...commonProps,
      width: 350,
    },
    {
      field: 'targetAmount',
      headerName: t('campaigns:targetAmount'),
      align: 'right',
      ...commonProps,
    },
    {
      field: 'currency',
      headerName: t('campaigns:currency'),
      ...commonProps,
    },
    {
      field: 'startDate',
      headerName: t('campaigns:startDate'),
      align: 'left',
      width: 230,
      headerAlign: 'left',
    },
    {
      field: 'endDate',
      headerName: t('campaigns:endDate'),
      align: 'left',
      width: 230,
      headerAlign: 'left',
    },
    {
      field: 'createdAt',
      headerName: t('campaigns:createDate'),
      align: 'left',
      width: 230,
      headerAlign: 'left',
    },
    {
      field: 'updatedAt',
      headerName: t('campaigns:updatedAt'),
      align: 'left',
      width: 230,
      headerAlign: 'left',
    },
    {
      field: 'deletedAt',
      headerName: t('campaigns:deletedAt'),
      align: 'left',
      width: 230,
      headerAlign: 'left',
    },
    {
      field: 'actions',
      headerName: t('campaigns:actions'),
      width: 120,
      type: 'actions',
      headerAlign: 'left',
      renderCell: (cellValues: GridRenderCellParams) => {
        return (
          <GridActions
            id={cellValues.row.id}
            setSelectedId={setSelectedId}
            setDetails={setDetails}
            cellValues={cellValues}
          />
        )
      },
    },
  ]

  const mutation = useMutation({
    mutationFn: useDeleteCampaign,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('Избраните кампнии бяха преместени в кошчето.'), 'warning'),
  })

  const handleDeleteAll = () => {
    try {
      selectedRows.forEach((row: CampaignResponse) => {
        mutation.mutateAsync({ id: row.id }).then(() => {
          router.push(routes.admin.campaigns.index)
          setIsDeleteSelectedModalOpen(false)
        })
      })
    } catch (error) {
      AlertStore.show(t('common:alert.error'), 'error')
    }
  }

  const closeDeleteSelectedHandler = () => {
    setIsDeleteSelectedModalOpen(false)
  }

  const addIconStyles = {
    background: '#4ac3ff',
    borderRadius: '50%',
    cursor: 'pointer',
    padding: 1.2,
    boxShadow: 3,
  }
  const iconStyles = {
    background: 'white',
    borderRadius: '50%',
    cursor: 'pointer',
    padding: 0.5,
    boxShadow: 3,
    mr: 1,
  }

  return (
    <>
      <Toolbar
        sx={{
          background: 'white',
          borderTop: '1px solid lightgrey',
          display: 'flex',
          justifyContent: 'space-between',
          height: '72px',
        }}>
        <Box sx={{ height: '64px', display: 'flex', alignItems: 'start', pt: 1 }}>
          <Typography>Всички кампании</Typography>
        </Box>
        <Box sx={{ height: '64px', display: 'flex', alignItems: 'flex-end', pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Изтрий избраните">
              <DeleteIcon
                onClick={() => setIsDeleteSelectedModalOpen(true)}
                sx={iconStyles}
                fontSize="medium"
                color="action"></DeleteIcon>
            </Tooltip>
            <Link href="/admin/campaigns/create" passHref>
              <AddIcon sx={addIconStyles} fontSize="large" />
            </Link>
          </Box>
        </Box>
      </Toolbar>
      <DataGrid
        style={{
          background: 'white',
          position: 'absolute',
          height: 'calc(100vh - 300px)',
          border: 'none',
          width: 'calc(100% - 48px)',
          left: '24px',
          overflowY: 'auto',
          overflowX: 'hidden',
          borderRadius: '0 0 13px 13px',
        }}
        rows={data || []}
        columns={columns}
        pageSize={5}
        editMode="row"
        autoHeight
        autoPageSize
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids)
          const selectedRows = data.filter((row) => selectedIDs.has(row.id))
          setSelectedRows(selectedRows)
        }}
      />
      <Box>
        <DetailsModal modalProps={details}></DetailsModal>
        <DeleteModal id={selectedId} setSelectedId={setSelectedId} />
        <DeleteSelectedModal
          isOpen={isDeleteSelectedModalOpen}
          handleDelete={handleDeleteAll}
          handleDeleteModalClose={closeDeleteSelectedHandler}></DeleteSelectedModal>
      </Box>
    </>
  )
})
