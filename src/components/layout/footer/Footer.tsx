import React from 'react'
import { Typography } from '@material-ui/core'

import styles from './footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Typography color="primary" align="center">
        Footer Component
      </Typography>
    </footer>
  )
}
