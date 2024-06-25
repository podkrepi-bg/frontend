import { Typography, Link, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { routes } from 'common/routes'

const StyledRemark = styled(Typography)(() => ({
  textAlign: 'center',
  maxWidth: '80%',
  margin: '100px auto',
  fontSize: '12px',
}))

export default function CampaignApplicationRemark() {
  const { t } = useTranslation('campaign-application')

  return (
    <StyledRemark>
      {t('remark.part-one')}
      <Link href={routes.termsOfService} target="_blank">
        {t('remark.links.terms')}
      </Link>
      {t('remark.part-two')}
      <Link href={routes.faq} target="_blank">
        {t('remark.links.faq')}
      </Link>
    </StyledRemark>
  )
}
