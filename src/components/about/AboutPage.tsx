import { Typography } from '@material-ui/core'
import Layout from 'components/layout/Layout'
import { useTranslation } from 'react-i18next'

import styles from './about.module.scss'

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <Layout title={t('about:about')}>
      <Typography variant="body1" className={styles.page}>
        {t('about:content')}
      </Typography>
    </Layout>
  )
}
