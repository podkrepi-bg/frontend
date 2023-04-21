import { Heading } from './campaigns.styled.tsx'
import { styled } from '@mui/system'
import theme, { lato } from 'common/theme'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

// TODO: Ask if Lato is still а valid font
// TODO: Translate in english the steps
// TODO: Ask for "CLICK HERE" link in Note component

const StepHeading = styled('strong')(() => ({
  fontWeight: 700,
  fontFamily: lato.style.fontFamily,
  fontSize: theme.typography.pxToRem(16),
}))

const Paragraph = styled('p')(() => ({
  fontFamily: lato.style.fontFamily,
  fontSize: theme.typography.pxToRem(14),
  margin: 0,
}))

const Note = styled('p')(() => ({
  fontFamily: 'Raleway, sans-serif',
  fontStyle: 'italic',
  fontSize: theme.typography.pxToRem(14),
  lineHeight: theme.typography.pxToRem(24),
  letterSpacing: '-0.009em',
}))

const NoteLink = styled('a')(() => ({
  color: 'red',
}))

export default function CreateCampaignSteps() {
  const { t } = useTranslation('campaigns')

  return (
    <>
      <Heading>Създайте кампания</Heading>

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
        -{t('steps.step4-description')}
      </Paragraph>

      <Paragraph>
        <StepHeading>
          {t('steps.step5')} &quot;{t('steps.step5-type')}&quot;
        </StepHeading>{' '}
        -{t('steps.step5-description')}
      </Paragraph>

      <Note>
        {t('note')} <NoteLink>ТУК</NoteLink>.
      </Note>
    </>
  )
}
