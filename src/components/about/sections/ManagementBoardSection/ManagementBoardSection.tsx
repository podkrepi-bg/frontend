import { useTranslation } from 'next-i18next'

import { Grid } from '@mui/material'

import { data } from '../../helpers/managementBoardData'

import {
  ManagementBoardHeading,
  ТeamMemberWrapper,
  LinkedInButton,
} from './ManagementBoardsection.styled'
import {
  AboutWrapper,
  Avatar,
  TeamMemberName,
  LinkedInIcon,
  LinkedInText,
} from 'components/about/AboutPage.styled'
import { ManagementBoardDescription } from './ManagementBoardDescription'

export default function ManagementBoardSection() {
  const { t } = useTranslation('about')

  return (
    <Grid component="section">
      <ManagementBoardHeading variant="h4">
        {t('about.management-board-members')}
      </ManagementBoardHeading>
      <AboutWrapper>
        {data.map((teamMember) => (
          <ТeamMemberWrapper key={teamMember.name}>
            <Avatar alt="Team member avatar" src={teamMember.img} width={200} height={200} />
            <TeamMemberName variant="subtitle1" height={50}>
              {teamMember.name}
            </TeamMemberName>
            <ManagementBoardDescription description={teamMember.description} />
            {teamMember.linkedInProfile ? (
              <LinkedInButton height={50} href={teamMember.linkedInProfile} target="_blank">
                <LinkedInIcon color="action" fontSize="large" />
                <LinkedInText variant="subtitle1">{t('about.linkedIn')}</LinkedInText>
              </LinkedInButton>
            ) : null}
          </ТeamMemberWrapper>
        ))}
      </AboutWrapper>
    </Grid>
  )
}
