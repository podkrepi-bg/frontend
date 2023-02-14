import { Box, Container, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { givers } from './helpers/giversData'
import { data } from './helpers/guarantsData'
import { Description, StyledGrid, Subtitle, Title } from './Partners.styled'
import PartnersSlider from './PartnersSlider'

const GiversAndGuarants = () => {
  const LOGO_WIDTH = 120
  const LOGO_HEIGHT = 120
  const { t } = useTranslation()

  return (
    <>
      <Container maxWidth="xl">
        <Grid container>
          <StyledGrid item xs={12} paddingTop={8}>
            <Title>{t('partners:guarants.title')}</Title>
          </StyledGrid>

          <StyledGrid item xs={12} paddingTop={6} paddingBottom={14}>
            <PartnersSlider>
              {data.map((guarant) => (
                <Box key={guarant.name} textAlign={'center'}>
                  <Box display={'flex'} justifyContent="center">
                    <Image alt={guarant.name} src={guarant.img} width={120} height={120} />
                  </Box>
                  <Subtitle paddingY={1}>{guarant.name}</Subtitle>
                  <Description>{guarant.description}</Description>
                </Box>
              ))}
            </PartnersSlider>
          </StyledGrid>
        </Grid>
      </Container>

      <Container maxWidth="md">
        <Grid container>
          <StyledGrid item xs={12}>
            <Title textAlign={'center'} paddingBottom={2}>
              {t('partners:guarants.corporateGivers')}
            </Title>
            <Image alt="logo" src="/img/partners/guarants/yotpo.svg" width={181} height={99} />
          </StyledGrid>

          {givers.map((option) => (
            <Fragment key={option.title}>
              <StyledGrid item xs={12} paddingTop={7.5} paddingBottom={3}>
                <Title>{t(option.title)}</Title>
              </StyledGrid>

              <StyledGrid item xs={12}>
                <Typography>{t(option.subtitle)}</Typography>
              </StyledGrid>

              {option.givers.map((giver) => (
                <StyledGrid item xs={12} sm={6} key={giver.name} paddingTop={5.5}>
                  <Image
                    alt={`${giver}-logo`}
                    src={`/img/partners/givers/${giver.image}.png`}
                    width={LOGO_WIDTH}
                    height={LOGO_HEIGHT}
                  />
                  <Subtitle paddingTop={1}>{giver.name}</Subtitle>
                </StyledGrid>
              ))}
            </Fragment>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default GiversAndGuarants
