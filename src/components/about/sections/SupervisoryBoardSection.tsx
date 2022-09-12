import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { Grid, Theme, Typography, Link } from '@mui/material'
import Heading from 'components/common/Heading'
import { createStyles, makeStyles } from '@mui/styles'
import { LinkedIn } from '@mui/icons-material'
import { data } from '../helpers/supervisoryBoardData'

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
    supervisoryBoardHeading: {
      fontWeight: 500,
      margin: theme.spacing(8, 0),
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
    avatar: {
      borderRadius: '50%',
      textAlign: 'center',
      width: '150px',
      objectFit: 'cover',
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
    linkedInText: {
      marginLeft: theme.spacing(1),
      color: theme.palette.common.black,
      fontWeight: 500,
    },
    description: {
      textAlign: 'initial',
    },
  }),
)

export default function SupervisoryBoardSection() {
  const { t } = useTranslation('about')
  const classes = useStyles()

  return (
    <Grid component="section">
      <Heading
        variant="h4"
        component="h2"
        textAlign="center"
        className={classes.supervisoryBoardHeading}>
        {t('about.supervisory-board-members')}
      </Heading>
      <Grid className={classes.supervisoryBoardMembersWrapper}>
        {data.map((teamMember) => (
          <Grid key={teamMember.img} className={classes.teamMemberWrapper}>
            <Grid className={classes.infoWrapper}>
              <Image
                alt="Team member avatar"
                src={teamMember.img}
                width="200px"
                height="200px"
                className={classes.avatar}
              />
              <Grid className={classes.imageLinkedInWrapper}>
                <Typography variant="subtitle1" className={classes.name}>
                  {teamMember.name}
                </Typography>
                <Link
                  href={teamMember.linkedInProfile}
                  target="_blank"
                  className={classes.linkedInButton}>
                  <LinkedIn color="primary" fontSize="large" className={classes.LinkedInIcon} />
                  <Typography variant="subtitle1" className={classes.linkedInText}>
                    {t('about.linkedIn')}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
            <Typography variant="body2" className={classes.description}>
              {teamMember.description}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
