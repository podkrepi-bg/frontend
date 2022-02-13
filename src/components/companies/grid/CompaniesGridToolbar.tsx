import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { Box, Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { GridSelectionModel } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import { useMutation } from 'react-query'
import HomeIcon from '@mui/icons-material/Home'

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
    link: {
      color: '#0000008A',
      fontSize: '14px',
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

  const deleteIconClickHandler = () => {
    if (selectionModel.length > 0) {
      setOpen(true)
    } else {
      AlertStore.show('Please select row', 'error')
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '7px 12px 6px 24px',
          borderBottom: '1px solid rgba(224, 224, 224, 1)',
        }}>
        <Typography sx={{ fontSize: '24px', fontFamily: 'Montserrat', color: '#32A9FE' }}>
          Компании
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Link passHref href={routes.index}>
            <a className={classes.link}>
              <HomeIcon />
            </a>
          </Link>
          <Typography sx={{ fontSize: '16px', margin: '0 5px' }}>/</Typography>
          <Link passHref href={routes.dashboard.index}>
            <a className={classes.link}>Dashboard</a>
          </Link>
          <Typography sx={{ fontSize: '16px', margin: '0 5px' }}>/</Typography>
          <Link passHref href={routes.dashboard.companies}>
            <a className={classes.link}>Companies</a>
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          padding: '8px 8px 8px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Typography sx={{ alignSelf: 'flex-start', flexBasis: '20%', color: '#666666' }}>
          Описание на компании
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
            padding: '14px 0',
          }}>
          <Button className={`${classes.smallBtn} ${classes.btn}`} onClick={deleteIconClickHandler}>
            <DeleteIcon
              style={{
                width: '10px',
              }}
            />
          </Button>
          <Link passHref href={routes.dashboard.createCompany}>
            <a>
              <Button className={`${classes.addBtn} ${classes.btn}`}>+</Button>
            </a>
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
      </Box>
    </Box>
  )
}
