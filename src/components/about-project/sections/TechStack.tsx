import { useTranslation } from 'next-i18next'
import { Box, Grid, Theme, Typography } from '@mui/material'

import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

import Heading from 'components/common/Heading'

const rows = [
  {
    label: 'DevOps',
    items: [
      'about-project:tech-stack.docker',
      'about-project:tech-stack.kubernetes',
      'about-project:tech-stack.ci-cd-pipeline',
      'Rancher',
      'Keycloak Authentication',
    ],
  },
  {
    label: 'Frontend',
    items: [
      'TypeScript',
      'Next.js',
      'React',
      'MaterialUI',
      'SCSS',
      'Formik',
      'MobX',
      'React Query',
      'Yup',
      'Sentry',
    ],
  },
  {
    label: 'Backend',
    items: ['TypeScript', 'Nest.js', 'PostgreSQL', 'Prisma', 'Jest', 'Sentry'],
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
      <Heading
        id="tech-stack"
        variant="h3"
        component="h2"
        align="center"
        className={classes.heading}
        linkable>
        {t('about-project:tech-stack.title')}
      </Heading>
      <Grid container direction="column" component="section">
        <Grid item container justifyContent="center" spacing={2}>
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
