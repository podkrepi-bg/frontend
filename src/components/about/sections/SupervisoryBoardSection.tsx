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
      display: 'flex',
      gap: theme.spacing(3),
    },
    supervisoryBoardHeading: {
      fontWeight: 500,
      margin: theme.spacing(8, 0),
    },
    teamMemberWrapper: {
      width: '100%',
      backgroundColor: theme.palette.secondary.light,
      padding: theme.spacing(4),
    },
    avatar: {
      borderRadius: '50%',
      textAlign: 'center',
      width: '150px',
      objectFit: 'cover',
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
            <Image
              alt="Team member avatar"
              src={teamMember.img}
              width="200px"
              height="200px"
              className={classes.avatar}
            />
            <Typography variant="subtitle1">{teamMember.name}</Typography>
            <Link
              href={teamMember.linkedInProfile}
              target="_blank"
              className={classes.linkedInButton}>
              <LinkedIn color="action" fontSize="large" className={classes.LinkedInIcon} />
              <Typography variant="subtitle1" className={classes.linkedInText}>
                {t('about.linkedIn')}
              </Typography>
            </Link>
            <Typography variant="body2">{teamMember.description}</Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
