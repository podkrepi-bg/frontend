import React from 'react'
import { Check, Clear } from '@mui/icons-material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { DialogStore } from 'stores/DialogStore'
import { formatDateString } from 'common/util/date'
import { useSupportRequestList } from 'common/hooks/supportRequest'

const renderCell = (params: GridRenderCellParams) =>
  params.value ? <Check color="primary" /> : <Clear color="action" />

const commonProps: Partial<GridColDef> = {
  align: 'center',
  width: 150,
  renderCell,
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'name',
    headerName: 'Име',
    valueGetter: (p) => `${p.row.person.firstName} ${p.row.person.lastName}`,
    width: 200,
  },
  {
    field: 'email',
    headerName: 'Поща',
    valueGetter: (p) => p.row.person.email,
    width: 250,
  },
  {
    field: 'comment',
    headerName: 'Коментар',
    width: 200,
  },
  {
    field: 'createdAt',
    headerName: 'Дата',
    valueFormatter: (d) => typeof d.value === 'string' && formatDateString(d.value),
    width: 200,
  },
  { ...commonProps, field: 'associationMember', headerName: 'Член на асоциация' }, //Association member
  { ...commonProps, field: 'benefactorCampaign', headerName: 'Благотворителна компания' }, //Benefactor campaign
  { ...commonProps, field: 'benefactorPlatform', headerName: 'Благотворителна платформа' }, //Benefactor platform
  { ...commonProps, field: 'companyOtherText', headerName: 'Други компании' }, //Company other
  { ...commonProps, field: 'companySponsor', headerName: 'Спонсор на компания' }, //Company sponsor
  { ...commonProps, field: 'companyVolunteer', headerName: 'Доброволец на компания' }, //Company volunteer
  { ...commonProps, field: 'partnerBussiness', headerName: 'Бизнес партньор' }, //Partner bussiness
  { ...commonProps, field: 'partnerNpo', headerName: 'Партньор npo' }, //Partner npo
  { ...commonProps, field: 'partnerOtherText', headerName: 'Други партньори' }, //Partner other
  { ...commonProps, field: 'roleAssociationMember', headerName: 'Роля на член асоциация' }, //Role association member
  { ...commonProps, field: 'roleBenefactor', headerName: 'Благотворителна роля' }, //Role benefactor
  { ...commonProps, field: 'roleCompany', headerName: 'Роля на компания' }, //Role company
  { ...commonProps, field: 'rolePartner', headerName: 'Роля на парньор' }, //Role partner
  { ...commonProps, field: 'roleVolunteer', headerName: 'Роля на доброволец' }, //Role volunteer
  { ...commonProps, field: 'volunteerBackend', headerName: 'Backend' }, //Backend
  { ...commonProps, field: 'volunteerDesigner', headerName: 'Дизайнер' }, //Designer
  { ...commonProps, field: 'volunteerDevOps', headerName: 'Dev ops' }, //Dev ops
  { ...commonProps, field: 'volunteerFinancesAndAccounts', headerName: 'Финанси и сметки' }, //Finances and accounts
  { ...commonProps, field: 'volunteerFrontend', headerName: 'Frontend' }, //Frontend
  { ...commonProps, field: 'volunteerLawyer', headerName: 'Адвокат' }, //Lawyer
  { ...commonProps, field: 'volunteerMarketing', headerName: 'Маркетинг' }, //Marketing
  { ...commonProps, field: 'volunteerProjectManager', headerName: 'Проект мениджър' }, //Project manager
  { ...commonProps, field: 'volunteerQa', headerName: 'Контрол качество' }, // Qa
  { ...commonProps, field: 'volunteerSecurity', headerName: 'Защита' }, //Security
]

export default function SupportersGrid() {
  const { data } = useSupportRequestList()

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  })

  return (
    <DataGrid
      rows={data || []}
      columns={columns}
      columnVisibilityModel={{
        id: false,
      }}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      autoHeight
      disableRowSelectionOnClick
      onRowClick={(p, event) => {
        const elm = event.target as HTMLInputElement
        if (elm.type != 'checkbox') {
          const name = `${p.row.person.firstName} ${p.row.person.lastName}`
          DialogStore.show(p, name)
        }
      }}
    />
  )
}
