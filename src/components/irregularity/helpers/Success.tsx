import { useEffect } from 'react'

import { useTranslation } from 'next-i18next'

import { ThemeProvider } from '@mui/styles'
import { Grid, Typography } from '@mui/material'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'

import theme from 'common/theme'
import { routes } from 'common/routes'

import { Root, ActionLinkButton, ButtonsWrapper, Icon } from './Irregularity.styled'

export default function Success() {
  const { t } = useTranslation('irregularity')

  useEffect(() => {
    if (window) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Root container>
        <Icon item xs={12} color="#4BD12A">
          <CheckCircleOutlinedIcon />
        </Icon>
        <Grid item xs={12}>
          <Typography variant="h5">{t('steps.success.title')}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" my={5}>
            {t('steps.success.subtitle')}
          </Typography>
        </Grid>
        <ButtonsWrapper container>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">{t('steps.success.label-campaigns')}</Typography>
            <ActionLinkButton href={routes.campaigns.index} variant="outlined">
              {t('cta.campaigns')}
            </ActionLinkButton>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">{t('steps.success.label-project')}</Typography>
            <ActionLinkButton href={routes.aboutProject} variant="outlined">
              {t('cta.project')}
            </ActionLinkButton>
          </Grid>
        </ButtonsWrapper>
      </Root>
    </ThemeProvider>
  )
}
