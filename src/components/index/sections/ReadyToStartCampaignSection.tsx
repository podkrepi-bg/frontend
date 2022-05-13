import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'next-i18next'

import LinkButton from 'components/common/LinkButton'

import { routes } from 'common/routes'
import theme from 'common/theme'

const useStyles = makeStyles(() =>
  createStyles({
    text: {
      color: theme.palette.primary.dark,
      fontWeight: 500,
      textAlign: 'center',
    },
    button: {
      margin: 'auto',
      color: 'black',
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
      marginBottom: '1rem',
      paddingTop: '60px',
      paddingBottom: '60px',
      paddingLeft: '20vw',
      paddingRight: '20vw',
      backgroundColor: theme.palette.secondary.light,
    },
  }),
)

export default function ReadyToStartCampaignSection() {
  const classes = useStyles()
  const { t } = useTranslation()
  const downMd = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Box
      sx={{
        backgroundColor: '#F4F4F4',
        paddingY: theme.spacing(6),
        paddingX: theme.spacing(5),
      }}>
      <Grid container maxWidth="lg" margin="0 auto">
        <Grid marginBottom={theme.spacing(3)} item xs={12} md={6}>
          <Typography textAlign={downMd ? 'center' : 'left'} variant="h5">
            {t('index:ready-to-start-campaign-section.text')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} textAlign={downMd ? 'center' : 'right'}>
          <LinkButton
            href={routes.campaigns.create}
            variant="contained"
            color="primary"
            endIcon={<ChevronRightIcon />}>
            {t('index:ready-to-start-campaign-section.button')}
          </LinkButton>
        </Grid>
      </Grid>
    </Box>
  )
}
