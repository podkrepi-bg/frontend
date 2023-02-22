import React from 'react'

import { useTranslation } from 'next-i18next'

import CheckIcon from '@mui/icons-material/Check'
import { Grid, Typography } from '@mui/material'

import ExternalLink from 'components/common/ExternalLink'
import {
  leftColumnLabels,
  rightColumnLabels,
} from 'components/client/about-project/helpers/whatIsDoneData'

import ActivityIcon from '../../icons/ActivityIcon'
import MeetingsIcon from '../../icons/MeetingsIcon'
import VolunteersIcon from '../../icons/VolunteersIcon'
import InvestedHoursIcon from '../../icons/InvestedHoursIcon'

import { Heading } from 'components/client/about-project/AboutProject.styled'
import { Checked, IconsWrapper, List, Root } from './WhatIsDone.styled'

type CheckedLineProps = {
  label: string | React.ReactNode
  href?: string
}

const CheckedLine = ({ label, href }: CheckedLineProps) => {
  const { t } = useTranslation('about-project')

  return (
    <Checked item>
      <CheckIcon />
      <Typography variant="body2" component="span">
        {typeof label === 'string' ? t(label) : label}{' '}
        {href && (
          <ExternalLink variant="body2" href={href}>
            ({t('link').toLocaleLowerCase()})
          </ExternalLink>
        )}
      </Typography>
    </Checked>
  )
}

export default function WhatIsDone() {
  const { t } = useTranslation('about-project')

  return (
    <Root>
      <Heading variant="h3">{t('whatIsDoneTitle')}</Heading>
      <IconsWrapper item container>
        <Grid item xs={12} sm={4}>
          <ActivityIcon Icon={VolunteersIcon} count="17" description={t('members')} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ActivityIcon Icon={MeetingsIcon} count="100+" description={t('meetingsIcon')} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ActivityIcon
            Icon={InvestedHoursIcon}
            count="1000+"
            description={t('investedHoursIcon')}
          />
        </Grid>
      </IconsWrapper>
      <List item container>
        <Grid item xs={12} sm={6}>
          {leftColumnLabels.map((props, key) => (
            <CheckedLine key={key} {...props} />
          ))}
        </Grid>
        <Grid item xs={12} sm={6}>
          {rightColumnLabels.map((props, key) => (
            <CheckedLine key={key} {...props} />
          ))}
        </Grid>
      </List>
    </Root>
  )
}
