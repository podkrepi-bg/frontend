import { useTranslation } from 'next-i18next'

import { Grid, Theme, Typography, Link } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { LinkedIn } from '@mui/icons-material'

import { data } from '../../helpers/supervisoryBoardData'
import { AboutHeading, Avatar, Description, LinkedInText } from 'components/about/AboutPage.styled'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    supervisoryBoardMembersWrapper: {
      flexGrow: 1,
      width: '100%',
      textAlign: 'center',
      flexWrap: 'wrap',

      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        gap: theme.spacing(3),
      },
    },
    teamMemberWrapper: {
      width: '100%',
      backgroundColor: theme.palette.secondary.light,
      padding: theme.spacing(4),
      marginBottom: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        width: '10%',
        flex: '1 0 40%',
        marginBottom: theme.spacing(0),
      },
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(0),
        flex: '1 0 30%',
      },
    },
    infoWrapper: {
      dispay: 'block',
      marginBottom: theme.spacing(4),
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        justifyContent: 'space-around',
        gap: theme.spacing(2),
        alignItems: 'center',
      },
    },
    name: {
      fontWeight: 700,
      marginTop: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        marginTop: 0,
      },
    },
    imageLinkedInWrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
    linkedInButton: {
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(3),
      alignSelf: 'center',
      [theme.breakpoints.up('md')]: {
        alignSelf: 'start',
      },
      '&:hover': {
        '&>svg, &>h6': {
          textDecoration: 'underline',
          color: theme.palette.primary.main,
        },
      },
    },
    LinkedInIcon: {
      marginLeft: '-4px',
    },
  }),
)

export default function SupervisoryBoardSection() {
  const { t } = useTranslation('about')
  const classes = useStyles()

  return (
    <Grid component="section">
      <AboutHeading variant="h4">{t('about.supervisory-board-members')}</AboutHeading>
      <Grid className={classes.supervisoryBoardMembersWrapper}>
        {data.map((teamMember) => (
          <Grid key={teamMember.name} className={classes.teamMemberWrapper}>
            <Grid className={classes.infoWrapper}>
              <Avatar alt="Team member avatar" src={teamMember.img} width="200px" height="200px" />
              <Grid className={classes.imageLinkedInWrapper}>
                <Typography variant="subtitle1" className={classes.name}>
                  {teamMember.name}
                </Typography>
                <Link
                  href={teamMember.linkedInProfile}
                  target="_blank"
                  className={classes.linkedInButton}>
                  <LinkedIn color="action" fontSize="large" className={classes.LinkedInIcon} />
                  <LinkedInText variant="subtitle1">{t('about.linkedIn')}</LinkedInText>
                </Link>
              </Grid>
            </Grid>
            <Description variant="body2">{teamMember.description}</Description>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
