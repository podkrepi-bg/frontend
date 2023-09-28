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
        За да осигури пълна прозрачност на дейноста си, освен отворен код, Подкрепи.бг предоставя
        също и отворени данни. Целта е всеки при интерес да може да достъпи анонимизирани данни
        показващи движенията на даренията и сумите по сметките свързани с кампаниите. За да
        достъпите тези данни можете да използвате UI като потребител или директно през публичните
        методи на API. Описанието на API поддържаме чрез Swagger на този адрес:
        <ExternalLink href={staticUrls.swagger}> https://podkrepi.bg/swagger</ExternalLink>
      </Text>
      <Text>
        За етичното използване на отворените данни сме избрали да използваме лиценз Creative Commons
        CC BY-NC 4.0
        <ExternalLink href={staticUrls.licenses}>
          {' '}
          https://creativecommons.org/licenses/by-nc/4.0/
        </ExternalLink>
        , според който имате право да:
      </Text>
      <UnorderedList>
        <ListItem>
          Споделяте - да копирате и повторно да разпространявате материала на всякакъв носител или
          във всякакъв формат
        </ListItem>
        <ListItem>
          Адаптирате - да преработвате, преобразувате и доразвивате материала (Ако спазвате
          условията на лиценза, лицензодателят не може да отмени тези свободи.) При следните
          условия:
        </ListItem>
        <ListItem>
          Признание - Вие сте длъжни да посочите като автор на данните Подкрепи.бг, да дадете
          електронна препратка към лиценза, и да укажете дали сте внесли промени. Можете да
          направите това по всеки разумен начин, но не по начин, който предполага, че лицензодателят
          одобрява Вас или използването от Ваша страна на материала.
        </ListItem>
        <ListItem>
          Некомерсиално ползване - Вие нямате право да използвате данните за{' '}
          <ExternalLink href={staticUrls.commercialPurposes}>търговски цели</ExternalLink> в смисъла
          на събирането на пари за данните във вид на файл или за достъп до тях.
        </ListItem>
      </UnorderedList>
      <Text>
        Без допълнителни ограничения - Вие нямате право да прилагате правни условия или{' '}
        <ExternalLink href={staticUrls.technologicalMeasures}> технологични мерки</ExternalLink>,
        които създават правни ограничения за други лица да извършват разрешеното от лиценза.
      </Text>
    </Layout>
  )
}
