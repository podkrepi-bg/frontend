import { useTranslation } from 'next-i18next'

import { ThemeProvider } from '@mui/styles'
import { createStyles, makeStyles } from '@mui/styles'
import { Grid, Typography, Button } from '@mui/material'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'

import theme from 'common/theme'

import LinkButton from 'components/common/LinkButton'

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      backgroundColor: '#0098E3',
      border: '1px solid #909090',
      padding: '10px 30px',
      marginBottom: '5%',
      borderRadius: '60px',
      width: 'auto',
      color: '#FFFFFF',
      fontSize: '16px',
      '&:hover': { backgroundColor: '#62C4FB', color: '#000000' },
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

type Props = {
  setFail: (fail: boolean) => void
  setActiveStep: (step: number) => void
}

export default function Fail({ setFail, setActiveStep }: Props) {
  const classes = useStyles()
  const { t } = useTranslation('irregularity-report')

  if (window) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleClick = () => {
    setFail(false)
    setActiveStep(0)
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={7} className={classes.container}>
        <Grid item xs={12} className={classes.gridIcon}>
          <ErrorOutlineOutlinedIcon sx={{ transform: 'scale(5.0)', color: '#F44336' }} />
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <Typography variant="h5">{t('steps.fail.title')}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <Typography variant="h6">{t('steps.fail.subtitle')}</Typography>
        </Grid>
        <Grid container item className={classes.containerButtons}>
          <Grid item>
            <Typography variant="body1">{t('steps.fail.label-campaigns')}</Typography>
            <LinkButton href={`/campaigns`} variant="outlined" className={classes.button}>
              {t('cta.campaigns')}
            </LinkButton>
          </Grid>
          <Grid item>
            <Typography variant="body1">{t('steps.fail.label-project')}</Typography>
            <LinkButton href={`/about-project`} variant="outlined" className={classes.button}>
              {t('cta.project')}
            </LinkButton>
          </Grid>
          <Grid item>
            <Typography variant="body1">{t('steps.fail.label-redo')}</Typography>
            <Button onClick={handleClick} variant="outlined" className={classes.button}>
              {t('cta.redo')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
