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
  TeamMemberDescription,
} from 'components/about/AboutPage.styled'
import ExpandableText from 'components/common/ExpandableText'

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
            <Avatar alt="Team member avatar" src={teamMember.img} width="200px" height="200px" />
            <TeamMemberName variant="subtitle1" height={50}>
              {teamMember.name}
            </TeamMemberName>
            <TeamMemberDescription variant="body2" height="auto">
              <ExpandableText text={teamMember.description} rowsLimit={18} />
            </TeamMemberDescription>
            {teamMember.linkedInProfile ? (
              <LinkedInButton href={teamMember.linkedInProfile} target="_blank">
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
