import { Box, ButtonGroup } from '@material-ui/core'
import { routes } from 'common/routes'
import LinkButton from 'components/shared/LinkButton'

export default function Nav() {
  return (
    <Box textAlign="center">
      <ButtonGroup
        disableRipple
        variant="text"
        color="primary"
        aria-label="text primary button group">
        <LinkButton href={routes.index}>Index</LinkButton>
        <LinkButton href={routes.about}>About</LinkButton>
        <LinkButton href={routes.login}>Login</LinkButton>
        <LinkButton href={routes.register}>Register</LinkButton>
      </ButtonGroup>
    </Box>
  )
}
