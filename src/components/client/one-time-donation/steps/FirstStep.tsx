import React, { useContext, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Trans, useTranslation } from 'next-i18next'
import { isInteger, useField, useFormikContext } from 'formik'
import { Box, Collapse, Divider, Grid, InputAdornment, List, Typography } from '@mui/material'
import EventRepeatIcon from '@mui/icons-material/EventRepeat'
import theme from 'common/theme'
import RadioButtonGroup from 'components/common/form/RadioButtonGroup'
import { moneyPublic, moneyPublicDecimals2, toMoney } from 'common/util/money'
import { BIC, ibanNumber } from 'common/iban'
import { CopyTextButton } from 'components/common/CopyTextButton'
import { StepsContext } from '../helpers/stepperContext'
import FormTextField from 'components/common/form/FormTextField'
import { useMediaQuery } from '@mui/material'
import { OneTimeDonation } from 'gql/donations'
import ExternalLink from 'components/common/ExternalLink'
import { stripeFeeCalculator, stripeIncludeFeeCalculator } from '../helpers/stripe-fee-calculator'
import CheckboxField from 'components/common/form/CheckboxField'
import FormSelectField from 'components/common/form/FormSelectField'
import { CardRegion } from 'gql/donations.enums'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { isAdmin } from 'common/util/roles'
import { useSession } from 'next-auth/react'
import getConfig from 'next/config'

import dynamic from 'next/dynamic'
const PaypalDonationButton = dynamic(() => import('../helpers/paypalDonationButton'), {
  ssr: false,
})

const PREFIX = 'FirstStep'

const classes = {
  divider: `${PREFIX}-divider`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(() => ({
  [`& .${classes.divider}`]: {
    border: '1px solid #000000',
  },
}))

export default function FirstStep() {
  const { data: session } = useSession()
  const { t, i18n } = useTranslation('one-time-donation')
  const mobile = useMediaQuery('(max-width:600px)')
  const paymentOptions = [
    { value: 'card', label: t('third-step.card') },
    { value: 'paypal', label: 'PayPal', hidden: !isAdmin(session) },
    { value: 'bank', label: t('third-step.bank-payment') },
  ]

  const decimalSeparator = (1.1).toLocaleString(i18n.lang).charAt(1)

  const [paymentField] = useField('payment')
  const [amount] = useField('amount')
  const [otherAmount] = useField('otherAmount')
  const [amountWithFees] = useField('amountWithFees')
  const [amountWithoutFees] = useField<number>('amountWithoutFees')

  const formik = useFormikContext<OneTimeDonation>()

  //Stripe allows up to $1M for a single transaction. This is close enough
  const SUM_LIMIT_BGN = 1500000

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
    if (amount.value == 'other' && formik.values.otherAmount === 0) {
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
  ])

  return (
    <Root>
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
          <Typography marginTop={theme.spacing(4)} variant="h6">
            {t('third-step.bank-details')}
          </Typography>
          <Typography variant="body1" marginBottom={theme.spacing(1)}>
            {t('third-step.bank-instructions1')}
          </Typography>
          <Typography variant="body1" marginBottom={theme.spacing(1)}>
            {t('third-step.bank-instructions2')}
          </Typography>
          <Divider className={classes.divider} />
          <Grid container alignItems="center" xs={12}>
            <Grid my={1} item justifyContent="flex-start" alignItems="center" xs={4}>
              <Typography paddingLeft={2}>{t('third-step.owner_name')}</Typography>
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
              <Typography paddingLeft={2}>{t('third-step.bank_name')}</Typography>
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
              <Typography paddingLeft={2}>IBAN:</Typography>
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
              <Typography paddingLeft={2}>BIC:</Typography>
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
            <Grid my={1} item justifyContent="flex-start" alignItems="center" xs={4}>
              <Typography paddingLeft={2} my={1}>
                {t('third-step.reason-donation')}
              </Typography>
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
          <Divider className={classes.divider} />
          <Typography>{t('third-step.message-warning')}</Typography>
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
                  label: moneyPublic(Number(v)),
                  value: String(Number(v)),
                }))
                .concat({ label: t('first-step.other'), value: 'other' }) || []
            }
          />
          <Collapse unmountOnExit in={amount.value === 'other'} timeout="auto">
            <Grid
              item
              xs={12}
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
                value={formik.values.otherAmount === 1 ? '' : formik.values.otherAmount}
                label={t('first-step.amount')}
                lang={i18n.language}
                onKeyDown={(e) => {
                  if (
                    formik.errors.otherAmount &&
                    e.key !== 'Backspace' &&
                    e.key !== 'Delete' &&
                    e.key.charCodeAt(0) < 48 &&
                    e.key.charCodeAt(0) > 57
                  ) {
                    e.preventDefault()
                    return
                  }
                  if (decimalSeparator !== e.key && (e.key === '.' || e.key === ',')) {
                    e.preventDefault()
                    return
                  }

                  if (
                    (e.key.charCodeAt(0) >= 48 && e.key.charCodeAt(0) <= 57) ||
                    (isInteger(formik.values.otherAmount) && e.key === decimalSeparator) ||
                    (e.ctrlKey && e.key === 'v') ||
                    (e.ctrlKey && e.key === 'c') ||
                    e.key === 'Backspace' ||
                    e.key === 'Delete' ||
                    (e.ctrlKey && e.key === 'a') ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowDown' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.code === 'NumpadDecimal'
                  ) {
                    return
                  }

                  e.preventDefault()
                }}
                onPaste={async (e) => {
                  e.preventDefault()

                  const value = e.clipboardData.getData('Text')
                  const transformedValue: string = value.replace(/ /g, '') as string
                  formik.setFieldValue('otherAmount', transformedValue)
                }}
                onChange={(e) => {
                  const amount = e.target.value
                  if (isNaN(Number(amount))) return
                  if (Number(amount) > SUM_LIMIT_BGN) {
                    formik.setFieldError(
                      'otherAmount',
                      `${t('first-step.transaction-limit')} ${moneyPublic(
                        SUM_LIMIT_BGN,
                        'BGN',
                        1,
                      )}`,
                    )
                    return
                  } else if (Number(amount) < 1) {
                    formik.setFieldValue('otherAmount', 1)
                    return
                  }

                  formik.setFieldValue('otherAmount', amount)
                }}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputProps: {
                    max: SUM_LIMIT_BGN,
                    inputMode: 'decimal',
                  },
                  style: { padding: 7 },
                  endAdornment: (
                    <InputAdornment variant="filled" position="end">
                      {t('first-step.BGN')}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Collapse>
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
                      </Typography>
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          ) : null}
        </Box>
      </Collapse>
      <Collapse unmountOnExit in={paymentField.value === 'paypal'}>
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
            <FormTextField
              name="otherAmount"
              type="number"
              value={formik.values.otherAmount === 0 ? 1 : formik.values.otherAmount}
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
          <Grid my={2} item display="flex" justifyContent="center" xs={9}>
            <PayPalScriptProvider
              options={{
                'client-id': `${getConfig().publicRuntimeConfig.PAYPAL_CLIENT_ID}`,
                currency: 'EUR',
              }}>
              <PaypalDonationButton
                campaignId={campaign.id}
                amount={otherAmount.value as number}
                currency={'EUR'}
              />
            </PayPalScriptProvider>
          </Grid>
        </Grid>
      </Collapse>
    </Root>
  )
}
