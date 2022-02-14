import { useKeycloak } from '@react-keycloak/ssr'
import { Box, Tooltip } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { GridRenderCellParams } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTranslation } from 'next-i18next'
import { observer } from 'mobx-react'
import { useMutation } from 'react-query'

import { deleteCompany } from 'common/rest'
import { AlertStore } from 'stores/AlertStore'
import { DialogStore } from 'stores/DialogStore'
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
  const { dialogs, show, clear } = DialogStore
  const { keycloak } = useKeycloak()
  const { t } = useTranslation()
  const classes = useStyles()
  const mutation = useMutation({
    mutationFn: deleteCompany,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })
  const onClickHandler = () => {
    show(params.row)
  }
  const closeModal = () => clear()
  const deleteConfirmHandler = async () => {
    try {
      await mutation.mutateAsync({ slug: params.row.id, token: keycloak?.token || '' })
      deleteSuccessHandler()
    } catch (error) {
      AlertStore.show(t('common:alerts.error'), 'error')
    }
    clear()
  }

  return (
    <Box className={classes.link}>
      <Tooltip title={t('companies:cta.delete') || ''} placement="top">
        <DeleteIcon onClick={onClickHandler} className={`${classes.deleteBtn} ${classes.btn}`} />
      </Tooltip>
      <ConfirmationDialog
        title={t('companies:deleteTitle')}
        isOpen={dialogs.length > 0}
        handleConfirm={deleteConfirmHandler}
        cancelButtonLabel={t('companies:cta.cancel')}
        confirmButtonLabel={t('companies:cta.confirm')}
        content={t('companies:deleteContent')}
        handleCancel={closeModal}
      />
    </Box>
  )
}

export default observer(GridDeleteButton)
