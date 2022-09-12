import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { Grid, Theme, Typography, Link } from '@mui/material'
import Heading from 'components/common/Heading'
import { createStyles, makeStyles } from '@mui/styles'
import { LinkedIn } from '@mui/icons-material'
import { data } from '../helpers/managementBoardData'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    managemtenBoardMembersWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: theme.spacing(3),
      flexWrap: 'wrap',
    },
    managementBoardHeading: {
      fontWeight: 500,
      marginBottom: theme.spacing(8),
    },
    teamMemberWrapper: {
      flexGrow: 1,
      width: '100%',
      textAlign: 'center',
      marginBottom: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        width: '10%',
        flex: '1 0 40%',
        marginBottom: theme.spacing(0),
      },
      [theme.breakpoints.up('md')]: {
        flex: '1 0 30%',
      },
      [theme.breakpoints.up('lg')]: {
        flex: '1 0 10%',
      },
    },
    description: {
      textAlign: 'initial',
    },
    avatar: {
      borderRadius: '50%',
      textAlign: 'center',
      width: '150px',
      objectFit: 'cover',
    },
    name: {
      fontWeight: 700,
      margin: theme.spacing(3, 0),
    },
    linkedInButton: {
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(3),
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
    },
  }),
)

export default function ManagementBoardSection() {
  const { t } = useTranslation('about')
  const classes = useStyles()

  return (
    <Grid component="section">
      <Heading
        variant="h4"
        component="h2"
        textAlign="center"
        className={classes.managementBoardHeading}>
        {t('about.management-board-members')}
      </Heading>
      <Grid className={classes.managemtenBoardMembersWrapper}>
        {data.map((teamMember) => (
          <Grid key={teamMember.img} className={classes.teamMemberWrapper}>
            <Image
              alt="Team member avatar"
              src={teamMember.img}
              width="200px"
              height="200px"
              className={classes.avatar}
            />
            <Typography variant="subtitle1" className={classes.name}>
              {teamMember.name}
            </Typography>
            <Typography variant="body2" className={classes.description}>
              {teamMember.description}
            </Typography>
            {teamMember.linkedInProfile ? (
              <Link
                href={teamMember.linkedInProfile}
                target="_blank"
                className={classes.linkedInButton}>
                <LinkedIn color="primary" fontSize="large" className={classes.LinkedInIcon} />
                <Typography variant="subtitle1" className={classes.linkedInText}>
                  {t('about.linkedIn')}
                </Typography>
              </Link>
            ) : null}
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
