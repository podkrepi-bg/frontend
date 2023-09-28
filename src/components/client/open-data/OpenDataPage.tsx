import React from 'react'

import { useTranslation } from 'next-i18next'

import Layout from 'components/client/layout/Layout'
import ExternalLink from 'components/common/ExternalLink'
import { staticUrls } from 'common/routes'

import { ListItem, Text, UnorderedList } from './OpenDataPage.styled'

export default function OpenDataPage() {
  const { t } = useTranslation()

  return (
    <Layout title={t('nav.dev.open-data')}>
      <Text>
        {t('open-data:swagger-text')}
        <ExternalLink href={staticUrls.swagger}> https://podkrepi.bg/swagger</ExternalLink>
      </Text>
      <Text>
        {t('open-data:ethical-use')}
        <ExternalLink href={staticUrls.licenses}> Creative Commons CC BY-NC 4.0</ExternalLink>
        {t('open-data:rights')}
      </Text>
      <UnorderedList>
        <ListItem>{t('open-data:share')}</ListItem>
        <ListItem>{t('open-data:adapt')}</ListItem>
        <Text>{t('open-data:note')}</Text>
        <Text>{t('open-data:terms')}</Text>
        <ListItem>{t('open-data:acknowledgment')}</ListItem>
        <ListItem>
          {t('open-data:non-commercial-use')}
          <ExternalLink href={staticUrls.commercialPurposes}>
            {' '}
            {t('open-data:commercial-purposes')}
          </ExternalLink>{' '}
          {t('open-data:money-gathering')}
        </ListItem>
        <ListItem>
          {t('open-data:additional-restrictions')}{' '}
          <ExternalLink href={staticUrls.technologicalMeasures}>
            {t('open-data:technological-measures')}
          </ExternalLink>{' '}
          {t('open-data:legal-restrictions')}
        </ListItem>
      </UnorderedList>
    </Layout>
  )
}
