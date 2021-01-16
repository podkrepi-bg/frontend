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
        color="primary"
        aria-label="text primary button group">
        <LinkButton href={routes.index}>{t('ONE')}</LinkButton>
        <LinkButton href={routes.about}>{t('TWO')}</LinkButton>
        <LinkButton href={routes.login}>Login</LinkButton>
        <LinkButton href={routes.register}>Register</LinkButton>
      </ButtonGroup>
    </Box>
  )
}
