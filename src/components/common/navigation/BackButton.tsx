import { Button, ButtonProps } from '@mui/material'
import Link from 'components/common/Link'
import { LinkProps } from 'next/link'
import { useTranslation } from 'react-i18next'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

type Props = ButtonProps & { href: LinkProps['href'] }
export default function BackButton({ href, ...props }: Props) {
  const { t } = useTranslation()
  return (
    <Link href={href}>
      <Button variant="text" startIcon={<ArrowBackIcon />} {...props}>
        {t('common:nav.go-back')}
      </Button>
    </Link>
  )
}
