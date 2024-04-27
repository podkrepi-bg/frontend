import { useTranslation } from 'next-i18next'

import { CardMedia } from '@mui/material'

import { articles } from 'components/admin/partners/helpers/mediaAboutUsData'
import theme from 'common/theme'
import { settings } from './MediaCarouselSettings'

import { Heading } from '../../IndexPage.styled'
import { ArticleLink, CarouselWrapper, Root } from './MediaSection.styled'

export default function MediaSection() {
  const { t } = useTranslation('index')

  return (
    <Root aria-labelledby="media--heading">
      <Heading variant="h4" component={'h2'} id={'media--heading'} px={3}>
        {t('media-heading')}
      </Heading>
      <CarouselWrapper {...settings}>
        {articles.map((article, index) => (
          <ArticleLink href={article.url} key={index}>
            <CardMedia
              component="img"
              height="100%"
              image={article.img}
              alt={article.title}
              sx={{ height: theme.spacing(12.5), width: theme.spacing(12.5), margin: '0 auto' }}
            />
          </ArticleLink>
        ))}
      </CarouselWrapper>
    </Root>
  )
}
