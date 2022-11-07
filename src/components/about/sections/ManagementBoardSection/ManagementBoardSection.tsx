import { useTranslation } from 'next-i18next'

import { Grid } from '@mui/material'

import { data } from '../../helpers/managementBoardData'

import {
  ManagementBoardHeading,
  ManagemtenBoardMembersWrapper,
  ТeamMemberWrapper,
} from './ManagementBoardsection.styled'
import {
  Avatar,
  Description,
  TeamMemberName,
  LinkedInIcon,
  LinkedInText,
  LinkedInButton,
} from 'components/about/AboutPage.styled'

export default function ManagementBoardSection() {
  const { t } = useTranslation('about')

  return (
    <Grid component="section">
      <ManagementBoardHeading variant="h4">
        {t('about.management-board-members')}
      </ManagementBoardHeading>
      <ManagemtenBoardMembersWrapper>
        {data.map((teamMember) => (
          <ТeamMemberWrapper key={teamMember.name}>
            <Avatar alt="Team member avatar" src={teamMember.img} width="200px" height="200px" />
            <TeamMemberName variant="subtitle1">{teamMember.name}</TeamMemberName>
            <Description variant="body2">{teamMember.description}</Description>
            {teamMember.linkedInProfile ? (
              <LinkedInButton
                href={teamMember.linkedInProfile}
                target="_blank"
                style={{ float: 'left' }}>
                <LinkedInIcon color="action" fontSize="large" />
                <LinkedInText variant="subtitle1">{t('about.linkedIn')}</LinkedInText>
              </LinkedInButton>
            ) : null}
          </ТeamMemberWrapper>
        ))}
      </ManagemtenBoardMembersWrapper>
    </Grid>
  )
}
