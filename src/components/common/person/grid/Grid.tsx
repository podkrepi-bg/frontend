import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridSortDirection,
  GridSortModel,
} from '@mui/x-data-grid'
import CheckIcon from '@mui/icons-material/Check'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

import GridActions from 'components/admin/GridActions'
import DeleteModal from './DeleteModal'
import DetailsModal from './DetailsModal'
import { ModalStore } from '../PersonGrid'
import {
  TActiveStatusMutationBody,
  useChangeProfileStatus,
  usePersonList,
} from 'common/hooks/person'
import { routes } from 'common/routes'
import theme from 'common/theme'
import { PersonPaginatedResponse } from 'gql/person'
import { PaginationData, SortData } from 'gql/types'
import Switch from '@mui/material/Switch'
import {
  Centered,
  CloseIcon,
  NameContainer,
  StyledAvatar,
  StyledCheckIcon,
  StyledDataGrid,
  StyledLink,
} from './Grid.styled'

const defaultSort: SortData = {
  sortBy: 'createdAt',
  sortOrder: 'desc',
}

export default observer(function Grid() {
  const { t } = useTranslation()

  const { isDetailsOpen } = ModalStore

  const [paginationModel, setPaginationModel] = useState<PaginationData>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sortingModel, setSortingModel] = useState<SortData>(defaultSort)

  const {
    data: { items, total: totalCount } = { items: [], total: 0 },
  }: UseQueryResult<PersonPaginatedResponse> = usePersonList(paginationModel, sortingModel)

  const mutation = useChangeProfileStatus(paginationModel, sortingModel)

  const onProfileStatusChange = (keycloakId: string, enabled: boolean) => {
    const data: TActiveStatusMutationBody = {
      keycloakId,
      profileEnabled: enabled,
    }
    mutation.mutate(data)
  }

  const handlePaginationModelChange = React.useCallback((paginationModel: GridPaginationModel) => {
    setPaginationModel({
      pageIndex: paginationModel.page,
      pageSize: paginationModel.pageSize,
    })
  }, [])

  const handleSortModelChange = React.useCallback((sortModel: GridSortModel) => {
    const sortData: SortData =
      sortModel.length !== 0
        ? {
            sortBy: sortModel[0].field === 'name' ? 'firstName' : sortModel[0].field,
            sortOrder: sortModel[0].sort ?? 'desc',
          }
        : defaultSort

    setSortingModel(sortData)
  }, [])

  const getColor = (initials: string): string => {
    const colors = ['#0179a8', '#346cb0', '#5f4b8b', '#b76ba3', '#a7c796', '#00a28a', '#3686a0']
    const index = initials.charCodeAt(0) % colors.length
    return colors[index]
  }

  const getInitials = (name: string): string => {
    const parts = name.split(' ')
    if (parts.length > 1) {
      return parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    }
    return name.slice(0, 2)
  }

  const columns: GridColDef[] = [
    {
      field: 'actions',
      type: 'actions',
      headerName: t('person:admin.fields.actions'),
      width: 150,
      align: 'center',
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <GridActions
            modalStore={ModalStore}
            id={params.row.id}
            name={params.row.id}
            editLink={routes.admin.person.edit(params.row.id)}
          />
        )
      },
    },
    {
      field: 'id',
      headerName: 'ID',
    },
    {
      field: 'type',
      headerName: 'Тип',
      width: 130,
      valueGetter: (f) => {
        return f.row.companyId ? 'корпоративен' : 'личен'
      },
    },
    {
      field: 'profileEnabled',
      headerName: 'Активен',
      width: 150,
      renderCell: (params: GridCellParams) => {
        return (
          <>
            <Switch
              checked={params.row.profileEnabled}
              onChange={() =>
                onProfileStatusChange(params.row.keycloakId, !params.row.profileEnabled)
              }
            />
            <Typography>{params.row.profileEnabled ? 'Активен ' : 'Неактивен'}</Typography>
          </>
        )
      },
    },
    {
      field: 'name',
      headerName: t('person:admin.fields.name'),
      editable: false,
      minWidth: 210,
      valueGetter: (f) => {
        return `${f.row.firstName} ${f.row.lastName}`
      },
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        const name = `${params.row.firstName} ${params.row.lastName}`
        const initials = getInitials(name)
        const color = getColor(initials)

        return (
          <NameContainer>
            <StyledAvatar color={color}>{initials}</StyledAvatar>
            {name}
          </NameContainer>
        )
      },
    },
    {
      field: 'email',
      headerName: t('person:admin.fields.email'),
      editable: false,
      minWidth: 240,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return <StyledLink href={`mailto:${params.row.email}`}>{params.row.email}</StyledLink>
      },
    },
    {
      field: 'phone',
      headerName: t('person:admin.fields.phone'),
      editable: false,
      minWidth: 140,
      valueGetter: (f) => f.row.phone,
    },
    {
      field: 'createdAt',
      headerName: t('person:admin.fields.createdAt'),
      editable: false,
      minWidth: 130,
      valueGetter: (f) => f.row.createdAt?.toString().slice(0, 10),
    },
    {
      field: 'organizer',
      headerName: t('person:admin.fields.organizer'),
      minWidth: 130,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return <Centered>{params.row.organizer ? <StyledCheckIcon /> : <CloseIcon />}</Centered>
      },
    },
    {
      field: 'coordinators',
      headerName: t('person:admin.fields.coordinator'),
      minWidth: 130,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return <Centered>{params.row.coordinators ? <StyledCheckIcon /> : <CloseIcon />}</Centered>
      },
    },
    {
      field: 'beneficiaries',
      headerName: t('person:admin.fields.beneficiary'),
      minWidth: 130,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <Centered>
            {params.row.beneficiaries.length > 0 ? <StyledCheckIcon /> : <CloseIcon />}
          </Centered>
        )
      },
    },
    {
      field: 'emailConfirmed',
      headerName: t('person:admin.fields.email-confirmed'),
      minWidth: 140,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <Centered>{params.row.emailConfirmed ? <StyledCheckIcon /> : <CloseIcon />}</Centered>
        )
      },
    },
    {
      field: 'newsletter',
      headerName: t('person:admin.fields.newsletter'),
      minWidth: 130,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return <Centered>{params.row.newsletter ? <StyledCheckIcon /> : <CloseIcon />}</Centered>
      },
    },
    {
      field: 'company',
      headerName: t('person:admin.fields.company'),
      editable: false,
      minWidth: 200,
      valueGetter: (f) => f.row.company,
    },
    {
      field: 'address',
      headerName: t('person:admin.fields.address'),
      editable: false,
      minWidth: 250,
      valueGetter: (f) => f.row.address,
    },
  ]

  return (
    <>
      <Box>
        <StyledDataGrid
          rows={items}
          columns={columns}
          columnVisibilityModel={{
            id: false,
          }}
          initialState={{
            sorting: {
              sortModel: [
                { field: defaultSort.sortBy, sort: defaultSort.sortOrder as GridSortDirection },
              ],
            },
          }}
          pageSizeOptions={[5, 10]}
          paginationModel={{ page: paginationModel.pageIndex, pageSize: paginationModel.pageSize }}
          paginationMode="server"
          sortingMode="server"
          rowCount={totalCount}
          onPaginationModelChange={handlePaginationModelChange}
          onSortModelChange={handleSortModelChange}
          disableRowSelectionOnClick
        />
      </Box>

      {/* making sure we don't sent requests to the API when not needed */}
      {isDetailsOpen && <DetailsModal />}
      <DeleteModal />
    </>
  )
})
