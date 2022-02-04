import AddBankAccountForm from './helpers/AddForm'
import LayoutPanel from '../navigation/LayoutPanel'
import { Container } from '@mui/material'
function AddFormPage() {
  return (
    <LayoutPanel >
      <Container maxWidth="sm">
        <AddBankAccountForm />
      </Container>
    </LayoutPanel>
  )
}

export default AddFormPage
