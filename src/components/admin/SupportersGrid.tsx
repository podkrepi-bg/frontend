import React from 'react'
import { Check, Clear } from '@mui/icons-material'
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

import { DialogStore } from 'stores/DialogStore'
import { dateFormatter } from 'common/util/date'
import { useSupportRequestList } from 'common/hooks/supportRequest'

const renderCell = (params: GridRenderCellParams) =>
  params.value ? <Check color="primary" /> : <Clear color="action" />

const commonProps: Partial<GridColDef> = {
  align: 'center',
  width: 150,
  renderCell,
}

const columns: GridColumns = [
  { field: 'id', headerName: 'ID', hide: true },
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
    valueFormatter: (d) => typeof d.value === 'string' && dateFormatter(d.value),
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

  return (
    <DataGrid
      rows={data || []}
      columns={columns}
      pageSize={10}
      autoHeight
      autoPageSize
      disableSelectionOnClick
      onRowClick={(p, event) => {
        const elm = event.target as HTMLInputElement
        if (elm.type != 'checkbox') {
          DialogStore.show(p, `${p.getValue(p.id, 'name')}`)
        }
      }}
    />
  )
}
