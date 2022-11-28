import React from 'react'

import { useTranslation } from 'next-i18next'

import { Container } from '@mui/material'

import { routes } from 'common/routes'

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
          <DonateButton
            data-testid="jumbotron-donate-button"
            size="large"
            variant="contained"
            href={routes.campaigns.index}>
            {t('common:nav.donate')}
          </DonateButton>
        </JumbotronWrapper>
      </Container>
    </Root>
  )
}
