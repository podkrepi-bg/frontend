import { useTranslation } from 'react-i18next'
import { Avatar, Box, Button, ButtonGroup } from '@material-ui/core'
import { useSession, signOut } from 'next-auth/client'

import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'

const PrivateNav = () => {
  const { t } = useTranslation()
  const [session] = useSession()

  if (!session) {
    return null
  }
  const title = `${session.user.name} (${session.user.email})`
  return (
    <>
      {session.user.image && <Avatar title={title} alt={title} src={session.user.image} />}
      <Button key="logout" onClick={() => signOut()}>
        {t('nav.logout')}
      </Button>
    </>
  )
}

const PublicNav = () => {
  const { t } = useTranslation()
  return (
    <>
      <LinkButton key="login" href={routes.login}>
        {t('nav.login')}
      </LinkButton>
      <LinkButton key="register" href={routes.register}>
        {t('nav.register')}
      </LinkButton>
    </>
  )
}

export default function Nav() {
  const [session, loading] = useSession()

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
        {!loading && (session ? <PrivateNav /> : <PublicNav />)}
      </ButtonGroup>
    </Box>
  )
}
