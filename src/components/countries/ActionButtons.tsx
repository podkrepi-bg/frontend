import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { IconButton, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PreviewIcon from '@mui/icons-material/Preview'

import { routes } from 'common/routes'

type Props = {
  id: string
  name: string
  loadInfo: (id: string) => void
  openDialog: (id: string, name: string) => void
}

const ActionsButtons = ({ id, name, loadInfo, openDialog }: Props) => {
  const { t } = useTranslation('countries')

  return (
    <>
      <Tooltip title={t('tooltips.view') || ''}>
        <IconButton color="primary" onClick={() => loadInfo(id)}>
          <PreviewIcon />
        </IconButton>
      </Tooltip>
      <Link href={routes.admin.countries.view(id)} passHref>
        <Tooltip title={t('tooltips.edit') || ''}>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Tooltip title={t('tooltips.delete') || ''}>
        <IconButton color="primary" onClick={() => openDialog(id, name)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  )
}

export default ActionsButtons
