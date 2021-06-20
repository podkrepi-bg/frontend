import { useTranslation } from 'next-i18next'
import { Box, createStyles, Grid, makeStyles, Theme } from '@material-ui/core'

import Typography from 'components/common/Typography'

const rows = [
  {
    label: 'DevOps',
    items: [
      'about-project:tech-stack.docker-kubernetes',
      'about-project:tech-stack.ci-cd-pipeline',
      'CockroachDB cluster + Flyway migrations',
    ],
  },
  {
    label: 'Frontend',
    items: ['Next.js', 'React / TypeScript', 'MaterialUI / SCSS', 'Formik / MobX'],
  },
  {
    label: 'Backend',
    items: [
      'about-project:tech-stack.graphql-gateway-and-go',
      'about-project:tech-stack.grpc-protobuf',
      'about-project:tech-stack.dot-net',
    ],
  },
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(7),
    },
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
      <Typography
        id="tech-stack"
        variant="h3"
        component="h2"
        align="center"
        className={classes.heading}
        linkable>
        {t('about-project:tech-stack.title')}
      </Typography>
      <Grid container direction="column" component="section">
        <Grid item container justify="center" spacing={2}>
          {rows.map(({ label, items }, section: number) => (
            <Grid item xs={12} sm={8} key={section}>
              <Typography variant="subtitle1">{label}</Typography>
              <Grid item xs={12} component="ul" className={classes.list}>
                {items.map((line: string, key: number) => (
                  <Typography key={key} variant="body2" component="li">
                    {t(line)}
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
