import React from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { Button, Grid, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

import { BootcamperFormData, BootcamperInput, BootcampersResponse } from 'gql/bootcamp'
import { editBootcamper } from 'common/rest'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import BootcampersLayout from '../layout/Layout'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { useViewBootcamper } from 'common/hooks/bootcamp'
import { axios } from 'common/api-client'
import { endpoints } from 'common/api-endpoints'

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

export default function EditBootcamper({ initialValues = defaults }: BootcamperFormProps) {

    const router = useRouter()
    const id = window.location.pathname.split('/')[3]

    const info = useViewBootcamper(id)

    if (!info.isLoading) {
        initialValues.MyName = info.data?.MyName || ''
        initialValues.email = info.data?.email || ''
        initialValues.phone = info.data?.phone || ''
    }

    
    const { t } = useTranslation()

    const mutation = useMutation<
        AxiosResponse<BootcampersResponse>,
        AxiosError<ApiErrors>,
        BootcamperInput
    >({
        mutationFn: editBootcamper,
        onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
        onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
    })



    const onSubmit = async (
        values: BootcamperFormData,
        { setFieldError, resetForm }: FormikHelpers<BootcamperFormData>,
    ) => {
        try {
            const response = await axios.put(
                endpoints.bootcamp.viewBootcamper(id).url,
                values
            )
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
                        {t('bootcamp:edit_form_heading')}
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
                                defaultValue={initialValues.MyName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormTextField
                                type="text"
                                name="email"
                                autoComplete="target-amount"
                                label="bootcamp:bootcamperEmail"
                                defaultValue={initialValues.email}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormTextField
                                type="text"
                                name="phone"
                                autoComplete="target-amount"
                                label="bootcamp:bootcamperPhone"
                                defaultValue={initialValues.phone}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ display: "flex", flexDirection: "column", width: "100px" }}>
                            <SubmitButton label="bootcamp:edit_form_heading" loading={mutation.isLoading} />
                            <Button href="/bootcamp" variant="outlined" style={{ marginTop: "1%" }}>Cancel</Button>
                        </Grid>
                        <Grid item xs={12}>
                        </Grid>
                    </Grid>
                </GenericForm>
            </Grid>
        </BootcampersLayout>
    )
}