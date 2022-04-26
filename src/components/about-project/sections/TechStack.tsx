import { useTranslation } from 'next-i18next'

import Heading from 'components/common/Heading'

import { Box, Grid, Theme, Typography } from '@mui/material'
import JoinLeftIcon from '@mui/icons-material/JoinLeft'
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices'
import SettingsIcon from '@mui/icons-material/Settings'
import CheckIcon from '@mui/icons-material/Check'

import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

const rows = [
  {
    icon: <JoinLeftIcon color="action" />,
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
    icon: <ImportantDevicesIcon color="action" />,
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
    icon: <SettingsIcon color="action" />,
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
      margin: '0 auto',
    },
    listItem: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1.5),
    },
    categoryWrapper: {
      marginBottom: theme.spacing(6),
      '&:nth-of-type(3)': {
        marginBottom: 0,
      },
    },
    categoryTitle: {
      fontWeight: 600,
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
        <Grid item container justifyContent="center">
          {rows.map(({ label, icon, items }, section: number) => (
            <Grid item xs={12} sm={8} key={section} className={classes.categoryWrapper}>
              <Grid container justifyContent="center" gap="5px">
                <Grid>{icon}</Grid>
                <Typography variant="subtitle1" className={classes.categoryTitle}>
                  {label}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} component="ul" className={classes.list}>
                {items.map((line: string, key: number) => (
                  <Typography key={key} variant="body2" component="li" className={classes.listItem}>
                    <CheckIcon />
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
