import { useTranslation } from 'next-i18next'
import { Grid2, Typography } from '@mui/material'
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
    <Grid2>
      <Grid2 container justifyContent="center">
        <CheckCircleOutlineIcon sx={{ fontSize: 80 }} color="success" />
      </Grid2>
      <Grid2 container rowSpacing={2} justifyContent={'center'} textAlign="center">
        <Grid2 size={12}>
          <Typography variant="h4" fontSize={14}>
            {t('auth:register.success')}
          </Typography>
        </Grid2>
        <Grid2 size={12}>
          <Typography>
            {type === AccountType.CORPORATE && t('auth:register.corporate-subtitle-success')}
          </Typography>
        </Grid2>
      </Grid2>
      <Grid2 container rowSpacing={3} justifyContent="center" mt={4}>
        <Grid2
          textAlign="center"
          size={{
            xs: 12,
            md: 4
          }}>
          <LinkButton
            size="large"
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            href={routes.index}>
            {t('common:nav.go-back-to-index')}
          </LinkButton>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
