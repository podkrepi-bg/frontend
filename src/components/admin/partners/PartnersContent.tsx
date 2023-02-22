import { Box, Container, Grid } from '@mui/material'
import Image from 'next/image'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import useMobile from '../../../common/hooks/useMobile'
import { organizationLogos, partners, techAndMarketingPartners } from './helpers/partnersData'
import { SectionTitle, StyledGrid } from './Partners.styled'
import PartnersSlider from './PartnersSlider'

const PartnersContent = () => {
  const LOGO_WIDTH = 181
  const LOGO_HEIGHT = 99

  const { t } = useTranslation()
  const { mobile } = useMobile()

  return (
    <>
      <Container maxWidth="lg">
        <Grid container alignItems={'center'}>
          {partners.map((partner) => (
            <StyledGrid item xs={12} md={4} paddingTop={8} key={partner.name}>
              <SectionTitle>{t(partner.title)}</SectionTitle>
              <Image
                alt={`${partner.name}-logo`}
                src={partner.image}
                width={LOGO_WIDTH}
                height={LOGO_HEIGHT}
                priority
              />
            </StyledGrid>
          ))}

          {techAndMarketingPartners.map((el) => (
            <Fragment key={el.title}>
              <Grid item xs={12} paddingTop={8}>
                <SectionTitle>{t(el.title)}</SectionTitle>
              </Grid>

              {el.items.map((partner, index) => (
                <StyledGrid
                  key={partner}
                  item
                  xs={12}
                  md={4}
                  paddingTop={index > 0 && mobile ? 4 : 0}>
                  <Image
                    alt="logo"
                    src={`/img/partners/${partner}.svg`}
                    width={LOGO_WIDTH}
                    height={LOGO_HEIGHT}
                  />
                </StyledGrid>
              ))}
            </Fragment>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="xl">
        <Grid container>
          <StyledGrid item xs={12} paddingTop={8}>
            <SectionTitle>{t('partners:sections.organizations')}</SectionTitle>
          </StyledGrid>

          <StyledGrid item xs={12}>
            <PartnersSlider>
              {organizationLogos.map((image) => (
                <Box key={image} width={LOGO_WIDTH} height={LOGO_HEIGHT} position="relative">
                  <Image
                    key={image}
                    src={`/img/partners/organizations/${image}.svg`}
                    alt={`${image}-logo`}
                    sizes="(max-width: 768px) 100vw,
                          (max-width: 1200px) 50vw,
                          33vw"
                    fill
                    priority
                  />
                </Box>
              ))}
            </PartnersSlider>
          </StyledGrid>
        </Grid>
      </Container>
    </>
  )
}

export default PartnersContent
