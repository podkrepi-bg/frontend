import { ContentType } from './content-type'
import ContentTypography from './ContentTypography'

export const MONTHLY_DONATION_QUESTIONS: ContentType[] = [
  {
    visible: true,
    header: 'Мога ли да направя месечно дарение към дадена кампания?',
    content: (
      <ContentTypography>
        Да, има такава възможност през вашата банка или като регулярно плащане през дебитна/кредитна
        карта конфигурирано в Stripe.
      </ContentTypography>
    ),
  },
]
