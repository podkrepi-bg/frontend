import ExternalLink from 'components/common/ExternalLink'
import { ContentType } from './content-type'
import ContentTypography from './ContentTypography'

export const PARTNERSHIPS_QUESTIONS: ContentType[] = [
  {
    visible: true,
    header: 'Партнирате ли си с други организации?',
    content: (
      <ContentTypography>
        Да, щастливи и благодарни сме за доверието и партньорството с други организации. Пълният
        списък с партньорите на Подкрепи.бг можете да откриете
        <ExternalLink
          variant="subtitle1"
          href="https://docs.google.com/spreadsheets/d/1TThb0VmaDJpM4mWV3BFLXquWQoL7AZ34o-ygANGU_UY/edit#gid=0">
          {' тук. '}
        </ExternalLink>
      </ContentTypography>
    ),
  },
  {
    visible: true,
    header: 'Как мога да стана партньор на Подкрепи.бг?',
    content: (
      <ContentTypography>
        За идеи и запитвания за партньорство можете да пишете на{' '}
        <ExternalLink variant="subtitle1" href="info@podkrepi.bg">
          {'info@podkrepi.bg'}
        </ExternalLink>
      </ContentTypography>
    ),
  },
]
