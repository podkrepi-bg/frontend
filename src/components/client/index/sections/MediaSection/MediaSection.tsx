import { useTranslation } from 'next-i18next'

import Image from 'next/image'

import { articles } from 'components/admin/partners/helpers/mediaAboutUsData'
import Link from 'components/common/Link'

import { Heading } from '../../IndexPage.styled'
import { CarouselWrapper, Root } from './MediaSection.styled'
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
              padding: theme.spacing(0, 11),
              boxShadow:
                '0px 1px 8px 0px rgba(0, 0, 0, 0.12), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 3px 3px -2px rgba(0, 0, 0, 0.20)',
            }}>
            <Image src={article.img} alt={article.title} width="150" height="60" />
          </Link>
        ))}
      </CarouselWrapper>
    </Root>
  )
}
