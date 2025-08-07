import { Box, Container, Grid2 } from '@mui/material'
import Image from 'next/image'
import ExternalLink from 'components/common/ExternalLink'
import { Fragment } from 'react'
import { useTranslation } from 'next-i18next'
import useMobile from '../../../common/hooks/useMobile'
import { organizations, partners, mainPartners } from './helpers/partnersData'
import { SectionTitle, StyledGrid } from './Partners.styled'
import PartnersSlider from './PartnersSlider'
import theme from 'common/theme'

const PartnersContent = () => {
  const LOGO_WIDTH = 181
  const LOGO_HEIGHT = 99

  const { t } = useTranslation()
  const { mobile } = useMobile()

  return (
    <>
      <Container maxWidth="lg">
        <Grid2 container sx={{ display: 'flex', justifyContent: 'center' }}>
          {partners.map((partner) => (
            <StyledGrid item xs={12} md={4} paddingTop={8} paddingBottom={5} key={partner.name}>
              <SectionTitle>{t(partner.title)}</SectionTitle>
              <ExternalLink href={partner.website}>
                <Image
                  alt={`${partner.name}-logo`}
                  src={partner.image}
                  width={LOGO_WIDTH}
                  height={LOGO_HEIGHT}
                  priority
                />
              </ExternalLink>
            </StyledGrid>
          ))}

          {mainPartners.map((el) => (
            <Fragment key={el.title}>
              <Grid2 paddingTop={8} size={12}>
                <SectionTitle>{t(el.title)}</SectionTitle>
              </Grid2>

              <Grid2
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: theme.spacing(2),
                  paddingBottom: theme.spacing(5),

                  [theme.breakpoints.up('md')]: {
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    gap: theme.spacing(6),
                  },

                  [theme.breakpoints.up('lg')]: {
                    gap: theme.spacing(12),
                  },
                }}>
                {el.items.map((partner, index) => (
                  <StyledGrid key={partner} item xs={12} paddingTop={index > 0 && mobile ? 4 : 0}>
                    <ExternalLink href={el.websites[index]}>
                      <Image
                        alt="logo"
                        src={`/img/partners/${partner}.svg`}
                        width={LOGO_WIDTH}
                        height={LOGO_HEIGHT}
                      />
                    </ExternalLink>
                  </StyledGrid>
                ))}
              </Grid2>
            </Fragment>
          ))}
        </Grid2>
      </Container>
      <Container maxWidth="xl">
        <Grid2 container>
          <StyledGrid item xs={12} paddingTop={8}>
            <SectionTitle>{t('partners:sections.organizations')}</SectionTitle>
          </StyledGrid>

          <StyledGrid item xs={12}>
            <PartnersSlider>
              {organizations.map((org) => (
                <Box key={org.name} width={LOGO_WIDTH} height={LOGO_HEIGHT} position="relative">
                  <ExternalLink href={org.website}>
                    <Image
                      key={org.name}
                      src={`/img/partners/organizations/${org.name}.svg`}
                      alt={`${org.name}-logo`}
                      sizes="(max-width: 768px) 100vw,
                          (max-width: 1200px) 50vw,
                          33vw"
                      fill
                      priority
                    />
                  </ExternalLink>
                </Box>
              ))}
            </PartnersSlider>
          </StyledGrid>
        </Grid2>
      </Container>
    </>
  )
}

export default PartnersContent
