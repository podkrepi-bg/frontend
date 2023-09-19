import { Box, Container } from '@mui/material'

import AppBarMenu from './AppBarMenu'
import theme from 'common/theme'

type Props = React.PropsWithChildren<{
  title: string
}>

export default function AdminContainer({ title, children }: Props) {
  return (
    <Container
      maxWidth={false}
      sx={{
        borderRadius: '25px',
        minHeight: 'calc(100vh - 64px)',
        position: 'relative',
        background: '#e9f6ff',
        width: '100%',
      }}>
      <Container sx={{ pt: '24px' }} disableGutters maxWidth={false}>
        <Box
          sx={{
            background: theme.palette.common.white,
            minHeight: '20rem',
            flexDirection: 'column',
            borderRadius: '25px',
          }}>
          <AppBarMenu title={title} />
          {children}
        </Box>
      </Container>
    </Container>
  )
}
