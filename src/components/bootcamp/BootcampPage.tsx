import { Container } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Layout from './Layout'
import BootcampGrid from './BootcampGrid'

const useStyles = makeStyles({})

export default function BootcampPage() {
  const classes = useStyles()

  return (
    <Layout title="Bootcamp">
      <Container maxWidth="lg">
        <BootcampGrid />
      </Container>
    </Layout>
  )
}
