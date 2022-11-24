import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'

import { ThemeProvider } from '@mui/styles'
import { Grid, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'

import theme from 'common/theme'

import LinkButton from 'components/common/LinkButton'
import { routes } from 'common/routes'

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      backgroundColor: '#0098E3',
      border: '1px solid #909090',
      padding: '10px 40px',
      marginBottom: '5%',
      borderRadius: '60px',
      width: 'auto',
      color: '#FFFFFF',
      fontSize: '18px',
      '&:hover': { backgroundColor: '#62C4FB', color: '#000000' },
      [theme.breakpoints.down('sm')]: { fontSize: '12px' },
    },
    container: {
      marginTop: '20%',
      justifyContent: 'center',
    },
    gridIcon: {
      marginBottom: '5%',
      textAlign: 'center',
    },
    gridItem: {
      textAlign: 'center',
    },
    containerButtons: {
      justifyContent: 'space-evenly',
    },
  }),
)
export default function Success() {
  const classes = useStyles()
  const { t } = useTranslation('irregularity')

  useEffect(() => {
    if (window) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={7} className={classes.container}>
        <Grid item xs={12} className={classes.gridIcon}>
          <CheckCircleOutlinedIcon sx={{ transform: 'scale(5.0)', color: '#4BD12A' }} />
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <Typography variant="h5">{t('steps.success.title')}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <Typography variant="h6">{t('steps.success.subtitle')}</Typography>
        </Grid>
        <Grid container item className={classes.containerButtons}>
          <Grid>
            <Typography variant="body1">{t('steps.success.label-campaigns')}</Typography>
            <LinkButton href={routes.campaigns.index} variant="outlined" className={classes.button}>
              {t('cta.campaigns')}
            </LinkButton>
          </Grid>
          <Grid>
            <Typography variant="body1">{t('steps.success.label-project')}</Typography>
            <LinkButton href={routes.aboutProject} variant="outlined" className={classes.button}>
              {t('cta.project')}
            </LinkButton>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
