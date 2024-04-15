import React, { useEffect } from 'react'
import * as yup from 'yup'
import { useTranslation } from 'next-i18next'
import { useMediaQuery, Collapse, Grid, Typography } from '@mui/material'
import { useField, useFormikContext } from 'formik'

import { CardRegion } from 'gql/donations.enums'
import theme from 'common/theme'
import { useSinglePriceList } from 'common/hooks/donation'
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
    then: yup.string().required(),
  }),
  finalAmount: yup.number().when('payment', {
    is: 'card',
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
  const { data: prices } = useSinglePriceList()
  const mobile = useMediaQuery('(max-width:600px)')
  useEffect(() => {
    const amountChosen =
      value === 'other'
        ? toMoney(Number(formik.values.otherAmount))
        : Number(formik.values.amountChosen)

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
    <Grid
      container
      ref={sectionRef}
      component="section"
      id={ids['finalAmount']}
      direction={'column'}>
      <Typography variant="h5" my={3}>
        {t('step.amount.title')}?
      </Typography>
      <Grid container item gap={2}>
        {error && <DonationFormSectionErrorText message={t('general.error.select-field')} />}
        <RadioButtonGroup
          loading={status === 'loading'}
          error={error}
          disabled={disabled}
          name="amountChosen"
          options={
            prices
              ?.sort((a, b) => Number(a.unit_amount) - Number(b.unit_amount))
              .map((v) => ({
                label: moneyPublic(Number(v.unit_amount)),
                value: String(Number(v.unit_amount)),
              }))
              .concat({ label: t('step.amount.field.other-amount.label'), value: 'other' }) || []
          }
        />
      </Grid>
      <Collapse unmountOnExit in={value === 'other'} timeout="auto">
        <Grid
          item
          xs={12}
          sm={6}
          //Since we can't put the otherAmount field in the same grid as the radio buttons
          //if the amount of prices are not even and there is empty space to the right, we need to float it to the right
          style={
            !mobile && Number(prices?.length) % 2 === 0
              ? {
                  float: 'right',
                  marginTop: -50,
                  width: '100%',
                }
              : { marginTop: theme.spacing(2), width: mobile ? '100%' : '49%' }
          }>
          {/* <FormTextField
            name="otherAmount"
            type="text"
            label={t('step.amount.field.other-amount.label')}
            InputProps={{
              style: { fontSize: 14, padding: 7 },
              endAdornment: (
                <InputAdornment variant="filled" position="end">
                  {t('general.BGN')}
                </InputAdornment>
              ),
            }}
          /> */}
          <NumberInputField />
        </Grid>
      </Collapse>
    </Grid>
  )
}
