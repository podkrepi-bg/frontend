import { Box, Typography } from '@mui/material'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

type Breadcrumb = {
  label: string
  url: string
}

type Props = {
  crumb: Breadcrumb[]
}

export default function BreadcrumbWrapper({ crumb }: Props) {
  const { t } = useTranslation('breadcrumb')
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {crumb.map((crumbItem: Breadcrumb, index: number) => {
        const isLast = index === crumb.length - 1
        return (
          <Box key={index}>
            {!isLast ? (
              <Link href={crumbItem.url} passHref>
                <Typography variant="body1" color={'text.secondary'} fontSize={14}>
                  {t(`${crumbItem.label}`)}
                </Typography>
              </Link>
            ) : (
              <Typography color={'text.primary'} fontSize={14}>
                {t(`${crumbItem.label}`)}
              </Typography>
            )}
          </Box>
        )
      })}
    </Breadcrumbs>
  )
}
