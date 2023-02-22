import { useTranslation } from 'next-i18next'

import { Grid } from '@mui/material'

import { data } from '../../helpers/supervisoryBoardData'

import {
  AboutHeading,
  Avatar,
  Description,
  LinkedInButton,
  LinkedInIcon,
  LinkedInText,
} from 'components/client/about/AboutPage.styled'
import {
  SupervisoryBoardMembersWrapper,
  TeamMemberWrapper,
  Wrapper,
  TeamMemberName,
  NameLinkedInWrapper,
} from './SupervisoryBoardSection.styled'

export default function SupervisoryBoardSection() {
  const { t } = useTranslation('about')

  return (
    <Grid component="section">
      <AboutHeading variant="h4">{t('about.supervisory-board-members')}</AboutHeading>
      <SupervisoryBoardMembersWrapper>
        {data.map((teamMember) => (
          <TeamMemberWrapper key={teamMember.name}>
            <Wrapper>
              <Avatar alt="Team member avatar" src={teamMember.img} width={200} height={200} />
              <NameLinkedInWrapper>
                <TeamMemberName variant="subtitle1">{teamMember.name}</TeamMemberName>
                <LinkedInButton
                  href={teamMember.linkedInProfile}
                  target="_blank"
                  style={{ float: 'left' }}>
                  <LinkedInIcon color="action" fontSize="large" />
                  <LinkedInText variant="subtitle1">{t('about.linkedIn')}</LinkedInText>
                </LinkedInButton>
              </NameLinkedInWrapper>
            </Wrapper>
            <Description variant="body2">{teamMember.description}</Description>
          </TeamMemberWrapper>
        ))}
      </SupervisoryBoardMembersWrapper>
    </Grid>
  )
}
