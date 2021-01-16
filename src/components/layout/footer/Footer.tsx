import React from 'react'
import { Typography } from '@material-ui/core'

import styles from './footer.module.scss'

const Footer = () => (
  <footer className={styles.footer}>
    <Typography color="primary" align="center">
      Footer Component
    </Typography>
  </footer>
)

export default Footer
