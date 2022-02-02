import React from 'react'
import * as yup from 'yup'
import { FormikHelpers } from 'formik'
import { Grid, Typography } from '@mui/material'
import { SearchFormData } from 'gql/search'
import GenericForm from 'components/common/form/GenericForm'
import GenericGrid from '../utils/Grid'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import BootcampersLayout from '../layout/Layout'
import { axios } from 'common/api-client'
import theme from '../layout/theme'

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

export default function SearchByPhone({ initialValues = defaults }: SearchFormProps) {
    const [res, setRes] = React.useState([])

    const onSubmit = async (
        values: SearchFormData,
        { resetForm }: FormikHelpers<SearchFormData>,
    ) => {
        try {
            setRes([])
            const data = await axios.get('http://localhost:5010/api/bootcamp/search/name/' + values.keyword)
            setRes(data.data)
            resetForm()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <BootcampersLayout>
            <Grid container direction="column" component="section" style={{ marginLeft: "4%" }}>
                <Grid item xs={12} style={{ marginTop: "10%", marginBottom: "1%", marginLeft: "30%" }}>
                    <Typography variant="h5" component="h2">
                        Потърси участници
                    </Typography>
                </Grid>
                <Grid item style={{ marginLeft: "30%" }}>
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
                            <Grid item xs={12} style={{ display: "flex", flexDirection: "column" }}>
                                <SubmitButton label="Потърси участници" style={{ width: "50%" }} sx={{ bgcolor: theme.palette.primary.light }} />
                            </Grid>
                            <Grid item xs={12}>
                            </Grid>
                        </Grid>
                    </GenericForm>
                </Grid>
                {res.length > 0 ? <GenericGrid props={{ data: res }}></GenericGrid> : <Typography style={{ textAlign: "center", fontSize: "20px", marginRight: "4%" }}>No results</Typography>}
            </Grid>
        </BootcampersLayout >
    )
}