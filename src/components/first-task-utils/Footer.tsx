import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

interface CopyrightProps {
  description: string
}

function Copyright(props: CopyrightProps) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ marginBottom: '0.5%', color: 'white' }}>
      <Link color="inherit" sx={{ fontSize: '13px', textDecoration: 'none' }}>
        © {new Date().getFullYear()} Pordkrepi.bg Bootcamp Module {props.description}
      </Link>{' '}
    </Typography>
  )
}

interface FooterProps {
  description: string
  title: string
}

export default function Footer(props: FooterProps) {
  const { description, title } = props

  return (
    <footer
      style={{
        position: 'fixed',
        left: '0',
        bottom: '0',
        width: '100%',
        backgroundColor: '#46dbf2',
        textAlign: 'center',
        color: 'white',
        height: '6.8%',
      }}>
      <Container maxWidth="lg">
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{ marginTop: '0.5%', fontSize: '13px' }}>
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
          sx={{ color: 'white', fontSize: '13px' }}></Typography>
        <Copyright description={description} />
      </Container>
    </footer>
  )
}
