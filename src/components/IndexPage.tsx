import { Grid, Typography } from '@material-ui/core'
import Layout from 'components/layout/Layout'
import { useTranslation } from 'react-i18next'

const points = [
  'voluntary',
  'proactive',
  'transparent',
  'respect',
  'expertise',
  'privacy',
  'awareness',
]

export default function IndexPage() {
  const { t } = useTranslation()
  return (
    <Layout title="Podkrepi.bg">
      <Grid container direction="column" justify="center" alignItems="stretch">
        {points.map((point, index) => (
          <Grid item key={index}>
            <Typography variant="h4" component="h2" paragraph>
              {t(`values.${point}.heading`)}
            </Typography>
            <Typography variant="subtitle2" paragraph>
              {t(`values.${point}.content`)}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}
