import { Grid, Typography, Button } from '@mui/material'
import FailIcon from 'common/icons/Fail'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { useTranslation } from 'next-i18next'

export default function Fail() {
  const { t } = useTranslation('one-time-donation')

  return (
    <Grid>
      <Grid
        container
        justifyContent="center"
        sx={{
          width: 450,
          height: 450,
          margin: '0 auto',
        }}>
        <FailIcon />
      </Grid>
      <Grid container rowSpacing={2} justifyContent={'center'} textAlign="center">
        <Grid item xs={12}>
          <Typography variant="h4" fontSize={14}>
            {t('fail.title')}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: '38px',
              color: '#909090',
              margin: 2,
            },
          }}>
          <FacebookOutlinedIcon />
          <InstagramIcon />
          <LinkedInIcon />
        </Grid>
      </Grid>
      <Grid container rowSpacing={3} justifyContent="center">
        <Grid textAlign={'center'} item xs={12} md={6}>
          <Button variant="contained" color="primary">
            {t('fail.btn-again')}
          </Button>
        </Grid>
        <Grid textAlign={'center'} item xs={12} md={6}>
          <Button variant="contained" color="primary">
            {t('fail.connect')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
