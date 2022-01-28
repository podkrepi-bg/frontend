import React, { useState } from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { Grid, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

import { routes } from 'common/routes'
import { BootcamperFormData, BootcamperInput, BootcampersResponse } from 'gql/bootcamp'
import { createBootcamper } from 'common/rest'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import BootcampersLayout from './layout/Layout'

const validationSchema: yup.SchemaOf<BootcamperFormData> = yup
    .object()
    .defined()
    .shape({
        MyName: yup.string().required(),
        email: yup.string().required(),
        phone: yup.string().required()
    })

const defaults: BootcamperFormData = {
    MyName: '',
    email: '',
    phone: ''
}

export type BootcamperFormProps = { initialValues?: BootcamperFormData }

export default function CreateBootcamper({ initialValues = defaults }: BootcamperFormProps) {
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
                email: values.email
            })
            resetForm()
            router.push('/bootcamp')
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
        <BootcampersLayout>
            <Grid container direction="column" component="section">
                <Grid item xs={12} style={{ marginTop: "10%" }}>
                    <Typography variant="h5" component="h2">
                        {t('bootcamp:form_heading')}
                    </Typography>
                </Grid>
                <GenericForm
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FormTextField
                                type="text"
                                name="MyName"
                                autoComplete="target-amount"
                                label="bootcamp:bootcamperName"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormTextField
                                type="text"
                                name="email"
                                autoComplete="target-amount"
                                label="bootcamp:bootcamperEmail"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormTextField
                                type="text"
                                name="phone"
                                autoComplete="target-amount"
                                label="bootcamp:bootcamperPhone"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SubmitButton fullWidth label="bootcamp:submit" loading={mutation.isLoading} />
                        </Grid>
                    </Grid>
                </GenericForm>
            </Grid>
        </BootcampersLayout>
    )
}
