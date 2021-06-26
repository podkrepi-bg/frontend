import Layout from 'components/layout/Layout'
import { useTranslation } from 'next-i18next'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return <p>{t('about:about.title')}</p>
}
