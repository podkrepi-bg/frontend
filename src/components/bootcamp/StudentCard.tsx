import { useState } from 'react'
import {
  Card,
  CardContent,
  Grid,
  Typography,
  CardActions,
  Button,
  Modal,
  Box,
  ButtonGroup,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import makeStyles from '@mui/styles/makeStyles'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'

import { BootcampStudentResponse } from 'gql/bootcamp'
import { CreateStudent } from './CreateStudent'
import { deleteBootcampStudent } from 'common/rest'
import { AlertStore } from 'stores/AlertStore'

type Props = {
  student: BootcampStudentResponse
}

const useStyles = makeStyles(() => {
  return {
    modal: {
      position: 'absolute',
      top: '30%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      backgroundColor: '#fff',
      border: '2px solid #000',
      padding: 16,
      textAlign: 'center',
    },
    cardActions: {
      justifyContent: 'center',
      padding: '8px 0 0 0',
    },
    deleteBtn: {
      ':hover': {
        backgroundColor: '#bf0000',
      },
    },
  }
})

export default function StudentCard({ student }: Props) {
  const router = useRouter()
  const { t } = useTranslation()
  const [modalOpen, setModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const closeModal = () => setModalOpen(false)
  const classes = useStyles()

  const mutation = useMutation({
    mutationFn: deleteBootcampStudent,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const deleteConfirmHandler = async () => {
    try {
      await mutation.mutateAsync({ slug: student.id })
      setModalOpen(false)
      router.replace(router.asPath)
    } catch (error) {
      AlertStore.show(t('common:alerts.error'), 'error')
    }
  }

  return (
    <>
      <Card sx={{ padding: 1, width: '256px', margin: '10px' }}>
        <CardContent sx={{ padding: '0px' }}>
          <Grid container sx={{ alignItems: 'center' }}>
            <Grid item sx={{ display: 'flex' }}>
              <AccountCircleIcon fontSize="large" sx={{ marginRight: 1 }} />
            </Grid>
            <Grid item>
              <Typography variant="h6">
                {student.firstName} {student.lastName}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button variant="contained" size="small" onClick={() => setIsEditModalOpen(true)}>
            Edit
          </Button>
          <Button
            variant="contained"
            size="small"
            color="error"
            className={classes.deleteBtn}
            onClick={() => setModalOpen(true)}>
            Delete
          </Button>
        </CardActions>
      </Card>
      <Modal open={modalOpen} onClose={closeModal}>
        <Box className={classes.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure?
          </Typography>
          <ButtonGroup sx={{ marginTop: 1 }}>
            <Button variant="contained" size="small" onClick={deleteConfirmHandler}>
              Confirm
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              className={classes.deleteBtn}
              onClick={closeModal}>
              Cancel
            </Button>
          </ButtonGroup>
        </Box>
      </Modal>
      <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <Box className={classes.modal}>
          <CreateStudent
            initialValues={student}
            closeModalHandler={() => setIsEditModalOpen(false)}
          />
        </Box>
      </Modal>
    </>
  )
}
