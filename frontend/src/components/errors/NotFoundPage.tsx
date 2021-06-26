import { useTranslation } from 'next-i18next'

import Layout from 'components/layout/Layout'
import NotFoundIllustration from './assets/NotFoundIllustration'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return <NotFoundIllustration /> // <p>{t('about:about.title')}</p>
}
