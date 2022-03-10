import { Box, Button, Link, Modal, Typography } from '@mui/material'
import { useSession } from 'common/util/useSession'
import Tab from './Tab'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'
import { makeStyles, useTheme } from '@mui/styles'

const useStyles = makeStyles({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    backgroundColor: '#EEEEEE',
    padding: 20,
  },
  editSpan: {
    color: '#294E85',
  },
  deleteAccountButton: { color: '#294E85', float: 'right' },
  editIcon: { position: 'relative', top: '7px' },
  heading: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '24px',
    lineHeight: '123.5%',
    /* identical to box height, or 30px */
    letterSpacing: '0.25px',
    color: '#000000',
  },
})

function PersonalInfoTab(props: any) {
  const { value, index } = props
  const { session } = useSession()
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false)
  const classes = useStyles()

  return (
    <>
      <Tab value={value} index={index}>
        <h1>Лична информация</h1>
        <h2 className={classes.heading}>Login информация</h2>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              backgroundColor: '#EEEEEE',
              padding: '10px',
              flexBasis: '50%',
              marginRight: '20px',
            }}>
            <p>еmail адрес:</p>
            <p>{session?.email}</p>
          </Box>
          <Box
            sx={{
              backgroundColor: '#EEEEEE',
              padding: '10px',
              flexBasis: '50%',
              position: 'relative',
            }}>
            <p>парола:</p>
            <p>***********</p>
            <Box sx={{ position: 'absolute', right: '5px', top: '5px' }}>
              <Link href="#">
                <EditIcon className={classes.editIcon}></EditIcon>
                <span className={classes.editSpan}>Редактирай</span>
              </Link>
            </Box>
          </Box>
        </Box>
        <hr></hr>
        <h2 className={classes.heading}>Лична информация</h2>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              backgroundColor: '#EEEEEE',
              padding: '10px',
              flexBasis: '50%',
              marginRight: '20px',
              position: 'relative',
            }}>
            <p>Име:</p>
            <p>{session?.name}</p>
            <Box sx={{ position: 'absolute', right: '5px', top: '5px' }}>
              <Link href="#">
                <EditIcon className={classes.editIcon}></EditIcon>
                <span className={classes.editSpan}>Редактирай</span>
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: '#EEEEEE',
              padding: '10px',
              flexBasis: '50%',
              position: 'relative',
            }}>
            <p>рожден ден:</p>
            <p>не е наличен</p>
            <Box sx={{ position: 'absolute', right: '5px', top: '5px' }}>
              <Link href="#">
                <EditIcon className={classes.editIcon}></EditIcon>
                <span className={classes.editSpan}>Редактирай</span>
              </Link>
            </Box>
          </Box>
        </Box>
        <hr></hr>
        <Link
          href="#"
          className={classes.deleteAccountButton}
          onClick={() => setIsDeleteAccountModalOpen(true)}>
          изтриване на акаунт/ профил
        </Link>
      </Tab>
      <Modal
        open={isDeleteAccountModalOpen}
        onClose={() => setIsDeleteAccountModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className={classes.modal}>
          <Typography variant="h6" component="h2">
            Изтриване на профил
          </Typography>
          <Typography>Ние съжаляваме, че ни напущате</Typography>
          <Typography variant="h4" sx={{ fontSize: '24px', mb: 0 }}>
            Преди да ни напуснете ...
          </Typography>
          <hr></hr>
          <ul style={{ listStyle: 'disc' }}>
            <li>
              Ако ви е писнало от емейли, деактивирайте ги от <Link href="#">тук</Link>.
            </li>
            <li>
              Ако .........................., моля пишете <Link href="#">тук</Link>.
            </li>
            <li>Изтриването на акаунт е окончателно.</li>
            <li>Няма да има начин да възстановите акаунта си.</li>
          </ul>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={() => setIsDeleteAccountModalOpen(false)}>
            Запази моя профил
          </Button>
          <Button variant="contained" size="large" color="secondary" style={{ marginLeft: '10px' }}>
            Изтрий
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default PersonalInfoTab
