import React, { useEffect } from 'react'
import * as yup from 'yup'
import { useTranslation } from 'next-i18next'
import { useMediaQuery, Collapse, Typography, Grid2 } from '@mui/material'
import { useField, useFormikContext } from 'formik'

import { CardRegion } from 'gql/donations.enums'
import theme from 'common/theme'
import { moneyPublic, toMoney } from 'common/util/money'
import RadioButtonGroup from 'components/common/form/RadioButtonGroup'

import { stripeFeeCalculator, stripeIncludeFeeCalculator } from '../helpers/stripe-fee-calculator'
import { DonationFormData } from '../helpers/types'
import { useSession } from 'next-auth/react'
import { ids } from '../common/DonationFormSections'
import { DonationFormSectionErrorText } from '../common/DonationFormErrors'
import NumberInputField from 'components/common/form/NumberInputField'

export const initialAmountFormValues = {
  amountChosen: '',
  finalAmount: 0,
  otherAmount: 0,
  cardIncludeFees: false,
  cardRegion: CardRegion.EU,
}

export const amountValidation = {
  amountChosen: yup.string().when('payment', {
    is: 'card',
    then: yup.string().optional(),
  }),
  finalAmount: yup.number().when('payment', {
    is: (payment: string | null) => ['card', null].includes(payment),
    then: () =>
      yup.number().min(1, 'donation-flow:step.amount.field.final-amount.error').required(),
  }),
  otherAmount: yup.number().when('amountChosen', {
    is: 'other',
    then: yup.number().min(1, 'donation-flow:step.amount.field.final-amount.error').required(),
  }),
  cardIncludeFees: yup.boolean().when('payment', {
    is: 'card',
    then: yup.boolean().required(),
  }),
  cardRegion: yup
    .string()
    .oneOf(Object.values(CardRegion))
    .when('payment', {
      is: 'card',
      then: yup.string().oneOf(Object.values(CardRegion)).required(),
    }) as yup.SchemaOf<CardRegion>,
}

type SelectDonationAmountProps = {
  disabled?: boolean
  sectionRef?: React.MutableRefObject<HTMLDivElement | null>
  error: boolean
}
export default function Amount({ disabled, sectionRef, error }: SelectDonationAmountProps) {
  const formik = useFormikContext<DonationFormData>()
  const [{ value }] = useField('amountChosen')
  const { t } = useTranslation('donation-flow')
  const { status } = useSession()
  // const { data: prices } = useSinglePriceList()
  const prices = [1000, 2000, 5000, 10000, 50000, 100000]
  const mobile = useMediaQuery('(max-width:600px)')
  useEffect(() => {
    const amountChosen =
      value === 'other'
        ? toMoney(Number(formik.values.otherAmount))
        : Number(formik.values.amountChosen)

    // Do not perform calculations if amount is not set
    if (amountChosen === 0) return

    if (formik.values.cardIncludeFees) {
      formik.setFieldValue('amountWithoutFees', amountChosen)
      formik.setFieldValue(
        'finalAmount',
        stripeIncludeFeeCalculator(amountChosen, formik.values.cardRegion as CardRegion),
      )
    } else {
      formik.setFieldValue(
        'amountWithoutFees',
        amountChosen - stripeFeeCalculator(amountChosen, formik.values.cardRegion as CardRegion),
      )
      formik.setFieldValue('finalAmount', amountChosen)
    }
  }, [
    formik.values.otherAmount,
    formik.values.amountChosen,
    formik.values.cardIncludeFees,
    formik.values.cardRegion,
  ])

  return (
    <Grid2
      container
      ref={sectionRef}
      component="section"
      id={ids['finalAmount']}
      direction={'column'}>
      <Typography variant="h5" my={3}>
        {t('step.amount.title')}?
      </Typography>

      {error && <DonationFormSectionErrorText message={t('general.error.select-field')} />}
      <RadioButtonGroup
        loading={status === 'loading'}
        error={error}
        disabled={disabled}
        name="amountChosen"
        options={
          prices
            ?.sort((a, b) => Number(a) - Number(b))
            .map((v) => ({
              label: moneyPublic(Number(v)),
              value: String(Number(v)),
            }))
            .concat({ label: t('step.amount.field.other-amount.label'), value: 'other' }) || []
        }
      />
      <Collapse unmountOnExit in={value === 'other'} timeout="auto">
        <Grid2
          size={{ xs: 12, sm: 6 }}
          //Since we can't put the otherAmount field in the same grid as the radio buttons
          //if the amount of prices are not even and there is empty space to the right, we need to float it to the right
          style={
            !mobile && Number(prices?.length) % 2 === 0
              ? {
                  float: 'right',
                  marginTop: -50,
                }
              : { marginTop: theme.spacing(2), width: mobile ? '100%' : '49%' }
          }>
          <NumberInputField />
        </Grid2>
      </Collapse>
    </Grid2>
  )
}
