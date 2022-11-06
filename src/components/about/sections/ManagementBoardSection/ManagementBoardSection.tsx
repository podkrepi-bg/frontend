import { useTranslation } from 'next-i18next'

import { Grid, Theme, Typography, Link } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { LinkedIn } from '@mui/icons-material'

import { data } from '../../helpers/managementBoardData'

import {
  ManagementBoardHeading,
  ManagemtenBoardMembersWrapper,
  ТeamMemberWrapper,
} from './ManagementBoardsection.styled'
import { Avatar } from 'components/about/AboutPage.styled'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    description: {
      textAlign: 'initial',
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
      <ManagementBoardHeading variant="h4">
        {t('about.management-board-members')}
      </ManagementBoardHeading>
      <ManagemtenBoardMembersWrapper>
        {data.map((teamMember) => (
          <ТeamMemberWrapper key={teamMember.name}>
            <Avatar alt="Team member avatar" src={teamMember.img} width="200px" height="200px" />
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
                <LinkedIn color="action" fontSize="large" className={classes.LinkedInIcon} />
                <Typography variant="subtitle1" className={classes.linkedInText}>
                  {t('about.linkedIn')}
                </Typography>
              </Link>
            ) : null}
          </ТeamMemberWrapper>
        ))}
      </ManagemtenBoardMembersWrapper>
    </Grid>
  )
}
