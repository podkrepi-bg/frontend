import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { routes } from 'common/routes'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LinkButton from 'components/common/LinkButton'
import ExternalLinkButton from 'components/common/ExternalLinkButton'
import { useField } from 'formik'

export default function Success({ donationId }: { donationId?: string }) {
  const { t } = useTranslation('one-time-donation')
  const [field] = useField('payment')
  return (
    <Grid>
      <Grid container justifyContent="center">
        <CheckCircleOutlineIcon sx={{ fontSize: 80 }} color="success" />
      </Grid>
      <Grid container rowSpacing={2} justifyContent={'center'} textAlign="center">
        <Grid item xs={12}>
          <Typography variant="h4" fontSize={14}>
            {(field.value === 'bank' && t('success.title-bank')) || t('success.title')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            {(field.value === 'bank' && t('success.subtitle-bank')) || t('success.subtitle')}
          </Typography>
        </Grid>
        <Grid item xs={12} pb={2}>
          <Typography>{t('success.share-to')}</Typography>
        </Grid>
      </Grid>
      <Grid container rowSpacing={3} justifyContent="center">
        {donationId && (
          <Grid textAlign={'center'} item xs={12} md={6}>
            <ExternalLinkButton
              href={routes.donation.viewCertificate(donationId)}
              variant="contained"
              color="primary">
              {t('success.btn-generate')}
            </ExternalLinkButton>
          </Grid>
        )}
        <Grid textAlign={'center'} item xs={12} md={6}>
          <LinkButton href={routes.contact} variant="contained" color="primary">
            {t('success.btn-say-to-us')}
          </LinkButton>
        </Grid>
        <Grid textAlign={'center'} item xs={12} md={6}>
          <LinkButton href={routes.campaigns.index} variant="contained" color="primary">
            {t('success.btn-other-campaign')}
          </LinkButton>
        </Grid>
      </Grid>
    </Grid>
  )
}
