import { Grid, Theme, Typography } from '@mui/material'
import Heading from 'components/common/Heading'
import { useTranslation } from 'next-i18next'
import { data } from './helpers/teamData'
import Image from 'next/image'
import { createStyles, makeStyles } from '@mui/styles'
import { LinkedIn } from '@mui/icons-material'
import LinkButton from 'components/common/LinkButton'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    managemtenBoardMembersWrapper: {
      display: 'flex',
    },
    teamMemberWrapper: {
      background: 'transparent',
      maxWidth: '20%',
    },
    teamMemberAvatar: {
      borderRadius: '50%',
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
              alt="avatar"
              src={teamMember.img}
              width={150}
              height={150}
              className={classes.teamMemberAvatar}
            />
            <Typography variant="subtitle1">{teamMember.name}</Typography>
            <Typography variant="subtitle1">{teamMember.description}</Typography>
            <LinkButton href={teamMember.linkedInProfile} startIcon={<LinkedIn color="action" />}>
              {t('about.linkedIn')}
            </LinkButton>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
