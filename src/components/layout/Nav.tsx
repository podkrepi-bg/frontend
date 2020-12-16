import { Box, ButtonGroup } from '@material-ui/core'
import { routes } from 'common/routes'
import LinkButton from 'components/shared/LinkButton'

export default function Nav() {
  return (
    <Box textAlign="center">
      <ButtonGroup
        disableRipple
        variant="text"
        color="secondary"
        aria-label="text primary button group">
        <LinkButton href={routes.index}>One</LinkButton>
        <LinkButton href={routes.about}>Two</LinkButton>
      </ButtonGroup>
    </Box>
  )
}
