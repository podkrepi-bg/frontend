import React from 'react'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FormikErrors } from 'formik'
import { DonationFormData } from '../helpers/types'
import { ids } from './DonationFormSections'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

type DonationFormErrorProps = {
  errors: FormikErrors<DonationFormData>
  show: boolean
}

type DonationFormSections = {
  finalAmount: 'select-amount'
  payment: 'select-payment-method'
  authentication: 'select-authentication-method'
  isRecurring: 'select-recurring-payment'
}

export default function DonationFormErrors({ errors, show }: DonationFormErrorProps) {
  const { t } = useTranslation()

  return (
    <Grid container direction={'column'} gap={2}>
      {show && (
        <>
          {Object.entries(errors).map(([id, err]) => (
            <Grid
              container
              item
              key={id}
              direction="row"
              justifyContent={'flex-start'}
              wrap="nowrap"
              gap={2}
              alignItems={'center'}
              onClick={() => {
                const elementId = ids[id as keyof DonationFormSections] ?? id
                console.log(elementId)
                const element = document.getElementById(elementId)
                const elementPosition = element?.getBoundingClientRect().top
                if (!elementPosition) return
                const offsetPosition = elementPosition + window.scrollY - 150
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
              }}>
              <ArrowUpwardIcon color="error" />
              <Typography
                variant="subtitle2"
                color={'#D32F2F'}
                fontWeight={500}
                fontSize={14}
                sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
                {t(err)}
              </Typography>
            </Grid>
          ))}
        </>
      )}
    </Grid>
  )
}
