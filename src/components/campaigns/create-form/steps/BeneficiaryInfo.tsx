import React from 'react'
import { useFormikContext } from 'formik'

import { Grid } from '@mui/material'

import PersonCoordinator from './PersonBeneficiary'

import { BeneficiaryTypes, CampaignFormData } from '../helpers/campaign-form.types'
import CompanyBeneficiary from './CompanyBeneficiary'

export default function BeneficiaryInfo() {
  const { values } = useFormikContext<CampaignFormData>()

  return (
    <Grid container spacing={3} justifyContent="center" direction="column" alignContent="center">
      {values.beneficiaryType === BeneficiaryTypes.Person ? (
        <PersonCoordinator />
      ) : (
        <CompanyBeneficiary />
      )}
    </Grid>
  )
}
