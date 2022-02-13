import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'

export default function Footer() {
  const theme = useTheme()

  return (
    <footer
      style={{
        position: 'fixed',
        left: '0',
        bottom: '0',
        width: '100%',
        backgroundColor: theme.palette.primary.dark,
        textAlign: 'center',
        color: 'white',
        height: '6.8%',
      }}>
      <Container maxWidth="lg" style={{ marginLeft: '50%' }}>
        <Typography variant="body1" style={{ marginTop: '1%' }}>
          Вие сте логнат като администратор
        </Typography>
      </Container>
    </footer>
  )
}
