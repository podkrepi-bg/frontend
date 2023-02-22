import { useTranslation } from 'next-i18next'

import { Grid } from '@mui/material'

import { data } from '../../helpers/associationMembersData'

import { TeamMemberWrapper } from './AssociationMembersSection.styled'
import {
  AboutHeading,
  AboutWrapper,
  Avatar,
  LinkedInButton,
  LinkedInIcon,
  LinkedInText,
  TeamMemberName,
} from 'components/client/about/AboutPage.styled'

export default function AssociationMembersSection() {
  const { t } = useTranslation('about')

  return (
    <Grid component="section">
      <AboutHeading variant="h4">{t('about.association-members')}</AboutHeading>
      <AboutWrapper>
        {data.map((teamMember) => (
          <TeamMemberWrapper key={teamMember.name}>
            <Avatar alt="Team member avatar" src={teamMember.img} width={200} height={200} />
            <TeamMemberName variant="subtitle1">{teamMember.name}</TeamMemberName>
            {teamMember.linkedInProfile ? (
              <LinkedInButton href={teamMember.linkedInProfile} target="_blank">
                <LinkedInIcon color="action" fontSize="large" />
                <LinkedInText variant="subtitle1">{t('about.linkedIn')}</LinkedInText>
              </LinkedInButton>
            ) : null}
          </TeamMemberWrapper>
        ))}
      </AboutWrapper>
    </Grid>
  )
}
