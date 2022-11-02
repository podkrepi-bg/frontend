import React from 'react'

import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'

import { Container } from '@mui/material'

import { Root, JumbotronWrapper, MainTitle, DonateButton } from './Jumbotron.styled'

export default function Jumbotron() {
  const { t } = useTranslation()

  return (
    <Root>
      <Container maxWidth="xl">
        <JumbotronWrapper item>
          <MainTitle>
            {t('index:podkrepi')} -
            <br />
            {t('index:title')}
          </MainTitle>
          <DonateButton size="large" variant="contained" href={routes.campaigns.index}>
            {t('common:nav.donatе')}
          </DonateButton>
        </JumbotronWrapper>
      </Container>
    </Root>
  )
}
