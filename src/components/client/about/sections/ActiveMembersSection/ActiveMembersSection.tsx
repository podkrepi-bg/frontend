import { useTranslation } from 'next-i18next'

import { Grid, Typography } from '@mui/material'

import { data } from '../../helpers/activeMembersData'

import { ТeamMemberWrapper } from './ActiveMembersSection.styled'
import {
  AboutHeading,
  AboutWrapper,
  Avatar,
  LinkedInButton,
  LinkedInIcon,
  LinkedInText,
  TeamMemberName,
} from 'components/client/about/AboutPage.styled'

export default function ActiveMembersSection() {
  const { t } = useTranslation('about')

  return (
    <Grid component="section">
      <AboutHeading variant="h4">{t('about.active-team-members')}</AboutHeading>
      <AboutWrapper>
        {data.map((teamMember) => (
          <ТeamMemberWrapper key={teamMember.name}>
            <Avatar alt="Team member avatar" src={teamMember.img} width={200} height={200} />
            <TeamMemberName variant="subtitle1">{teamMember.name}</TeamMemberName>
            <Typography variant="body2">{teamMember.description}</Typography>
            <LinkedInButton href={teamMember.linkedInProfile} target="_blank">
              <LinkedInIcon color="action" fontSize="large" />
              <LinkedInText variant="subtitle1">{t('about.linkedIn')}</LinkedInText>
            </LinkedInButton>
          </ТeamMemberWrapper>
        ))}
      </AboutWrapper>
    </Grid>
  )
}
