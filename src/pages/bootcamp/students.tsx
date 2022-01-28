import { useState } from 'react'
import { Box, Button, Container, Grid, Modal } from '@mui/material'
import Layout from 'components/layout/Layout'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from 'react-query'

import { queryFn } from 'common/rest'
import { useBootcampStudentsList } from 'common/hooks/bootcampStudents'
import StudentCard from 'components/bootcamp/StudentCard'
import { CreateStudent } from 'components/bootcamp/CreateStudent'

export type BootcampStudent = {
  firstName: string
  lastName: string
  id?: string
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const client = new QueryClient()
  await client.prefetchQuery('/bootcamp-student', queryFn)
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'validation'])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default function BootcampStudentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data } = useBootcampStudentsList()
  const { t } = useTranslation()
  const onAddClick = () => setIsModalOpen(true)
  const onCloseModalClick = () => setIsModalOpen(false)

  return (
    <Layout title={t('nav.bootcamp.students')}>
      <Container sx={{ textAlign: 'center' }}>
        <Button variant="contained" onClick={onAddClick}>
          Add new
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
    </Layout>
  )
}
