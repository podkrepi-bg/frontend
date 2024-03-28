import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import Link from 'next/link'

import { Grid, Typography, Divider, Card, CardContent, Box } from '@mui/material'
import AvTimerIcon from '@mui/icons-material/AvTimer'
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined'
import EmailIcon from '@mui/icons-material/Email'
import theme from 'common/theme'
import { routes } from 'common/routes'
import { useViewCampaignById } from 'common/hooks/campaigns'
import { useFindArticleBySlug } from 'common/hooks/campaign-news'
import { formatDateString } from 'common/util/date'
import { GetArticleDocuments, GetArticleGalleryPhotos } from 'common/util/newsFilesUrls'
import { HTMLContentSeparator } from 'common/util/htmlUtils'
import BreadcrumbWrapper from 'components/common/BreadcrumbWrapper'
import { QuillStypeWrapper } from 'components/common/QuillStyleWrapper'
import Layout from '../layout/Layout'
import InlineDonation from '../campaigns/InlineDonation'
import RenderSubscribeModal from '../notifications/GeneralSubscribeModal'
import {
  Subtitle,
  SubscribeButton,
  SubscribeHeading,
} from '../index/sections/PlatformStatisticsSection/PlatformStatisticsSection.styled'

const PREFIX = 'CampaignNewsSection'
const classes = {
  defaultPadding: `${PREFIX}-defaultPadding`,
  dateAndAuthorContainer: `${PREFIX}-dateAndAuthorContainer`,
  articleAuthor: `${PREFIX}-articleAuthorAndDate`,
  articlepublishedDate: `${PREFIX}-articlePublishedDate`,
  articleHeader: `${PREFIX}-articleHeader`,
  campaignTitle: `${PREFIX}-campaignTitle`,
  articleDescription: `${PREFIX}-articleDescription`,
  readMoreButton: `${PREFIX}-readMoreButton`,
  title: `${PREFIX}-title`,
}

const Root = styled(Layout)(({ theme }) => ({
  [`& .${classes.title}`]: {
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(45),
    lineHeight: theme.typography.pxToRem(60),
    letterSpacing: theme.typography.pxToRem(-1.5),
    marginBottom: theme.spacing(1),
  },

  '.ql-video, img': {
    margin: '0 auto',
    display: 'block',
  },
}))

const ArticleSection = styled(Grid)(({ theme }) => ({
  paddingLeft: theme.spacing(7),
  paddingRight: theme.spacing(7),
  paddingBottom: theme.spacing(2),

  [`& .${classes.articlepublishedDate}`]: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 400,
  },

  [`& .${classes.articleAuthor}`]: {
    fontSize: theme.typography.pxToRem(14),
    fontFamily: theme.typography.fontFamily,
    fontWeight: 400,
  },

  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },

  [`& .${classes.articleHeader}`]: {
    fontSize: theme.typography.pxToRem(20),
    maxWidth: theme.spacing(70),
    fontWeight: 700,
  },

  [`& .${classes.campaignTitle}`]: {
    maxWidth: theme.spacing(70),
    fontWeight: 700,
  },

  [`& .${classes.articleDescription}`]: {
    fontSize: theme.typography.pxToRem(16),
    fontFamily: theme.typography.fontFamily,
  },

  [`& .${classes.dateAndAuthorContainer}`]: {
    marginBottom: theme.spacing(2),
  },

  [`& .${classes.readMoreButton}`]: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.primary.light,
    textDecoration: 'underline',
    padding: 0,
    margin: 0,
  },

  [`div.${classes.articleDescription} > p`]: {
    margin: 0,
  },
}))

type Props = {
  slug: string
}

// This image should be deleted finally
const image = '/img/fox.jpg'

const StatusText = styled('span')(() => ({
  fontSize: theme.typography.pxToRem(14),
}))
const StatusLabel = styled(Typography)(() => ({
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 700,
  marginRight: theme.spacing(1),
}))

export default function SingleArticlePage({ slug }: Props) {
  const isDesktop = useMediaQuery('only screen and (min-width : 830px)')
  const { data: article, isLoading, isError } = useFindArticleBySlug(slug)
  const [subscribeIsOpen, setSubscribeOpen] = useState(false)
  const { i18n } = useTranslation('news')
  const { t } = useTranslation()

  if (isLoading || isError) return <Layout />

  const {
    data: campaign,
    isLoading: isLoadingCampaignData,
    isError: isErrorCampaignData,
  } = useViewCampaignById(article.campaignId)
  if (isLoadingCampaignData || isErrorCampaignData) return <Layout />

  const breadcumbData = [
    { label: t('campaigns:campaigns'), url: routes.campaigns.index },
    { label: t('news:all-news'), url: routes.campaigns.news.index },
    { label: article.title, url: '' },
  ]

  const documents = GetArticleDocuments(article.newsFiles)
  const images = GetArticleGalleryPhotos(article.newsFiles)
  const [, sanitizedDescription] = HTMLContentSeparator(article.description)
  return (
    <Root maxWidth={false} style={{ padding: theme.spacing(0) }}>
      <Grid container direction={'column'}>
        <Grid
          item
          sx={{
            padding: theme.spacing(0, 3),

            [theme.breakpoints.up('sm')]: {
              padding: theme.spacing(0, 5),
            },

            [theme.breakpoints.up('lg')]: {
              maxWidth: '1280px',
            },
          }}>
          <Typography variant="h1" component="p" className={classes.title}>
            {t('news:news')}
          </Typography>
          <BreadcrumbWrapper crumb={breadcumbData} />
          <Divider orientation="horizontal" sx={{ marginBottom: theme.spacing(4) }} />
        </Grid>
        <Grid container item>
          <Grid container item md={7} xs={12}>
            <ArticleSection>
              <Grid container item direction={'column'} mb={3}>
                <Typography
                  sx={{
                    fontSize: theme.typography.pxToRem(12),
                  }}
                  className={classes.campaignTitle}
                  color="primary">
                  {article.campaign.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: theme.typography.pxToRem(16),
                  }}
                  className={classes.articleHeader}>
                  {article.title}
                </Typography>
              </Grid>
              <Grid container item columnGap={2} rowGap={1}>
                <Grid container item gap={1} xs={5}>
                  <AvTimerIcon color="primary" />
                  <Typography className={classes.articlepublishedDate}>
                    {formatDateString(article.publishedAt, i18n?.language)}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <StatusLabel variant="body2" display="inline" color="primary">
                    {t('campaign-types:grid.category')}
                  </StatusLabel>
                  <StatusText>{article.campaign.campaignType.category}</StatusText>
                </Grid>
                <Grid container item gap={1} xs={5} style={{ maxWidth: '100%' }} wrap="nowrap">
                  <SupervisedUserCircleOutlinedIcon color="primary" />
                  <Typography className={classes.articleAuthor}>{article.author}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <StatusLabel variant="body2" display="inline" color="primary">
                    {t('campaigns:campaign.status')}
                  </StatusLabel>
                  <StatusText>
                    {t(`campaigns:campaign-status.${article.campaign.state}`)}
                  </StatusText>
                </Grid>
              </Grid>
              <Grid container item rowGap={1} columnGap={4}>
                {/* {article.newsFiles.length > 0 && ( */}
                <Grid item mb={3} mt={3}>
                  {' '}
                  <Image
                    src={image}
                    alt={image}
                    // The following src and alt should replace the above finally
                    // src={article.newsFiles[0].src}
                    // alt={article.newsFiles[0].fileName}
                    sizes="100vw"
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                    width={500}
                    height={300}
                  />
                </Grid>
                <Grid
                  container
                  item
                  direction={'column'}
                  gap={1}
                  xs={'auto'}
                  style={{ maxWidth: '100%' }}>
                  <Grid container item>
                    <QuillStypeWrapper>
                      <Typography
                        component={'div'}
                        className={classes.articleDescription}
                        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                        sx={{ wordBreak: 'break-word' }}
                      />
                    </QuillStypeWrapper>
                  </Grid>
                  <Grid container item direction={'column'} gap={0.5}>
                    {documents.map((file) => (
                      <Grid item key={file.id}>
                        <Link
                          key={file.id}
                          href={file.fileUrl}
                          as={`file/${file.fileName}`}
                          target="_blank"
                          passHref>
                          <Typography color="primary.dark" fontWeight="700">
                            {file.fileName}
                          </Typography>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid container item gap={1} xs={'auto'} style={{ maxWidth: '100%' }}>
                  {images.map((file) => (
                    <Grid item key={file.id}>
                      <Image src={file.src} width={220} height={120} alt={file.id} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item>
                <Card
                  variant="outlined"
                  sx={{
                    border: `1px solid ${theme.borders.light}`,
                    borderRadius: theme.borders.semiRound,
                    height: 275,
                  }}>
                  <CardContent>
                    {subscribeIsOpen && <RenderSubscribeModal setOpen={setSubscribeOpen} />}
                    <Grid
                      xs={12}
                      display="flex"
                      sx={{ mt: 3.5, mb: 0.5, justifyContent: 'center' }}>
                      <EmailIcon
                        color="primary"
                        fontSize="small"
                        sx={{ mr: 0.5 }}
                        cursor="pointer"
                      />
                      <SubscribeHeading>
                        {t('campaigns:cta.subscribe-monthly-newsletter')}
                      </SubscribeHeading>
                    </Grid>
                    <Subtitle sx={{ textAlign: 'center', margin: '5px' }}>
                      {t('campaigns:cta.subscribeGeneralSubtext')}
                    </Subtitle>
                    <Grid justifySelf="center">
                      <Box sx={{ textAlign: 'center' }}>
                        <SubscribeButton onClick={() => setSubscribeOpen(true)} variant="contained">
                          {t('campaigns:cta.subscribe-general-newsletter-button')}
                        </SubscribeButton>
                      </Box>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </ArticleSection>
          </Grid>
          {isDesktop && (
            <Grid item xs={5} pr={4}>
              <InlineDonation campaign={campaign} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Root>
  )
}
