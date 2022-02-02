import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Grid, Typography, ButtonGroup, Button } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import * as yup from 'yup'
import { AxiosResponse, AxiosError } from 'axios'
import { FormikHelpers } from 'formik'
import { useMutation } from 'react-query'

import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { createAnimal, editAnimal } from 'common/rest'
import { routes } from 'common/routes'
import { AnimalResponse, AnimalInput } from 'gql/bootcamp'

import FormTextField from 'components/common/form/FormTextField'
import GenericForm from 'components/common/form/GenericForm'
import { AlertStore } from 'stores/AlertStore'

const validationSchema: yup.SchemaOf<AnimalInput> = yup
  .object()
  .defined()
  .shape({
    name: yup.string().trim().min(3).max(10).required(),
    type: yup.string().trim().min(3).max(10).required(),
    id: yup.string().uuid(),
  })

const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      backgroundColor: theme.palette.background.paper,
      padding: 16,
      textAlign: 'center',
      justifyContent: 'center',
    },
    deleteBtn: {
      ':hover': {
        backgroundColor: '#bf0000',
      },
    },
  }),
)

const defaults: AnimalResponse = {
  id: '',
  name: '',
  type: '',
}

type Props = {
  initialValues?: AnimalResponse
  redirectUrl?: string
  successHandler?: (newAnimal: AnimalResponse) => void
  closeModal?: () => void
}

export default function CreatePetForm({
  initialValues,
  redirectUrl,
  successHandler,
  closeModal,
}: Props) {
  const router = useRouter()
  const { t } = useTranslation()
  const classes = useStyles()
  const mutation = useMutation<
    AxiosResponse<AnimalResponse>,
    AxiosError<ApiErrors>,
    AnimalResponse
  >({
    mutationFn: initialValues ? editAnimal : createAnimal,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const cancelHandler = () => {
    router.push(redirectUrl || routes.bootcamp.dashboard.pets)
  }

  const submitHandler = async (
    values: AnimalResponse,
    { setFieldError }: FormikHelpers<AnimalResponse>,
  ) => {
    try {
      await mutation.mutateAsync({
        name: values.name,
        type: values.type,
        id: initialValues?.id || '',
      })
      if (successHandler) {
        successHandler({
          name: values.name,
          type: values.type,
          id: initialValues?.id || '',
        })
      } else {
        cancelHandler()
      }
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) {
        const { response } = error as AxiosError<ApiErrors>
        response?.data.message.map(({ property, constraints }) => {
          setFieldError(property, t(matchValidator(constraints)))
        })
      }
    }
  }

  return (
    <Grid className={classes.modal} container direction="column">
      <Grid item sx={{ mb: 1 }}>
        <Typography variant="h6">
          {initialValues
            ? t('common:nav.bootcamp.pets.edit')
            : t('common:nav.bootcamp.pets.create')}
        </Typography>
      </Grid>
      <GenericForm
        initialValues={initialValues || defaults}
        validationSchema={validationSchema}
        onSubmit={submitHandler}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              label={t('bootcamp:pets.name')}
              name="name"
              autoComplete="name"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              label={t('bootcamp:pets.type')}
              name="type"
              autoComplete="type"
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonGroup>
              <Button variant="contained" type="submit" disabled={mutation.isLoading}>
                {initialValues ? t('bootcamp:cta.edit') : t('bootcamp:cta.add')}
              </Button>
              <Button
                variant="contained"
                size="small"
                color="error"
                className={classes.deleteBtn}
                onClick={closeModal || cancelHandler}>
                {t('bootcamp:cta.cancel')}
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
