import { useTranslation } from 'next-i18next'
import Image from 'next/image'

import { Box } from '@mui/material'

import { articles } from 'components/admin/partners/helpers/mediaAboutUsData'
import Link from 'components/common/Link'

import { Heading } from '../../IndexPage.styled'
import { Root } from './MediaSection.styled'
import { CarouselWrapper } from '../CompletedCampaignsSection/CompletedCampaignsSection.styled'
import { settings } from './MediaCarouselSettings'
import theme from 'common/theme'

export default function MediaSection() {
  const { t } = useTranslation('index')

  return (
    <Root>
      <Heading variant="h4" px={3}>
        {t('media-heading')}
      </Heading>
      <CarouselWrapper {...settings}>
        {articles.map((article, index) => (
          <Link
            href={article.url}
            key={index}
            sx={{
              background: theme.palette.background.default,
              display: 'flex',
              alignItems: 'center',
            }}
            padding="32px 64px">
            <Image src={article.img} alt={article.title} width={180} height={60} />
          </Link>
        ))}
      </CarouselWrapper>
    </Root>
  )
}
