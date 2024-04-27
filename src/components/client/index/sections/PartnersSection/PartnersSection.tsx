import { useTranslation } from 'next-i18next'

import { CardMedia } from '@mui/material'

import { allPartners } from 'components/admin/partners/helpers/partnersData'
import theme from 'common/theme'
import { settings } from '../MediaSection/MediaCarouselSettings'

import { Heading } from '../../IndexPage.styled'
import { PartnerLink, Root } from './PartnersSection.styled'
import { CarouselWrapper } from '../MediaSection/MediaSection.styled'

export default function PartnersSection() {
  const { t } = useTranslation('index')

  return (
    <Root aria-labelledby="partners--heading">
      <Heading variant="h4" component={'h2'} id={'partners--heading'} px={3}>
        {t('partners-heading')}
      </Heading>
      <CarouselWrapper {...settings}>
        {allPartners.map((partner, index) => (
          <PartnerLink href={partner.website} key={index}>
            <CardMedia
              component="img"
              height="100%"
              image={partner.image}
              alt={partner.name}
              sx={{
                height: theme.spacing(9),
                width: theme.spacing(12.5),
                margin: '0 auto',
                objectFit: 'contain',
              }}
            />
          </PartnerLink>
        ))}
      </CarouselWrapper>
    </Root>
  )
}
