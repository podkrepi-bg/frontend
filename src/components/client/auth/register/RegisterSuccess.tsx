import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { AccountType } from 'gql/user-registration'
import { routes } from 'common/routes'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LinkButton from 'components/common/LinkButton'

type Props = {
  type: AccountType
}
export default function RegisterSuccess({ type }: Props) {
  const { t } = useTranslation()
  return (
    <Grid>
      <Grid container justifyContent="center">
        <CheckCircleOutlineIcon sx={{ fontSize: 80 }} color="success" />
      </Grid>
      <Grid container rowSpacing={2} justifyContent={'center'} textAlign="center">
        <Grid item xs={12}>
          <Typography variant="h4" fontSize={14}>
            {t('auth:register.success')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            {type === AccountType.CORPORATE && t('auth:register.corporate-subtitle-success')}
          </Typography>
        </Grid>
      </Grid>
      <Grid container rowSpacing={3} justifyContent="center" mt={4}>
        <Grid textAlign="center" item xs={12} md={4}>
          <LinkButton
            size="large"
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            href={routes.index}>
            {t('common:nav.go-back-to-index')}
          </LinkButton>
        </Grid>
      </Grid>
    </Grid>
  )
}
