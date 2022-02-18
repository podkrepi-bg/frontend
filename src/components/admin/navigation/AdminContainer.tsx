import { Box, Container } from '@mui/material'

import AppBarMenu from './AppBarMenu'

type Props = React.PropsWithChildren<{
  title: string
}>

export default function AdminContainer({ title, children }: Props) {
  return (
    <Container
      maxWidth={false}
      sx={{
        borderRadius: '13px',
        minHeight: 'calc(100vh - 64px)',
        position: 'relative',
        background: '#e9f6ff',
        width: '100%',
      }}>
      <Container sx={{ pt: '24px' }} disableGutters maxWidth={false}>
        <Box
          sx={{
            background: 'white',
            minHeight: '20rem',
            flexDirection: 'column',
            borderRadius: '13px',
          }}>
          <AppBarMenu title={title} />
          {children}
        </Box>
      </Container>
    </Container>
  )
}
