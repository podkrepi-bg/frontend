import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { Box, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { GridSelectionModel, GridToolbarContainer } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import { useMutation } from 'react-query'
import ShareIcon from '@mui/icons-material/Share'
import PrintIcon from '@mui/icons-material/Print'
import SaveIcon from '@mui/icons-material/Save'
import EventNoteIcon from '@mui/icons-material/EventNote'

import { routes } from 'common/routes'
import { deleteManyCompanies } from 'common/rest'
import { CompanyResponse } from 'gql/companies'
import { AlertStore } from 'stores/AlertStore'
import ConfirmationDialog from 'components/common/ConfirmationDialog'

const useStyles = makeStyles(() => {
  return {
    btn: {
      borderRadius: '50%',
      boxShadow:
        '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)',
      margin: '0 4px',
      color: 'rgba(0, 0, 0, 0.54)',
    },
    addBtn: {
      backgroundColor: '#4AC3FF',
      border: 'none',
      width: '28px',
      height: '28px',
      minWidth: '28px',
      color: '#000',
    },
    smallBtn: {
      width: '20px',
      height: '20px',
      minWidth: '20px',
    },
  }
})

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
  const classes = useStyles()
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
        <Button className={`${classes.smallBtn} ${classes.btn}`}>
          <EventNoteIcon
            style={{
              width: '10px',
            }}
          />
        </Button>
        <Button className={`${classes.smallBtn} ${classes.btn}`} onClick={() => setOpen(true)}>
          <DeleteIcon
            style={{
              width: '10px',
            }}
          />
        </Button>
        <Button className={`${classes.smallBtn} ${classes.btn}`}>
          <SaveIcon
            style={{
              width: '10px',
            }}
          />
        </Button>
        <Button className={`${classes.smallBtn} ${classes.btn}`}>
          <PrintIcon
            style={{
              width: '10px',
            }}
          />
        </Button>
        <Button className={`${classes.smallBtn} ${classes.btn}`}>
          <ShareIcon
            style={{
              width: '10px',
            }}
          />
        </Button>
        <Link passHref href={routes.dashboard.createCompany}>
          <Button className={`${classes.addBtn} ${classes.btn}`}>+</Button>
        </Link>
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
