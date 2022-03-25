import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as yup from 'yup'

import GenericForm from '../../common/form/GenericForm'
import SubmitButton from '../../common/form/SubmitButton'
import { BootcampTypeFormData } from '../../../gql/bootcamp'
import FormTextField from 'components/common/form/FormTextField'
import { useTranslation } from 'next-i18next'

export let data = [
  {
    id: '1',
    firstName: 'Ivan',
    lastName: 'Ivanov',
    city: 'Sofia',
  },
  {
    id: '2',
    firstName: 'Petq',
    lastName: 'Petrova',
    city: 'Gorna Banq',
  },
]

const Form = () => {
  const router = useRouter()
  const { t } = useTranslation()

  const validationSchema = yup
    .object()
    .defined()
    .shape({
      firstName: yup.string().required().min(4),
      lastName: yup.string().required().min(4),
      city: yup.string().required().min(5),
    })

  function createFormHandler(values: BootcampTypeFormData) {
    const newId = String(Number(data[data.length - 1].id) + 1)
    values.id = newId
    const personData = values

    try {
      data = [...data, personData]
      router.push('/bootcamp')
    } catch (error) {
      console.log(error)
    }
  }

  const initialValues: BootcampTypeFormData = {
    id: '',
    firstName: '',
    lastName: '',
    city: '',
  }

  return (
    <Container>
      <GenericForm
        onSubmit={createFormHandler}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
          <Container
            sx={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 3, width: 400 }}>
            <FormTextField type="" name="firstName" label="Име" variant="outlined" />
            <FormTextField type="" name="lastName" label="Фамилия" variant="outlined" />
            <FormTextField type="" name="city" label="Град" variant="outlined" />
          </Container>
          <Container
            sx={{
              width: 400,
              display: 'flex',
              justifyContent: 'center',
            }}>
            <SubmitButton
              type="submit"
              sx={{ marginRight: 3 }}
              variant="contained"
              label="създай"
            />
            <Link href="/bootcamp">
              <Button variant="contained">Затвори</Button>
            </Link>
          </Container>
        </Container>
      </GenericForm>
    </Container>
  )
}

export default Form
