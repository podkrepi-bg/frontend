import { Box, Button, Link, Modal, Typography } from '@mui/material'
import { useSession } from 'common/util/useSession'
import Tab from './Tab'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
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
    letterSpacing: '0.25px',
    color: '#000000',
    paddingLeft: '30px',
  },
  bold: {
    fontWeight: 'bold',
  },
  notAvaible: {
    color: '#F22727',
  },
  graySpan: {
    fontFamily: 'Lato, sans-serif',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '133.4%',
    color: '#909090',
  },
  h5: {
    fontFamily: 'Lato, sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '22px',
    lineHeight: '133.4%',
  },
  h3: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '25px',
    lineHeight: '116.7%',
    margin: '0',
  },
})

function PersonalInfoTab(props: { value: number; index: number }) {
  const { value, index } = props
  const { session } = useSession()
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false)
  const classes = useStyles()

  return (
    <>
      <Tab value={value} index={index}>
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '10px 30px',
            margin: '10px 0 0 0',
          }}>
          <h3 className={classes.h3}>Лична информация</h3>
        </Box>
        <Box sx={{ background: 'white', paddingTop: '30px' }}>
          <h2 className={classes.heading}>Login информация:</h2>
          <Box sx={{ display: 'flex', paddingLeft: '30px' }}>
            <Box
              sx={{
                backgroundColor: '#E9F6FF',
                padding: '10px',
                flexBasis: '50%',
                marginRight: '20px',
              }}>
              <p className={classes.bold}>еmail адрес:</p>
              <p>{session?.email}</p>
            </Box>
            <Box
              sx={{
                backgroundColor: '#E9F6FF',
                padding: '10px',
                flexBasis: '50%',
                position: 'relative',
                marginRight: '10px',
              }}>
              <p className={classes.bold}>парола:</p>
              <p>***********</p>
              <Box sx={{ position: 'absolute', right: '5px', top: '5px' }}>
                <Link href="#">
                  <EditIcon className={classes.editIcon} />
                  <span className={classes.editSpan}>Редактирай</span>
                </Link>
              </Box>
            </Box>
          </Box>
          <hr />
          <h2 className={classes.heading}>Лична информация:</h2>
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                backgroundColor: '#E9F6FF',
                padding: '10px',
                flexBasis: '50%',
                marginRight: '20px',
                position: 'relative',
                marginLeft: '30px',
              }}>
              <p className={classes.bold}>Име:</p>
              <p>{session?.name}</p>
              <Box sx={{ position: 'absolute', right: '5px', top: '5px' }}>
                <Link href="#">
                  <EditIcon className={classes.editIcon} />
                  <span className={classes.editSpan}>Редактирай</span>
                </Link>
              </Box>
            </Box>
            <Box
              sx={{
                backgroundColor: '#E9F6FF',
                padding: '10px',
                flexBasis: '50%',
                position: 'relative',
                marginRight: '10px',
              }}>
              <p className={classes.bold}>рожден ден:</p>
              <p className={classes.notAvaible}>не е наличен</p>
              <Box sx={{ position: 'absolute', right: '5px', top: '5px' }}>
                <Link href="#">
                  <EditIcon className={classes.editIcon} />
                  <span className={classes.editSpan}>Редактирай</span>
                </Link>
              </Box>
            </Box>
          </Box>
          <hr />
          <Link
            href="#"
            className={classes.deleteAccountButton}
            onClick={() => setIsDeleteAccountModalOpen(true)}>
            изтриване на акаунт/ профил
          </Link>
        </Box>
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
          <Typography className={classes.graySpan}>Ние съжаляваме, че ни напущате</Typography>
          <Typography className={classes.heading}>Преди да ни напуснете ...</Typography>
          <hr />
          <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
            <li className={classes.h5}>
              Ако ви е писнало от емейли, деактивирайте ги от <Link href="#">тук</Link>.
            </li>
            <li className={classes.h5}>
              Ако .........................., моля пишете <Link href="#">тук</Link>.
            </li>
            <li className={classes.h5}>Изтриването на акаунт е окончателно.</li>
            <li className={classes.h5}>Няма да има начин да възстановите акаунта си.</li>
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
