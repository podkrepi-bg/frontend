import { useEffect } from 'react'

import { useTranslation } from 'next-i18next'

import { ThemeProvider } from '@mui/styles'
import { Grid2, Typography } from '@mui/material'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'

import theme from 'common/theme'
import { routes } from 'common/routes'

import { Root, ButtonsWrapper, Icon, ActionLinkButton, ActionButton } from './Irregularity.styled'

type Props = {
  setFail: (fail: boolean) => void
  setActiveStep: (step: number) => void
}

export default function Fail({ setFail, setActiveStep }: Props) {
  const { t } = useTranslation('irregularity')

  useEffect(() => {
    if (window) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const handleClick = () => {
    setFail(false)
    setActiveStep(0)
  }

  return (
    <ThemeProvider theme={theme}>
      <Root container>
        <Icon item xs={12} color="#F44336">
          <ErrorOutlineOutlinedIcon />
        </Icon>
        <Grid2 size={12}>
          <Typography variant="h5">{t('steps.fail.title')}</Typography>
        </Grid2>
        <Grid2 my={5} size={12}>
          <Typography variant="h6">{t('steps.fail.subtitle')}</Typography>
        </Grid2>
        <ButtonsWrapper container item>
          <Grid2>
            <Typography variant="body1">{t('steps.fail.label-campaigns')}</Typography>
            <ActionLinkButton href={routes.campaigns.index} variant="outlined">
              {t('cta.campaigns')}
            </ActionLinkButton>
          </Grid2>
          <Grid2>
            <Typography variant="body1">{t('steps.fail.label-project')}</Typography>
            <ActionLinkButton href={routes.aboutProject} variant="outlined">
              {t('cta.project')}
            </ActionLinkButton>
          </Grid2>
          <Grid2>
            <Typography variant="body1">{t('steps.fail.label-redo')}</Typography>
            <ActionButton onClick={handleClick} variant="outlined">
              {t('cta.redo')}
            </ActionButton>
          </Grid2>
        </ButtonsWrapper>
      </Root>
    </ThemeProvider>
  )
}
