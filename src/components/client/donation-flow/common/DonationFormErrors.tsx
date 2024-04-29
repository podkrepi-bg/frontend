import React from 'react'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { FormikErrors } from 'formik'
import { DonationFormData } from '../helpers/types'
import { ids, DonationFormSections } from './DonationFormSections'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { ErrorTwoTone } from '@mui/icons-material'
import theme from 'common/theme'
import { StripeError } from '@stripe/stripe-js'
import { id } from 'date-fns/locale'

type DonationFormErrorProps = {
  errors: FormikErrors<DonationFormData>
  show: boolean
  paymentError: StripeError | null
}

type DonationFormSectionErrorTextProps = {
  message: string
}
export function DonationFormSectionErrorText({ message }: DonationFormSectionErrorTextProps) {
  return (
    <Grid container item gap={1}>
      <ErrorTwoTone color="error" />
      <Typography variant="subtitle2" color="error.main">
        {message}
      </Typography>
    </Grid>
  )
}

export function DonationFormErrorList({ errors, show, paymentError }: DonationFormErrorProps) {
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
                const element = document.getElementById(elementId)
                const elementPosition = element?.getBoundingClientRect().top
                if (!elementPosition) return
                const offsetPosition = elementPosition + window.scrollY - 150
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
              }}>
              <ArrowUpwardIcon color="error" />
              <Typography
                variant="subtitle2"
                color={'error.main'}
                component={'strong'}
                fontWeight={500}
                fontSize={theme.typography.pxToRem(14)}
                sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
                {t(err)}
              </Typography>
            </Grid>
          ))}
          {paymentError && (
            <Grid
              container
              item
              direction="row"
              justifyContent={'flex-start'}
              wrap="nowrap"
              gap={2}
              alignItems={'center'}
              onClick={() => {
                const elementId = ids['stripeCardField']
                const element = document.getElementById(elementId)
                const elementPosition = element?.getBoundingClientRect().top
                if (!elementPosition) return
                const offsetY = 100
                const offsetPosition = elementPosition + window.scrollY - offsetY
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
              }}>
              <ArrowUpwardIcon color="error" />
              <Typography
                variant="subtitle2"
                color={'error.main'}
                fontWeight={500}
                component={'strong'}
                fontSize={theme.typography.pxToRem(14)}
                sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
                {paymentError.message}
              </Typography>
            </Grid>
          )}
        </>
      )}
    </Grid>
  )
}
