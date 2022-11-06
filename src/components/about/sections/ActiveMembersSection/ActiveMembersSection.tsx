import { useTranslation } from 'next-i18next'

import { Grid, Theme, Typography, Link } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { LinkedIn } from '@mui/icons-material'

import { data } from '../../helpers/activeMembersData'

import { ActiveMembersWrapper, Avatar, ТeamMemberWrapper } from './ActiveMembersSection.styled'
import { AboutHeading } from 'components/about/AboutPage.styled'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    name: {
      fontWeight: 700,
      margin: theme.spacing(3, 0),
    },
    linkedInButton: {
      display: 'inline-flex',
      alignItems: 'center',
      textAlign: 'center',
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

export default function ActiveMembersSection() {
  const { t } = useTranslation('about')
  const classes = useStyles()

  return (
    <Grid component="section">
      <AboutHeading variant="h4">{t('about.active-team-members')}</AboutHeading>
      <ActiveMembersWrapper>
        {data.map((teamMember) => (
          <ТeamMemberWrapper key={teamMember.name}>
            <Avatar alt="Team member avatar" src={teamMember.img} width="200px" height="200px" />
            <Typography variant="subtitle1" className={classes.name}>
              {teamMember.name}
            </Typography>
            <Typography variant="body2">{teamMember.description}</Typography>
            <Link
              href={teamMember.linkedInProfile}
              target="_blank"
              className={classes.linkedInButton}>
              <LinkedIn color="action" fontSize="large" className={classes.LinkedInIcon} />
              <Typography variant="subtitle1" className={classes.linkedInText}>
                {t('about.linkedIn')}
              </Typography>
            </Link>
          </ТeamMemberWrapper>
        ))}
      </ActiveMembersWrapper>
    </Grid>
  )
}
