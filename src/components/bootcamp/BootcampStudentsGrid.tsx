import { Container, Button, Grid, Modal, Box } from '@mui/material'
import { useBootcampStudentsList } from 'common/hooks/bootcampStudents'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { CreateStudent } from './CreateStudent'
import StudentCard from './StudentCard'

export default function BootcampStudentsGrid() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data } = useBootcampStudentsList()
  const onAddClick = () => setIsModalOpen(true)
  const onCloseModalClick = () => setIsModalOpen(false)
  const { t } = useTranslation()

  return (
    <>
      <Container sx={{ textAlign: 'center' }}>
        <Button variant="contained" onClick={onAddClick}>
          {t('bootcamp:cta.add')}
        </Button>
        <Grid container sx={{ marginTop: 3 }}>
          {data?.map((x) => (
            <Grid item key={x.id}>
              <StudentCard student={x} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Modal open={isModalOpen} onClose={onCloseModalClick}>
        <Box>
          <CreateStudent closeModalHandler={onCloseModalClick} />
        </Box>
      </Modal>
    </>
  )
}
