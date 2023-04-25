import { Heading } from './campaigns.styled'
import { styled } from '@mui/system'
import theme, { lato } from 'common/theme'
import { useTranslation } from 'next-i18next'

import ExternalLink from 'components/common/ExternalLink'

// TODO: Ask for the URLs

const StepHeading = styled('strong')(() => ({
  fontWeight: 700,
  fontFamily: lato.style.fontFamily,
  fontSize: theme.typography.pxToRem(16),
}))

const Paragraph = styled('p')(() => ({
  fontFamily: lato.style.fontFamily,
  fontSize: theme.typography.pxToRem(14),
  margin: 0,

  '& a': {
    fontStyle: 'normal',
    textDecoration: 'underline',
  },
}))

const Note = styled('p')(() => ({
  fontFamily: 'Raleway, sans-serif',
  fontStyle: 'italic',
  fontSize: theme.typography.pxToRem(14),
  lineHeight: theme.typography.pxToRem(24),
  letterSpacing: '-0.009em',

  '& a': {
    fontStyle: 'normal',
    textDecoration: 'underline',
  },
}))

export default function CreateCampaignSteps() {
  const { t } = useTranslation('campaigns')

  return (
    <>
      <Heading>{t('create-campaign')}</Heading>

      <Paragraph>
        <StepHeading>
          {t('steps.step1')} &quot;{t('steps.step1-type')}&quot;
        </StepHeading>
        - {t('steps.step1-description')}
      </Paragraph>

      <Paragraph>
        <StepHeading>
          {t('steps.step2')} &quot;{t('steps.step2-type')}&quot;
        </StepHeading>{' '}
        -{t('steps.step2-description')}
      </Paragraph>

      <Paragraph>
        <StepHeading>
          {t('steps.step3')} &quot;{t('steps.step3-type')}&quot;
        </StepHeading>{' '}
        -{t('steps.step3-description')}
      </Paragraph>

      <Paragraph>
        <StepHeading>
          {t('steps.step4')} &quot;{t('steps.step4-type')}&quot;
        </StepHeading>{' '}
        -{t('steps.step4-description-part1')}
        &nbsp;<ExternalLink> {t('steps.step4-description-link')}</ExternalLink>&nbsp;
        {t('steps.step4-description-part2')}
      </Paragraph>

      <Paragraph>
        <StepHeading>
          {t('steps.step5')} &quot;{t('steps.step5-type')}&quot;
        </StepHeading>{' '}
        -{t('steps.step5-description')}
      </Paragraph>

      <Note>
        {t('note')} <ExternalLink style={{ textTransform: 'uppercase' }}>{t('here')}</ExternalLink>.
      </Note>
    </>
  )
}
