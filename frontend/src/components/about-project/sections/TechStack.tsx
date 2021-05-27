import { useTranslation } from 'next-i18next'
import { Box, createStyles, Grid, makeStyles, Typography } from '@material-ui/core'

const rows = [
  {
    label: 'DevOps',
    items: [
      'Локален Docker Compose stack и план за Kubernetes в продуктова среда',
      'CI/CD pipeline чрез Github Actions',
      'Database: CockroachDB cluster + Flyway migrations',
    ],
  },
  {
    label: 'Frontend',
    items: ['Next.js', 'React / TypeScript', 'MaterialUI / SCSS', 'Formik / MobX'],
  },
  {
    label: 'Backend',
    items: [
      'GraphQL Gateway using GoLang/GoFiber',
      'GRPC/ProtoBuf за комуникация между microservices',
      'Campaigns Мicroservice using C#/.Net',
    ],
  },
]

const useStyles = makeStyles(() =>
  createStyles({
    list: {
      listStyle: 'disc',
      paddingLeft: '2rem',
    },
  }),
)

export default function TechStack() {
  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <Box my={'5rem'}>
      <Typography variant="h4" component="h2" align="center">
        {t('about-project:tech-stack.title')}
      </Typography>
      <Grid container direction="column" component="section">
        <Grid item container justify="center" spacing={2}>
          {rows.map(({ label, items }, section: number) => (
            <Grid item xs={8} key={section}>
              <Typography variant="subtitle1">{label}</Typography>
              <Grid item xs={12} component="ul" className={classes.list}>
                {items.map((line: string, key: number) => (
                  <Typography key={key} variant="body2" component="li">
                    {line}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}
