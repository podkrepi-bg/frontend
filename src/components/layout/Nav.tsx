import { Box, ButtonGroup } from '@material-ui/core'
import { routes } from 'common/routes'
import LinkButton from 'components/shared/LinkButton'
import { useTranslation } from 'react-i18next'

export default function Nav() {
  const { t } = useTranslation()

  return (
    <Box textAlign="center">
      <ButtonGroup
        disableRipple
        variant="text"
        component="nav"
        color="secondary"
        aria-label="text primary button group">
        <LinkButton href={routes.index}>{t('nav.home')}</LinkButton>
        <LinkButton href={routes.about}>{t('nav.about')}</LinkButton>
        <LinkButton href={routes.login}>{t('nav.login')}</LinkButton>
        <LinkButton href={routes.register}>{t('nav.register')}</LinkButton>
      </ButtonGroup>
    </Box>
  )
}
