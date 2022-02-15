import { useState } from 'react'
import { Box, Tooltip } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { GridRenderCellParams } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTranslation } from 'next-i18next'
import { observer } from 'mobx-react'
import { useMutation } from 'react-query'

import { useDeleteCompany } from 'service/restRequests'
import { AlertStore } from 'stores/AlertStore'
import ConfirmationDialog from 'components/common/ConfirmationDialog'

const useStyles = makeStyles(() => {
  return {
    btn: {
      marginRight: '16px',
      cursor: 'pointer',
      width: '15px',
      height: '15px',
    },
    deleteBtn: {
      ':hover': {
        backgroundColor: '#bf0000',
      },
    },
    link: {
      margin: 0,
      padding: 0,
      color: '#4AC3FF',
      display: 'flex',
    },
  }
})

function GridDeleteButton({
  params,
  deleteSuccessHandler,
}: {
  params: GridRenderCellParams
  deleteSuccessHandler: () => void
}) {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const classes = useStyles()
  const mutation = useMutation({
    mutationFn: useDeleteCompany(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })
  const onClickHandler = () => {
    setOpen(true)
  }
  const deleteConfirmHandler = async () => {
    try {
      await mutation.mutateAsync(params.row.id)
      deleteSuccessHandler()
    } catch (error) {
      AlertStore.show(t('common:alerts.error'), 'error')
    }
  }

  return (
    <Box className={classes.link}>
      <Tooltip title={t('companies:cta.delete') || ''} placement="top">
        <DeleteIcon onClick={onClickHandler} className={`${classes.deleteBtn} ${classes.btn}`} />
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
  )
}

export default observer(GridDeleteButton)
