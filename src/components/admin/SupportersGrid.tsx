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
    headerName: 'Name',
    valueGetter: (p) => `${p.row.person.firstName} ${p.row.person.lastName}`,
    width: 200,
  },
  {
    field: 'email',
    headerName: 'Email',
    valueGetter: (p) => p.row.person.email,
    width: 250,
  },
  {
    field: 'comment',
    headerName: 'Comment',
    width: 200,
  },
  {
    field: 'createdAt',
    headerName: 'Date',
    valueFormatter: (d) => typeof d.value === 'string' && formatDateString(d.value),
    width: 200,
  },
  { ...commonProps, field: 'associationMember', headerName: 'Association member' },
  { ...commonProps, field: 'benefactorCampaign', headerName: 'Benefactor campaign' },
  { ...commonProps, field: 'benefactorPlatform', headerName: 'Benefactor platform' },
  { ...commonProps, field: 'companyOtherText', headerName: 'Company other' },
  { ...commonProps, field: 'companySponsor', headerName: 'Company sponsor' },
  { ...commonProps, field: 'companyVolunteer', headerName: 'Company volunteer' },
  { ...commonProps, field: 'partnerBussiness', headerName: 'Partner bussiness' },
  { ...commonProps, field: 'partnerNpo', headerName: 'Partner npo' },
  { ...commonProps, field: 'partnerOtherText', headerName: 'Partner other' },
  { ...commonProps, field: 'roleAssociationMember', headerName: 'Role association member' },
  { ...commonProps, field: 'roleBenefactor', headerName: 'Role benefactor' },
  { ...commonProps, field: 'roleCompany', headerName: 'Role company' },
  { ...commonProps, field: 'rolePartner', headerName: 'Role partner' },
  { ...commonProps, field: 'roleVolunteer', headerName: 'Role volunteer' },
  { ...commonProps, field: 'volunteerBackend', headerName: 'Backend' },
  { ...commonProps, field: 'volunteerDesigner', headerName: 'Designer' },
  { ...commonProps, field: 'volunteerDevOps', headerName: 'Dev ops' },
  { ...commonProps, field: 'volunteerFinancesAndAccounts', headerName: 'Finances and accounts' },
  { ...commonProps, field: 'volunteerFrontend', headerName: 'Frontend' },
  { ...commonProps, field: 'volunteerLawyer', headerName: 'Lawyer' },
  { ...commonProps, field: 'volunteerMarketing', headerName: 'Marketing' },
  { ...commonProps, field: 'volunteerProjectManager', headerName: 'Project manager' },
  { ...commonProps, field: 'volunteerQa', headerName: 'Qa' },
  { ...commonProps, field: 'volunteerSecurity', headerName: 'Security' },
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
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      autoHeight
      autoPageSize
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
