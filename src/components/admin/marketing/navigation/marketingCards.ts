import { routes } from 'common/routes'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import SendIcon from '@mui/icons-material/Send'

export const marketingCards = [
  {
    label: 'Изпращане на емайл за съгласие',
    icon: ThumbUpAltIcon,
    href: routes.admin.marketing.newsLetterConsent,
  },
  {
    label: 'Изпращане на маркетинг емайл',
    icon: SendIcon,
    href: routes.admin.marketing.newsLetterConsent,
  },
]
