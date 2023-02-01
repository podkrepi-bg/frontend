import React, { useContext, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useMediaQuery, Box, Collapse, Grid, InputAdornment, Typography } from '@mui/material'
import { useField, useFormikContext } from 'formik'

import { OneTimeDonation } from 'gql/donations'

import theme from 'common/theme'
import { useSinglePriceList } from 'common/hooks/donation'
import { moneyPublic, toMoney } from 'common/util/money'

import RadioButtonGroup from 'components/common/form/RadioButtonGroup'
import FormTextField from 'components/common/form/FormTextField'
import { useUpdatePaymentIntent } from 'service/donation'

import { stripeFeeCalculator, stripeIncludeFeeCalculator } from '../helpers/stripe-fee-calculator'
import { DonationFlowContext } from '../DonationFlowContext'
import { Currencies } from 'components/withdrawals/WithdrawalTypes'

export default function Amount({
  sectionRef,
}: {
  sectionRef?: React.MutableRefObject<HTMLDivElement | null>
}) {
  const { data: prices } = useSinglePriceList()
  const { stripePaymentIntent } = useContext(DonationFlowContext)
  const formik = useFormikContext<OneTimeDonation>()
  const { t } = useTranslation('one-time-donation')
  const mobile = useMediaQuery('(max-width:600px)')

  const [amount] = useField('amount')
  //stripePaymentIntent is always a string if this element is rendered
  const updatePaymentIntentMutation = useUpdatePaymentIntent(stripePaymentIntent?.id as string)

  useEffect(() => {
    if (amount.value) {
      updatePaymentIntentMutation.mutate({
        amount: Number(amount.value),
        currency: Currencies.BGN,
      })
    }
  }, [amount.value])

  useEffect(() => {
    const chosenAmount =
      amount.value === 'other' ? toMoney(formik.values.otherAmount) : Number(formik.values.amount)

    if (formik.values.cardIncludeFees) {
      formik.setFieldValue('amountWithoutFees', chosenAmount)
      formik.setFieldValue(
        'amountWithFees',
        stripeIncludeFeeCalculator(chosenAmount, formik.values.cardRegion),
      )
    } else {
      formik.setFieldValue(
        'amountWithoutFees',
        chosenAmount - stripeFeeCalculator(chosenAmount, formik.values.cardRegion),
      )
      formik.setFieldValue('amountWithFees', chosenAmount)
    }
  }, [
    formik.values.otherAmount,
    formik.values.amount,
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
          name="amount"
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
