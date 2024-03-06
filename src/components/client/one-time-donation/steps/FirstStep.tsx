import React, { useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Trans, useTranslation } from 'next-i18next'
import getConfig from 'next/config'
import dynamic from 'next/dynamic'
import { useField, useFormikContext } from 'formik'
import { OneTimeDonation } from 'gql/donations'
import { CardRegion } from 'gql/donations.enums'

import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { Box, Collapse, Divider, Fade, Grid, List, Typography } from '@mui/material'
import EventRepeatIcon from '@mui/icons-material/EventRepeat'
import { useMediaQuery } from '@mui/material'

import theme from 'common/theme'
import { moneyPublic, moneyPublicDecimals2, toMoney } from 'common/util/money'
import { BIC, ibanNumber } from 'common/iban'
import { isAdmin } from 'common/util/roles'
import RadioButtonGroup from 'components/common/form/RadioButtonGroup'
import { CopyTextButton } from 'components/common/CopyTextButton'
import ExternalLink from 'components/common/ExternalLink'
import CheckboxField from 'components/common/form/CheckboxField'
import FormSelectField from 'components/common/form/FormSelectField'
import NumberInputField from 'components/common/form/NumberInputField'
import { StepsContext } from '../helpers/stepperContext'
import { stripeFeeCalculator, stripeIncludeFeeCalculator } from '../helpers/stripe-fee-calculator'

import { BankDetailsLabel } from 'components/client/support-us-form/SupportUs.styled'

const PaypalDonationButton = dynamic(() => import('../helpers/paypalDonationButton'), {
  ssr: false,
})

export default function FirstStep() {
  const { data: session } = useSession()
  const { t } = useTranslation('one-time-donation')
  const mobile = useMediaQuery('(max-width:600px)')
  const paymentOptions = [
    { value: 'card', label: t('third-step.card') },
    { value: 'paypal', label: 'PayPal', hidden: !isAdmin(session) },
    { value: 'bank', label: t('third-step.bank-payment') },
  ]

  const [paymentField] = useField('payment')
  const [amount] = useField('amount')
  const [amountWithFees] = useField('amountWithFees')
  const [amountWithoutFees] = useField<number>('amountWithoutFees')

  const formik = useFormikContext<OneTimeDonation>()

  //Stripe allows up to $1M for a single transaction. This is close enough
  const STRIPE_LIMIT_BGN = 1500000

  //In best case Paypal allows up to $25k per transaction
  const PAYPAL_LIMIT_BGN = 40000

  const { campaign } = useContext(StepsContext)

  const oneTimePrices =
    campaign.slug === 'petar-v-cambridge' //needed specific prices for this campaign
      ? [2000, 5000, 10000, 20000, 50000, 100000] //TODO: move this to camapign specific config in db
      : [1000, 2000, 5000, 10000, 50000, 100000] //these are default values for all other campaigns

  const bankAccountInfo = {
    owner: t('third-step.owner'),
    bank: t('third-step.bank'),
    iban: ibanNumber,
    bic: BIC,
  }

  useEffect(() => {
    if (
      (amount.value == 'other' || paymentField.value === 'paypal') &&
      formik.values.otherAmount === 0
    ) {
      formik.setFieldValue('otherAmount', 1)
      formik.setFieldTouched('otherAmount', true)
      return
    }

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
    formik.values.isRecurring,
    paymentField.value,
  ])

  return (
    <Grid>
      <Typography variant="h4">{t('third-step.title')}</Typography>
      <Box marginTop={theme.spacing(4)}>
        <RadioButtonGroup
          name="payment"
          columns={paymentOptions.filter((option) => option.hidden != true).length}
          options={paymentOptions}
        />
      </Box>
      <Collapse unmountOnExit in={paymentField.value === 'bank'} timeout="auto">
        <List component="div" disablePadding>
          <Typography variant="h6" mt={4} mb={1}>
            {t('third-step.bank-details')}
          </Typography>
          <Typography variant="body1" marginBottom={theme.spacing(1)}>
            {t('third-step.bank-instructions1')}
          </Typography>
          <Typography variant="body1" mb={3}>
            {t('third-step.bank-instructions2')}
          </Typography>
          <Divider />
          <Grid container alignItems="center" xs={12} mt={2} mb={2}>
            <Grid my={1} pr={2} item justifyContent="flex-start" alignItems="center" xs={4}>
              <BankDetailsLabel>{t('third-step.owner_name')}</BankDetailsLabel>
            </Grid>
            <Grid my={1} item xs={5} justifyContent="flex-start">
              <Typography>{t('third-step.owner_value')}</Typography>
            </Grid>
            <Grid my={1} item xs={3} display="flex" justifyContent="center">
              <CopyTextButton
                label={t('third-step.btn-copy')}
                text={t('third-step.owner_value')}
                variant="contained"
                size="small"
                color="info"
              />
            </Grid>
            <Grid my={1} item justifyContent="flex-start" alignItems="center" xs={4}>
              <BankDetailsLabel>{t('third-step.bank_name')}</BankDetailsLabel>
            </Grid>
            <Grid my={1} item justifyContent="flex-start" alignItems="center" xs={5}>
              <Typography>{t('third-step.bank_value')}</Typography>
            </Grid>
            <Grid my={1} item display="flex" justifyContent="center" xs={3}>
              <CopyTextButton
                label={t('third-step.btn-copy')}
                text={t('third-step.bank_value')}
                variant="contained"
                size="small"
                color="info"
              />
            </Grid>
            <Grid my={1} item justifyContent="flex-start" alignItems="center" xs={4}>
              <BankDetailsLabel>IBAN:</BankDetailsLabel>
            </Grid>
            <Grid my={1} item justifyContent="flex-start" alignItems="center" xs={5}>
              <Typography>{ibanNumber}</Typography>
            </Grid>
            <Grid my={1} item display="flex" justifyContent="center" xs={3}>
              <CopyTextButton
                label={t('third-step.btn-copy')}
                text={bankAccountInfo.iban.replace(/\s+/g, '')} //remove spaces in IBAN on copy
                variant="contained"
                size="small"
                color="info"
              />
            </Grid>
            <Grid my={1} item justifyContent="flex-start" alignItems="center" xs={4}>
              <BankDetailsLabel>BIC:</BankDetailsLabel>
            </Grid>
            <Grid my={1} item justifyContent="flex-start" alignItems="center" xs={5}>
              <Typography>{BIC}</Typography>
            </Grid>
            <Grid my={1} item display="flex" justifyContent="center" xs={3}>
              <CopyTextButton
                label={t('third-step.btn-copy')}
                text={bankAccountInfo.bic}
                variant="contained"
                size="small"
                color="info"
              />
            </Grid>
            <Grid my={1} pr={2} item justifyContent="flex-start" alignItems="center" xs={4}>
              <BankDetailsLabel>{t('third-step.reason-donation')}</BankDetailsLabel>
            </Grid>
            <Grid my={1} item justifyContent="flex-start" alignItems="center" xs={5}>
              <Typography data-testid="payment-reference-field">
                {campaign.paymentReference}
              </Typography>
            </Grid>
            <Grid my={1} item display="flex" justifyContent="center" xs={3}>
              <CopyTextButton
                text={campaign.paymentReference}
                variant="contained"
                color="info"
                size="small"
                label={t('third-step.btn-copy')}
              />
            </Grid>
          </Grid>
          <Divider />
          <Typography mt={2}>{t('third-step.message-warning')}</Typography>
        </List>
      </Collapse>
      <Collapse unmountOnExit in={paymentField.value === 'card'} timeout="auto">
        <Typography paragraph={true} variant="body2" sx={{ marginTop: theme.spacing(2) }}>
          {t('third-step.card-fees')}
          <ExternalLink href="https://stripe.com/en-bg/pricing">
            https://stripe.com/en-bg/pricing
          </ExternalLink>
        </Typography>

        <Typography variant="h4" sx={{ marginTop: theme.spacing(3) }}>
          {t('first-step.amount')}
        </Typography>
        <Box marginTop={theme.spacing(4)}>
          <RadioButtonGroup
            name="amount"
            options={
              oneTimePrices
                .map((v) => ({
                  label: moneyPublic(Number(v), undefined, undefined, 0, 0), //show amounts as integer
                  value: String(Number(v)),
                }))
                .concat({
                  label: t('first-step.other'),
                  value: 'other',
                  hidden: amount.value === 'other',
                } as { label: string; value: string; hidden?: boolean }) || []
            }
          />
          <Fade unmountOnExit in={amount.value === 'other'} exit={false} timeout={200}>
            <Grid
              item
              xs={12}
              style={
                !mobile
                  ? {
                      paddingTop: 16,
                      width: '49%',
                    }
                  : { marginTop: theme.spacing(2) }
              }>
              <NumberInputField limit={STRIPE_LIMIT_BGN} />
            </Grid>
          </Fade>
          {amount.value ? (
            <Box sx={{ mt: 4 }}>
              <Grid container>
                <Grid item xs={8}>
                  <CheckboxField
                    name="cardIncludeFees"
                    label={
                      <Typography variant="body2">{t('third-step.card-include-fees')}</Typography>
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormSelectField
                    name="cardRegion"
                    label={t('third-step.card-region.title')}
                    options={[
                      {
                        key: CardRegion.EU,
                        value: CardRegion.EU,
                        name: t(`third-step.card-region.${CardRegion.EU}`),
                      },
                      {
                        key: CardRegion.UK,
                        value: CardRegion.UK,
                        name: t(`third-step.card-region.${CardRegion.UK}`),
                      },
                      {
                        key: CardRegion.Other,
                        value: CardRegion.Other,
                        name: t(`third-step.card-region.${CardRegion.Other}`),
                      },
                    ]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Trans
                    t={t}
                    i18nKey="third-step.card-calculated-fees"
                    values={{
                      amount: moneyPublicDecimals2(amountWithoutFees.value),
                      fees: moneyPublicDecimals2(amountWithFees.value - amountWithoutFees.value),
                      totalAmount: moneyPublicDecimals2(amountWithFees.value),
                    }}
                  />
                  <ExternalLink href="https://stripe.com/en-bg/pricing">
                    https://stripe.com/en-bg/pricing
                  </ExternalLink>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5" my={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    {t('third-step.recurring-donation-title')}
                    <EventRepeatIcon
                      sx={{ marginLeft: 2 }}
                      fontSize="medium"
                      color={formik.values.isRecurring ? 'success' : 'primary'}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <CheckboxField
                    name="isRecurring"
                    label={
                      <Typography variant="body2">
                        {t('third-step.recurring-donation-info')}
                        <ExternalLink href="https://podkrepi.bg/profile/recurring-donations">
                          https://podkrepi.bg/profile/recurring-donations
                        </ExternalLink>
                      </Typography>
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          ) : null}
        </Box>
      </Collapse>
      <Collapse unmountOnExit in={paymentField.value === 'paypal'} timeout="auto">
        <Grid container justifyContent="center">
          <Grid my={2} item display="flex" justifyContent="center" xs={9}>
            <Typography>
              <b>
                Note 1: This is a test Paypal implementation visible only to logged users with admin
                rights. Using real cards will not charge any money. Note 2: Paypal transaction fee
                is 3.4% + 0.35 euro cents.
              </b>
            </Typography>
          </Grid>
          <Grid my={2} item display="flex" justifyContent="space-between" xs={9}>
            <NumberInputField limit={PAYPAL_LIMIT_BGN} />
          </Grid>
          <Grid my={2} item display="flex" justifyContent="center" xs={9}>
            <PayPalScriptProvider
              options={{
                'client-id': `${getConfig().publicRuntimeConfig.PAYPAL_CLIENT_ID}`,
                currency: 'EUR',
              }}>
              <PaypalDonationButton
                campaignId={campaign.id}
                amount={formik.values.otherAmount as number}
                currency={'EUR'}
              />
            </PayPalScriptProvider>
          </Grid>
        </Grid>
      </Collapse>
    </Grid>
  )
}
