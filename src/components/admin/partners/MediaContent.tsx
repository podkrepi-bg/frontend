import { Box, Container, Grid, Link } from '@mui/material'
import Image from 'next/image'
import useMobile from '../../../common/hooks/useMobile'
import { articles } from './helpers/mediaAboutUsData'
import { Description, Subtitle } from './Partners.styled'

const MediaContent = () => {
  const { small } = useMobile()

  const firstElementMargin = (index: number) => {
    if (small && index === 0) {
      return 7.5
    }

    if (!small && index < 2) {
      return 7.5
    }

    return 0
  }

  return (
    <Container maxWidth="xl">
      <Grid container rowSpacing={7.5} columnSpacing={7}>
        {articles.map((article, index) => (
          <Grid
            key={article.title}
            item
            xs={12}
            md={6}
            marginTop={firstElementMargin(index)}
            display="flex"
            flexDirection={small ? 'column' : 'row'}
            alignItems="center">
            <Box paddingRight={2}>
              <Image alt="logo" src={article.img} width={80} height={80} />
            </Box>
            <Box>
              <Subtitle>{article.title}</Subtitle>
              <Link
                color="primary"
                href={article.url}
                underline="none"
                target="_blank"
                paddingY={1}>
                {article.subtitle}
              </Link>
              <Description>{article.description}</Description>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default MediaContent
