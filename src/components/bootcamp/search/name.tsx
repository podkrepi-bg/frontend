import React from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

import { SearchFormData } from 'gql/search'
import GenericForm from 'components/common/form/GenericForm'
import GenericGrid from '../utils/Grid'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import BootcampersLayout from '../layout/Layout'
import { useBootcampersList } from 'common/hooks/bootcamp'

const validationSchema: yup.SchemaOf<SearchFormData> = yup
    .object()
    .defined()
    .shape({
        keyword: yup.string().required()
    })

const defaults: SearchFormData = {
    keyword: ''
}


export type SearchFormProps = { initialValues?: SearchFormData }

export default function SearchByName({ initialValues = defaults }: SearchFormProps) {
    const [res, setRes] = React.useState([])
    const info = useBootcampersList().data

    const { t } = useTranslation()

    const onSubmit = async (
        values: SearchFormData,
        { setFieldError, resetForm }: FormikHelpers<SearchFormData>,
    ) => {
        try {
            setRes([])
            info?.forEach(x => {
                if (x.MyName.toLowerCase().includes(values.keyword.toLowerCase())) {
                    setRes([...res, x])
                }
            })
            resetForm()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <BootcampersLayout>
            <Grid container direction="column" component="section">
                <Grid item xs={12} style={{ marginTop: "10%" }}>
                    <Typography variant="h5" component="h2">
                        Потърси участници
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
                                name="keyword"
                                autoComplete="target-amount"
                                label="Keyword"
                                defaultValue={initialValues.keyword}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ display: "flex", flexDirection: "column", width: "100px" }}>
                            <SubmitButton label="Потърси участници" />
                        </Grid>
                        <Grid item xs={12}>
                        </Grid>
                    </Grid>
                </GenericForm>
                {res.length > 0 ? <GenericGrid props={{ data: res }}></GenericGrid> : <Typography style={{ textAlign: "center", fontSize: "20px" }}>No results</Typography>}
            </Grid>
        </BootcampersLayout>
    )
}