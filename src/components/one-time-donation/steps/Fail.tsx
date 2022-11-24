import { useContext, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { Grid, Typography, Button } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import theme from 'common/theme'
import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'
import { StepsContext } from '../helpers/stepperContext'

type Props = {
  campaignSlug: string
}
export default function Fail({ campaignSlug }: Props) {
  const { t } = useTranslation('one-time-donation')
  const { setStep } = useContext(StepsContext)
  const router = useRouter()
  // Clear query so that the first step renders instead of success or fail page
  useEffect(() => {
    router.push(`${router.asPath.split('?')[0]}`)
  }, [])
  return (
    <Grid>
      <Grid container justifyContent="center">
        <ErrorOutlineIcon sx={{ fontSize: 80 }} color="error" />
      </Grid>
      <Grid
        container
        marginTop={theme.spacing(5)}
        marginBottom={theme.spacing(3)}
        rowSpacing={2}
        justifyContent={'center'}
        textAlign="center">
        <Grid item xs={12}>
          <Typography variant="h4" fontSize={14}>
            {t('fail.title')}
          </Typography>
        </Grid>
      </Grid>
      <Grid container rowSpacing={3} justifyContent="center">
        <Grid textAlign="center" item xs={12} md={4}>
          <Button onClick={() => setStep(0)} variant="contained" color="primary">
            {t('fail.btn-again')}
          </Button>
        </Grid>
        <Grid textAlign="center" item xs={12} md={4}>
          <LinkButton
            href={routes.campaigns.viewCampaignBySlug(campaignSlug)}
            variant="contained"
            color="primary">
            {t('fail.btn-back-to-campaign')}
          </LinkButton>
        </Grid>
        <Grid textAlign="center" item xs={12} md={4}>
          <LinkButton href={routes.contact} variant="contained" color="primary">
            {t('fail.btn-connect')}
          </LinkButton>
        </Grid>
      </Grid>
    </Grid>
  )
}
