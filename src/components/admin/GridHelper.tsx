import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import EditIcon from '@mui/icons-material/Edit'
import ShareIcon from '@mui/icons-material/Share'
import { useRouter } from 'next/router'
import React from 'react'
type Props = {
  setOpen: (id: string) => void
  row: any
  openModal: () => void
  editRoute: string
  handleDelete: () => void
  setId: (id: any) => void
}

export const ControlIcons: React.FC<Props> = ({
  setOpen,
  row,
  openModal,
  editRoute,
  handleDelete,
  setId,
}) => {
  const router = useRouter()

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      {
        <ImportExportIcon
          sx={{ cursor: 'pointer' }}
          color="primary"
          onClick={() => {
            setOpen(row)
            openModal()
          }}
        />
      }
      {
        <ShareIcon
          sx={{ cursor: 'pointer' }}
          color="primary"
          onClick={() => {
            setOpen(row)
            openModal()
          }}
        />
      }
      {
        <EditIcon
          sx={{ cursor: 'pointer' }}
          color="primary"
          onClick={() => {
            router.push(editRoute)
          }}
        />
      }
      {
        <DeleteIcon
          sx={{ cursor: 'pointer', opacity: 0.9 }}
          color="primary"
          onClick={() => {
            handleDelete()
            setId(row.id)
          }}
        />
      }
    </div>
  )
}

const renderCell = (cellValues: GridRenderCellParams): React.ReactNode => {
  return cellValues.value
}

export const commonProps: Partial<GridColDef> = {
  align: 'left',
  width: 150,
  headerAlign: 'left',
  renderCell,
}
