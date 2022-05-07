import { Box, Collapse, Divider, Grid, List, Typography } from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles'
import { useSinglePriceList } from 'common/hooks/donation'
import RadioButtonGroup from 'components/common/form/RadioButtonGroup'
import { money } from 'common/util/money'
import { useTranslation } from 'next-i18next'
import React, { useContext } from 'react'
import theme from 'common/theme'
import { CopyTextButton } from 'components/common/CopyTextButton'
import { ibanNumber } from 'common/iban'
import { useField } from 'formik'
import { StepsContext } from './StepperContext'

const useStyles = makeStyles(() =>
  createStyles({
    divider: {
      border: '1px solid #000000',
    },
  }),
)

export default function FirstStep() {
  const { data: prices } = useSinglePriceList()
  const { t } = useTranslation('one-time-donation')
  const classes = useStyles()
  const options = [
    { value: 'card', label: t('third-step.card') },
    { value: 'bank', label: t('third-step.bank-payment') },
  ]

  const [paymentField] = useField('payment')
  const { campaign } = useContext(StepsContext)!
  const bankAccountInfo = {
    owner: t('third-step.owner'),
    bank: t('third-step.bank'),
    iban: ibanNumber,
  }
  return (
    <>
      <Typography variant="h4">{t('third-step.title')}</Typography>

      <Box marginTop={theme.spacing(4)}>
        <RadioButtonGroup name="payment" options={options} />
      </Box>
      <Collapse in={paymentField.value === 'bank'} timeout="auto">
        <List component="div" disablePadding>
          <Typography marginTop={theme.spacing(8)} variant="h6">
            {t('third-step.bank-details')}
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
            <Grid my={2} item display="flex" justifyContent="space-between" xs={9}>
              <Typography>{ibanNumber}</Typography>
              <CopyTextButton
                label={t('third-step.btn-copy')}
                text={bankAccountInfo.iban}
                variant="contained"
                size="small"
                color="info"
              />
            </Grid>
          </Grid>

          <Typography my={2} variant="h6">
            {t('third-step.reason-donation')}
          </Typography>
          <Divider className={classes.divider} />
          <Grid container justifyContent="center">
            <Grid my={3} item display="flex" justifyContent="space-between" xs={9}>
              <Typography>{campaign.title}</Typography>
              <CopyTextButton
                text={campaign.title}
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
        <Typography variant="h4" sx={{ marginTop: theme.spacing(8) }}>
          {t('first-step.amount')}
        </Typography>
        <Box marginTop={theme.spacing(4)}>
          <RadioButtonGroup
            name="amount"
            options={
              prices
                ?.sort((a, b) => Number(a.unit_amount) - Number(b.unit_amount))
                .map((v) => ({
                  label: money(Number(v.unit_amount)),
                  value: v.id,
                })) || []
            }
          />
        </Box>
      </Collapse>
    </>
  )
}
