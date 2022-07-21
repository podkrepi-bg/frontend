import React, { useContext, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Trans, useTranslation } from 'next-i18next'
import { useField, useFormikContext } from 'formik'
import { Box, Collapse, Divider, Grid, InputAdornment, List, Typography } from '@mui/material'
import theme from 'common/theme'
import { useSinglePriceList } from 'common/hooks/donation'
import RadioButtonGroup from 'components/common/form/RadioButtonGroup'
import { moneyPublic, moneyPublicDecimals2, toMoney } from 'common/util/money'
import { ibanNumber } from 'common/iban'
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
  const { data: prices } = useSinglePriceList()
  const { t } = useTranslation('one-time-donation')
  const mobile = useMediaQuery('(max-width:568px)')
  const options = [
    { value: 'card', label: t('third-step.card') },
    { value: 'bank', label: t('third-step.bank-payment') },
  ]

  const [paymentField] = useField('payment')
  const [amount] = useField('amount')
  const [amountWithFees] = useField('amountWithFees')
  const [amountWithoutFees] = useField<number>('amountWithoutFees')

  const formik = useFormikContext<OneTimeDonation>()

  const { campaign } = useContext(StepsContext)
  const bankAccountInfo = {
    owner: t('third-step.owner'),
    bank: t('third-step.bank'),
    iban: ibanNumber,
  }

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
    <Root>
      <Typography variant="h4">{t('third-step.title')}</Typography>
      <Box marginTop={theme.spacing(4)}>
        <RadioButtonGroup name="payment" options={options} />
      </Box>
      <Collapse in={paymentField.value === 'bank'} timeout="auto">
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
          <Grid container justifyContent="center">
            <Grid my={2} item display="flex" justifyContent="space-between" xs={9}>
              <Typography>{bankAccountInfo.owner}</Typography>
              <CopyTextButton
                label={t('third-step.btn-copy')}
                text={bankAccountInfo.owner}
                variant="contained"
                size="small"
                color="info"
              />
            </Grid>
            <Grid my={2} item display="flex" justifyContent="space-between" xs={9}>
              <Typography>{bankAccountInfo.bank}</Typography>
              <CopyTextButton
                label={t('third-step.btn-copy')}
                text={bankAccountInfo.bank}
                variant="contained"
                size="small"
                color="info"
              />
            </Grid>
            <Grid my={1} item display="flex" justifyContent="space-between" xs={9}>
              <Typography>{ibanNumber}</Typography>
              <CopyTextButton
                label={t('third-step.btn-copy')}
                text={bankAccountInfo.iban.replace(/\s+/g, '')} //remove spaces in IBAN on copy
                variant="contained"
                size="small"
                color="info"
              />
            </Grid>
          </Grid>

          <Typography my={1} variant="h6">
            {t('third-step.reason-donation')}
          </Typography>
          <Divider className={classes.divider} />
          <Grid container justifyContent="center">
            <Grid my={2} item display="flex" justifyContent="space-between" xs={9}>
              <Typography fontWeight="bold">{campaign.paymentReference}</Typography>
              <CopyTextButton
                text={campaign.paymentReference}
                variant="contained"
                color="info"
                size="small"
                label={t('third-step.btn-copy')}
              />
            </Grid>
          </Grid>

          <Typography>{t('third-step.message-warning')}</Typography>
        </List>
      </Collapse>
      <Collapse in={paymentField.value === 'card'} timeout="auto">
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
              prices
                ?.sort((a, b) => Number(a.unit_amount) - Number(b.unit_amount))
                .map((v) => ({
                  label: moneyPublic(Number(v.unit_amount)),
                  value: String(Number(v.unit_amount)),
                }))
                .concat({ label: t('first-step.other'), value: 'other' }) || []
            }
          />
          <Collapse in={amount.value === 'other'} timeout="auto">
            <Grid
              rowSpacing={2}
              columnSpacing={2}
              container
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
                      лв.
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Collapse>
          {amount.value ? (
            <Box>
              <Grid container>
                <Grid item xs={10}>
                  <CheckboxField
                    name="cardIncludeFees"
                    label={
                      <Typography variant="body2">{t('third-step.card-include-fees')}</Typography>
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormSelectField
                    name="cardRegion"
                    label={t('third-step.card-region')}
                    options={[
                      { key: CardRegion.EU, value: CardRegion.EU, name: CardRegion.EU },
                      { key: CardRegion.UK, value: CardRegion.UK, name: CardRegion.UK },
                      { key: CardRegion.Other, value: CardRegion.Other, name: CardRegion.Other },
                    ]}
                  />
                </Grid>
              </Grid>
              <Trans
                t={t}
                i18nKey="third-step.card-calculated-fees"
                values={{
                  amount: moneyPublicDecimals2(amountWithoutFees.value),
                  fees: moneyPublicDecimals2(amountWithFees.value - amountWithoutFees.value),
                  totalAmount: moneyPublicDecimals2(amountWithFees.value),
                }}
              />
            </Box>
          ) : null}
        </Box>
      </Collapse>
    </Root>
  )
}
