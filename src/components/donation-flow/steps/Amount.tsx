import React, { useEffect } from 'react'
import * as yup from 'yup'
import { useTranslation } from 'next-i18next'
import { useMediaQuery, Box, Collapse, Grid, InputAdornment, Typography } from '@mui/material'
import { useField, useFormikContext } from 'formik'

import { CardRegion } from 'gql/donations.enums'
import theme from 'common/theme'
import { useSinglePriceList } from 'common/hooks/donation'
import { moneyPublic, toMoney } from 'common/util/money'

import RadioButtonGroup from 'components/common/form/RadioButtonGroup'
import FormTextField from 'components/common/form/FormTextField'

import { stripeFeeCalculator, stripeIncludeFeeCalculator } from '../helpers/stripe-fee-calculator'
import { DonationFormDataV2 } from '../helpers/types'

export const initialAmountFormValues = {
  amount: 'other',
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
    then: () => yup.number().min(1, 'one-time-donation:errors-fields.amount-with-fees').required(),
  }),
  otherAmount: yup.number().when('chosenAmount', {
    is: 'other',
    then: yup.number().min(1, 'one-time-donation:errors-fields.other-amount').required(),
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

export default function Amount({
  sectionRef,
}: {
  sectionRef?: React.MutableRefObject<HTMLDivElement | null>
}) {
  const { data: prices } = useSinglePriceList()
  const formik = useFormikContext<DonationFormDataV2>()
  const { t } = useTranslation('one-time-donation')
  const mobile = useMediaQuery('(max-width:600px)')

  const [amount] = useField('chosenAmount')

  useEffect(() => {
    const chosenAmount =
      amount.value === 'other'
        ? toMoney(Number(formik.values.otherAmount))
        : Number(formik.values.amountChosen)

    if (formik.values.cardIncludeFees) {
      formik.setFieldValue('amountWithoutFees', chosenAmount)
      formik.setFieldValue(
        'finalAmount',
        stripeIncludeFeeCalculator(chosenAmount, formik.values.cardRegion as CardRegion),
      )
    } else {
      formik.setFieldValue(
        'amountWithoutFees',
        chosenAmount - stripeFeeCalculator(chosenAmount, formik.values.cardRegion as CardRegion),
      )
      formik.setFieldValue('finalAmount', chosenAmount)
    }
  }, [
    formik.values.otherAmount,
    formik.values.amountChosen,
    formik.values.cardIncludeFees,
    formik.values.cardRegion,
  ])

  return (
    <Box ref={sectionRef} component="section" id="select-amount">
      <Typography variant="h5" my={3}>
        {t('first-step.amount')}
      </Typography>
      <Box>
        <RadioButtonGroup
          name="amountChosen"
          options={
            prices
              ?.sort((a, b) => Number(a.unit_amount) - Number(b.unit_amount))
              .map((v) => ({
                label: moneyPublic(Number(v.unit_amount)),
                value: String(Number(v.unit_amount)),
              }))
              .concat({ label: t('first-step.other'), value: 'other' }) || []
          }
        />
        <Collapse unmountOnExit in={amount.value === 'other'} timeout="auto">
          <Grid
            item
            xs={12}
            sm={6}
            style={
              !mobile
                ? {
                    float: 'right',
                    marginTop: -50,
                    width: '49%',
                  }
                : { marginTop: theme.spacing(2) }
            }>
            <FormTextField
              name="otherAmount"
              type="number"
              label={t('first-step.amount')}
              InputProps={{
                style: { fontSize: 14, padding: 7 },
                endAdornment: (
                  <InputAdornment variant="filled" position="end">
                    {t('first-step.BGN')}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Collapse>
        {/* TODO: Recurring donation should be added in the future */}
        {/* Take a look at https://github.com/podkrepi-bg/frontend/issues/1308 */}
        {/* {amount.value ? (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ marginTop: theme.spacing(3) }}>
              <CheckboxField
                name="isRecurring"
                label={
                  <Typography variant="body2">{t('third-step.recurring-donation')}</Typography>
                }
              />
            </Typography>
          </Box>
        ) : null} */}
      </Box>
    </Box>
  )
}
