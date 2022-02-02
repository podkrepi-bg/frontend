import React from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { Button, Grid, Typography } from '@mui/material'

import { BootcamperFormData, BootcamperInput, BootcampersResponse } from 'gql/bootcamp'
import { createBootcamper } from 'common/rest'
import { AlertStore } from './layout/NotificationsAlert/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import BootcampersLayout from './layout/Layout'
import { useTheme } from '@mui/styles'

const validationSchema: yup.SchemaOf<BootcamperFormData> = yup
    .object()
    .defined()
    .shape({
        MyName: yup.string().required(),
        email: yup.string().required(),
        phone: yup.string().required(),
        adress: yup.string().required()
    })

const defaults: BootcamperFormData = {
    MyName: '',
    email: '',
    phone: '',
    adress: ''
} as BootcamperFormData

export type BootcamperFormProps = { initialValues?: BootcamperFormData }

export default function CreateBootcamper({ initialValues = defaults }: BootcamperFormProps) {
    const theme = useTheme()
    const { t } = useTranslation()
    const router = useRouter()

    const mutation = useMutation<
        AxiosResponse<BootcampersResponse>,
        AxiosError<ApiErrors>,
        BootcamperInput
    >({
        mutationFn: createBootcamper,
        onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
        onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
    })

    const onSubmit = async (
        values: BootcamperFormData,
        { setFieldError, resetForm }: FormikHelpers<BootcamperFormData>,
    ) => {
        try {
            await mutation.mutateAsync({
                MyName: values.MyName,
                phone: values.phone,
                email: values.email,
                adress: values.adress
            } as BootcamperInput)
            resetForm()
            router.push('/bootcamp')
            AlertStore.show('Successfully added new bootcamper', 'success', 1)
        } catch (error) {
            console.error(error)
            AlertStore.show('An error occured', 'error')
            if (isAxiosError(error)) {
                const { response } = error as AxiosError<ApiErrors>
                response?.data.message.map(({ property, constraints }) => {
                    setFieldError(property, t(matchValidator(constraints)))
                })
            }
        }
    }

    return (
        <BootcampersLayout>
            <Grid container direction="column" component="section" style={{ marginLeft: "10%" }}>
                <Grid item xs={12} style={{ marginTop: "10%" }}>
                    <Typography variant="h5" component="h2" style={{ marginBottom: "1%" }}>
                        {t('bootcamp:form_heading')}
                    </Typography>
                </Grid>
                <GenericForm
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}>
                    <Grid container spacing={1}>
                        <Grid item sm={5}>
                            <FormTextField
                                style={{ marginTop: "2%", width: "80%" }}
                                type="text"
                                name="MyName"
                                autoComplete="target-amount"
                                label="bootcamp:bootcamperName"
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <FormTextField
                                style={{ marginTop: "2%", width: "80%" }}
                                type="text"
                                name="email"
                                autoComplete="target-amount"
                                label="bootcamp:bootcamperEmail"
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <FormTextField
                                style={{ width: "80%", marginTop: "2%" }}
                                type="text"
                                name="phone"
                                autoComplete="target-amount"
                                label="bootcamp:bootcamperPhone"
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <FormTextField
                                style={{ width: "80%", marginTop: "2%" }}
                                type="text"
                                name="adress"
                                autoComplete="target-amount"
                                label="bootcamp:bootcamperAdress"
                            />
                        </Grid>
                        <Grid item xs={12} style={{ display: "flex", flexDirection: "column", marginLeft: "15%", marginTop: "1.1%" }}>
                            <SubmitButton style={{ width: "50%" }} label="bootcamp:submit" loading={mutation.isLoading} sx={{ backgroundColor: theme.palette.secondary.main }} />
                            <Button onClick={() => { router.push('/bootcamp') }} variant="outlined" sx={{ width: "50%", marginTop: "1%", backgroundColor: theme.palette.primary.main, color: theme.palette.background.default }}>Cancel</Button>
                        </Grid>
                    </Grid>
                </GenericForm>
            </Grid>
        </BootcampersLayout>
    )
}