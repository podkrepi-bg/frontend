import Link from 'next/link'
import { IconButton } from '@mui/material'
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
  return (
    <>
      <IconButton onClick={() => loadInfo(id)}>
        <PreviewIcon />
      </IconButton>
      <Link href={routes.dashboard.country.view(id)} passHref>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Link>
      <IconButton onClick={() => openDialog(id, name)}>
        <DeleteIcon />
      </IconButton>
    </>
  )
}

export default ActionsButtons
