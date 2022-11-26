import { useEffect } from 'react'

import { useTranslation } from 'next-i18next'

import { ThemeProvider } from '@mui/styles'
import { Grid, Typography, Button } from '@mui/material'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'

import theme from 'common/theme'

import { Root, ButtonsWrapper, Icon, ActionButton } from './Irregularity.styled'

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
      <Root container spacing={7}>
        <Icon item xs={12} color="#F44336">
          <ErrorOutlineOutlinedIcon />
        </Icon>
        <Grid item xs={12}>
          <Typography variant="h5">{t('steps.fail.title')}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">{t('steps.fail.subtitle')}</Typography>
        </Grid>
        <ButtonsWrapper container item>
          <Grid item>
            <Typography variant="body1">{t('steps.fail.label-campaigns')}</Typography>
            <ActionButton href={`/campaigns`} variant="outlined">
              {t('cta.campaigns')}
            </ActionButton>
          </Grid>
          <Grid item>
            <Typography variant="body1">{t('steps.fail.label-project')}</Typography>
            <ActionButton href={`/about-project`} variant="outlined">
              {t('cta.project')}
            </ActionButton>
          </Grid>
          <Grid item>
            <Typography variant="body1">{t('steps.fail.label-redo')}</Typography>
            <Button onClick={handleClick} variant="outlined">
              {t('cta.redo')}
            </Button>
          </Grid>
        </ButtonsWrapper>
      </Root>
    </ThemeProvider>
  )
}
