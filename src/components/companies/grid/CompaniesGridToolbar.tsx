import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { Box, Button, Tooltip } from '@mui/material'
import { GridSelectionModel, GridToolbarContainer } from '@mui/x-data-grid'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import { useMutation } from 'react-query'

import { routes } from 'common/routes'
import { deleteManyCompanies } from 'common/rest'
import { CompanyResponse } from 'gql/companies'
import { AlertStore } from 'stores/AlertStore'
import ConfirmationDialog from 'components/common/ConfirmationDialog'

type CompaniesGridToolbarProps = {
  selectionModel: GridSelectionModel
  setCompanies: React.Dispatch<React.SetStateAction<CompanyResponse[]>>
}

export default function CompaniesGridToolbar({
  selectionModel,
  setCompanies,
}: CompaniesGridToolbarProps) {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const mutation = useMutation({
    mutationFn: deleteManyCompanies,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })
  const deleteConfirmHandler = async () => {
    const mappedIds = selectionModel.map((x) => x.toString())
    await mutation.mutateAsync({ ids: mappedIds })
    setCompanies((old) => old?.filter((x) => !selectionModel.includes(x.id)))
    setOpen(false)
  }

  return (
    <GridToolbarContainer>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100%',
        }}>
        <Link passHref href={routes.dashboard.createCompany}>
          <Button color="primary" startIcon={<AddCircleIcon />}>
            {t('companies:cta.add')}
          </Button>
        </Link>
        <Tooltip title="Delete selected" placement="top">
          <span>
            <Button
              color="primary"
              disabled={selectionModel.length == 0}
              startIcon={<DeleteIcon />}
              onClick={() => setOpen(true)}>
              {t('companies:cta.delete')}
            </Button>
          </span>
        </Tooltip>
        <ConfirmationDialog
          isOpen={open}
          handleConfirm={deleteConfirmHandler}
          handleCancel={() => setOpen(false)}
          title={t('companies:deleteTitle')}
          cancelButtonLabel={t('companies:cta.cancel')}
          confirmButtonLabel={t('companies:cta.confirm')}
          content={t('companies:deleteContent')}
        />
      </Box>
    </GridToolbarContainer>
  )
}
