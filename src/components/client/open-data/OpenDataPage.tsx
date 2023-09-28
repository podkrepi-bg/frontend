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
        {t('open-data:creative-commons-pre-text')}
        <ExternalLink href={staticUrls.licenses}> Creative Commons CC BY-NC 4.0</ExternalLink>
        {t('open-data:creative-commons-after-text')}
      </Text>
      <UnorderedList>
        <ListItem>{t('open-data:share')}</ListItem>
        <ListItem>{t('open-data:adapt')}</ListItem>
        <Text>{t('open-data:note')}</Text>
        <Text>{t('open-data:terms')}</Text>
        <ListItem>
          Признание - Вие сте длъжни да посочите като автор на данните Подкрепи.бг, да дадете
          електронна препратка към лиценза и да укажете дали сте внесли промени. Можете да направите
          това по всеки разумен начин, но не по начин, който предполага, че лицензодателят одобрява
          Вас или използването от Ваша страна на материала.
        </ListItem>
        <ListItem>
          Некомерсиално ползване - Вие нямате право да използвате данните за{' '}
          <ExternalLink href={staticUrls.commercialPurposes}>търговски цели</ExternalLink> в смисъла
          на събирането на пари за данните във вид на файл или за достъп до тях.
        </ListItem>
        <ListItem>
          Без допълнителни ограничения - Вие нямате право да прилагате правни условия или{' '}
          <ExternalLink href={staticUrls.technologicalMeasures}> технологични мерки</ExternalLink>,
          които създават правни ограничения за други лица да извършват разрешеното от лиценза.
        </ListItem>
      </UnorderedList>
    </Layout>
  )
}
