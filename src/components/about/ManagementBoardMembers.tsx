import { Grid, Theme, Typography, Button, Link } from '@mui/material'
import Heading from 'components/common/Heading'
import { useTranslation } from 'next-i18next'
import { data } from './helpers/teamData'
import Image from 'next/image'
import { createStyles, makeStyles } from '@mui/styles'
import { LinkedIn } from '@mui/icons-material'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    managemtenBoardMembersWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: theme.spacing(2),
    },
    teamMemberWrapper: {
      flexGrow: 1,
      flexBasis: 0,
      width: '10%',
    },
    avatar: {
      borderRadius: '50%',
      textAlign: 'center',
      width: '150px',
    },
    name: {
      fontWeight: 700,
      margin: theme.spacing(3, 0),
    },
    linkedIn: {
      display: 'block',
    },
  }),
)

export default function ManagementBoardMembers() {
  const { t } = useTranslation('about')
  const classes = useStyles()

  return (
    <Grid>
      <Heading variant="h4" component="h2" textAlign="center" mb={8}>
        {t('about.managementBoardMembers')}
      </Heading>
      <Grid className={classes.managemtenBoardMembersWrapper}>
        {data.map((teamMember) => (
          <Grid key={teamMember.img} className={classes.teamMemberWrapper}>
            <Image
              alt="teamMemberAvatar"
              src={teamMember.img}
              width="200px"
              height="200px"
              className={classes.avatar}
            />
            <Typography variant="subtitle1" className={classes.name}>
              {teamMember.name}
            </Typography>
            <Typography variant="subtitle1">{teamMember.description}</Typography>
            <Link href={teamMember.blogUrl}>{t('about.see-more')}</Link>
            <Link href={teamMember.linkedInProfile} className={classes.linkedIn}>
              <LinkedIn color="action" />
              {t('about.linkedIn')}
            </Link>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
