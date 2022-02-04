import { useRouter } from 'next/router'
import { makeStyles } from '@mui/styles'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'

import { routes } from 'common/routes'

import { drawerWidth } from './MyDrawer'
import MultipleRowsDeleteModal from './MultipleRowsDeleteModal'
import { NotificationStore } from 'stores/bootcamp-interns/NotificationStore'

const useStyles = makeStyles(() => {
  return {
    dataGridHeader: {
      width: '895px',
      marginRight: `calc(${drawerWidth}px + 16px)`,
      height: '50px',
      background: '#f9f9f9',
      marginTop: '196px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexFlow: 'row wrap',
    },
    addIcon: {
      borderRadius: '50%',
      border: '1px solid gray',
    },
  }
})

export default function DataGridHeader({ selected }: any) {
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
  const [deleteData, setDeleteData] = useState<string[]>([])
  const { setNotificationMessage, showNotification } = NotificationStore

  const classes = useStyles()
  const router = useRouter()

  const deleteHandler = () => {
    if (selected.length === 0) {
      showNotification()
      setNotificationMessage('You must select at least 1 row.')
      return
    }
    setDeleteOpen(true)
    setDeleteData(selected)
  }

  const deleteProps = {
    deleteOpen,
    setDeleteOpen,
    deleteData,
  }

  return (
    <AppBar elevation={0} className={classes.dataGridHeader}>
      <Typography variant="h4" component="h1">
        Bootcamp Interns
      </Typography>
      <Toolbar disableGutters>
        <IconButton>
          <DeleteForeverIcon onClick={deleteHandler} color="error" />
        </IconButton>
        <IconButton onClick={() => router.push(routes.bootcampIntern.index + '/create')}>
          <AddIcon color="primary" className={classes.addIcon} />
        </IconButton>
        <MultipleRowsDeleteModal modalProps={deleteProps}></MultipleRowsDeleteModal>
      </Toolbar>
    </AppBar>
  )
}
