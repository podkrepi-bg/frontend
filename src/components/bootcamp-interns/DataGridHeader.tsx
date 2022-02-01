import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { drawerWidth } from './MyDrawer'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddIcon from '@mui/icons-material/Add'
import { useRouter } from 'next/router'
import { routes } from 'common/routes'
import axios from 'axios'
import { endpoints } from 'common/api-endpoints'

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
  const classes = useStyles()
  const router = useRouter()

  const deleteHandler = async () => {
    // if (selected.length > 1) {
    // 	await axios.delete(`http://localhost:5010/api${endpoints.bootcampIntern.listBootcampIntern.url}/selected`, selected)
    // } else {
    // 	await axios.delete(`http://localhost:5010/api${endpoints.bootcampIntern.listBootcampIntern.url}/${selected}`)
    // }

    if (selected.length > 1) {
      selected.map(async (id: string) => {
        await axios.delete(
          `http://localhost:5010/api${endpoints.bootcampIntern.listBootcampIntern.url}/${id}`,
        )
      })
    } else {
      await axios.delete(
        `http://localhost:5010/api${endpoints.bootcampIntern.listBootcampIntern.url}/${selected}`,
      )
    }
    router.push(routes.bootcampIntern.index)
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
      </Toolbar>
    </AppBar>
  )
}
