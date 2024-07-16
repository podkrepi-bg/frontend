import { useTranslation } from 'next-i18next'
import AdminContainer from 'components/common/navigation/AdminContainer'
import AdminLayout from 'components/common/navigation/AdminLayout'
import {
  AffilliateStatusMutation,
  useChangeAffiliateStatus,
  useGetAffiliates,
  useRefresAffiliateCode,
} from 'common/hooks/affiliates'

import theme from 'common/theme'
import { useState } from 'react'

import { AffiliateStatus, AffiliatesAdminResponse } from 'gql/affiliate'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Box, MenuItem, Select, SelectChangeEvent, Tooltip } from '@mui/material'
import { Edit, Save } from '@mui/icons-material'
import LoopIcon from '@mui/icons-material/Loop'

const addIconStyles = {
  color: '#4ac3ff',
  background: 'transparent',
  fontSize: theme.typography.pxToRem(40),
  cursor: 'pointer',
  padding: 0.7,
}

export default function AffiliatesPage() {
  const { t } = useTranslation()
  const { data: affiliates } = useGetAffiliates()
  const codeMutation = useRefresAffiliateCode()
  const statusMutation = useChangeAffiliateStatus()
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  })
  const [affiliateStatus, setAffiliateStatus] = useState<AffiliateStatus | null>(null)
  const [focusedRowId, setFocusedRowId] = useState(null as string | null)
  const onCodeRefresh = (affiliateId: string) => {
    codeMutation.mutate(affiliateId)
  }
  const onStatusChange = (e: SelectChangeEvent<AffiliateStatus>) => {
    const affiliateStatus = e.target.value as AffiliateStatus
    setAffiliateStatus(affiliateStatus)
  }

  const onStatusSaved = async (
    affiliateId: string,
    newStatus: AffiliateStatus,
    params: GridRenderCellParams,
  ) => {
    const data: AffilliateStatusMutation = {
      affiliateId,
      newStatus,
    }
    const mutationResult = await statusMutation.mutateAsync(data)
    if (mutationResult.status === 200) {
      params.api.stopCellEditMode({ id: params.row.id, field: params.field })
    }
  }

  const columns: GridColDef<AffiliatesAdminResponse>[] = [
    { field: 'id', headerName: 'id', valueGetter: (params) => params.row.id },
    {
      field: 'status',
      headerName: 'Статус',
      editable: true,
      minWidth: 160,
      renderCell(params) {
        return (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
              }}>
              {t(`profile:affiliate.status.${params.row.status}`)}
              {params.isEditable ? (
                <Tooltip title={t('Промяна на статус')}>
                  <Edit
                    sx={addIconStyles}
                    color="action"
                    fontSize="medium"
                    onClick={() => {
                      if (focusedRowId) {
                        params.api.startCellEditMode({ id: params.row.id, field: params.field })
                      }
                      params.api.getCellMode(params.row.id, params.field)
                      setFocusedRowId(params.row.id)
                    }}
                  />
                </Tooltip>
              ) : (
                <></>
              )}
            </Box>
          </>
        )
      },
      renderEditCell(params) {
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Select
              fullWidth
              defaultValue={params.row.status}
              disableUnderline
              variant="standard"
              placeholder={params.row.status}
              onChange={onStatusChange}>
              {Object.values(AffiliateStatus).map((value, index) => {
                return (
                  <MenuItem key={index} value={value}>
                    {t(`profile:affiliate.status.${value}`)}
                  </MenuItem>
                )
              })}
            </Select>
            {affiliateStatus && affiliateStatus !== params.row.status && (
              <Tooltip
                title={t('donations:cta.save')}
                onClick={() => onStatusSaved(params.row.id, affiliateStatus, params)}>
                <Save sx={addIconStyles} color="action" />
              </Tooltip>
            )}
          </Box>
        )
      },
    },
    {
      field: 'affiliateCode',
      headerName: 'Код',
      editable: true,
      minWidth: 150,
      renderCell(params) {
        return (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
              }}>
              {params.row.affiliateCode}
              {params.isEditable ? (
                <Tooltip
                  title={t('Генериране на нов код')}
                  onClick={() => onCodeRefresh(params.row.id)}>
                  <LoopIcon sx={addIconStyles} color="action" fontSize="medium" />
                </Tooltip>
              ) : (
                <></>
              )}
            </Box>
          </>
        )
      },
    },
    {
      field: 'companyName',
      headerName: 'Име на компания',
      minWidth: 200,
      renderCell(params) {
        return params.row.company.companyName
      },
    },
    {
      field: 'companyNumber',
      headerName: 'ЕИК/БУЛСТАТ',
      minWidth: 120,
      renderCell(params) {
        return params.row.company.companyNumber
      },
    },
    {
      field: 'legalRepresentative',
      headerName: 'Представител на компания',
      minWidth: 220,
      renderCell(params) {
        return `${params.row.company.person.firstName} ${params.row.company.person.lastName}`
      },
    },
    {
      field: 'representativeEmail',
      headerName: 'Имейл на представител',
      minWidth: 220,
      renderCell(params) {
        return `${params.row.company.person.email}`
      },
    },
  ]
  return (
    <AdminLayout>
      <AdminContainer title={t('profile:affiliate.index')}>
        <DataGrid
          style={{
            background: theme.palette.common.white,
            position: 'absolute',
            height: 'calc(100vh - 300px)',
            border: 'none',
            width: 'calc(100% - 48px)',
            left: '24px',
            overflowY: 'auto',
            overflowX: 'hidden',
            borderRadius: '0 0 13px 13px',
          }}
          columnVisibilityModel={{ id: false }}
          rows={affiliates || []}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          editMode="row"
          pageSizeOptions={[20, 50, 100]}
        />
      </AdminContainer>
    </AdminLayout>
  )
}
