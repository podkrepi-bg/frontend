import React from 'react'
import { useFormikContext } from 'formik'

import { Grid } from '@mui/material'

import PersonCoordinator from './PersonCoordinator'
import CompanyCoordinator from './CompanyCoordinator'

import { CampaignFormData, CoordinatorTypes } from '../helpers/campaign-form.types'

export default function CoordinatorInfo() {
  const { values } = useFormikContext<CampaignFormData>()

  return (
    <Grid container spacing={3} justifyContent="center" direction="column" alignContent="center">
      {values.coordinator === CoordinatorTypes.Person ? (
        <PersonCoordinator />
      ) : (
        <CompanyCoordinator />
      )}
    </Grid>
  )
}
