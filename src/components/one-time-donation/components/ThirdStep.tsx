import { Collapse, Grid, List, Divider, Typography, Button } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import RadioGroupFormik from './RadioGroupFormik'
import { useField } from 'formik'
import { UseQueryResult } from 'react-query'
import { useRouter } from 'next/router'
import { routes } from 'common/routes'
import { CampaignResponse } from 'gql/campaigns'
import { useViewCampaign } from 'common/hooks/campaigns'
import { CopyTextButton } from '../../common/CopyTextButton'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles(() =>
  createStyles({
    h2: {
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '35px',
      lineHeight: '120%',
      marginTop: '58px',
      marginBottom: '59px',
      letterSpacing: '-0.5px',
      color: '#343434',
    },
    divider: {
      border: '1px solid #000000',
    },
    uncheked: {
      width: '284px',
      height: '75px',
      background: '#FFFFFF',
      border: '1px solid #000000',
      boxSizing: 'border-box',
      borderRadius: '37.5px',
      marginBottom: '33px',
    },
    checked: {
      width: '284px',
      height: '75px',
      background: '#D2F0FF',
      border: '1px solid #000000',
      boxSizing: 'border-box',
      borderRadius: '37.5px',
      marginBottom: '33px',
    },
    body: {
      maxWidth: '539px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }),
)

export default function ThirdStep() {
  const classes = useStyles()
  const [field] = useField('payment')
  const router = useRouter()
  const slug = String(router.query.slug)
  const { data }: UseQueryResult<{ campaign: CampaignResponse }> = useViewCampaign(slug as string)
  const { t } = useTranslation('one-time-donation')
  const bankAccountInfo = {
    owner: t('third-step.owner'),
    bank: t('third-step.bank'),
    iban: 'BG66 UNCR 7000 1524 3490 32',
    campaign: data?.campaign.title,
  }
  const options = [
    { values: 'card', label: t('third-step.card') },
    { values: 'bank', label: t('third-step.bank-payment') },
  ]
  return (
    <Grid className={classes.body}>
      <Grid>
        <Typography className={classes.h2}>{t('third-step.title')}</Typography>
      </Grid>
      <Grid item mx={10}>
        <RadioGroupFormik name="payment" options={options as []} />
      </Grid>
      <Grid>
        <Collapse in={field.value === 'bank'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Typography my={2} mx={10} variant="h6">
              {t('third-step.bank-details')}
            </Typography>
            <Divider className={classes.divider} />
            <Grid mx={11} my={3} container display="flex" justifyContent="space-between" xs={9}>
              <Typography>{bankAccountInfo.owner}</Typography>
              <CopyTextButton
                label={t('third-step.btn-copy')}
                text={bankAccountInfo.owner}
                variant="contained"
                size="small"
                color="info"
              />
            </Grid>
            <Grid mx={11} my={3} container display="flex" justifyContent="space-between" xs={9}>
              <Typography>{bankAccountInfo.bank}</Typography>
              <CopyTextButton
                label={t('third-step.btn-copy')}
                text={bankAccountInfo.bank}
                variant="contained"
                size="small"
                color="info"
              />
            </Grid>
            <Grid mx={11} my={3} container display="flex" justifyContent="space-between" xs={9}>
              <Typography> IBAN: BG66 UNCR 7000 1524 3490 32 </Typography>
              <CopyTextButton
                label={t('third-step.btn-copy')}
                text={bankAccountInfo.iban}
                variant="contained"
                size="small"
                color="info"
              />
            </Grid>
            <Typography my={2} mx={10} variant="h6">
              {t('third-step.reason-donation')}
            </Typography>
            <Divider className={classes.divider} />
            <Grid mx={11} my={3} container display="flex" justifyContent="space-between" xs={9}>
              <Typography>{bankAccountInfo.campaign}</Typography>
              <CopyTextButton
                text={bankAccountInfo.campaign!}
                variant="contained"
                color="info"
                size="small"
                label={t('third-step.btn-copy')}
              />
            </Grid>
            <Typography mx={10}>{t('third-step.message-warning')}</Typography>
          </List>
        </Collapse>
      </Grid>
    </Grid>
  )
}
