import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { CampaignNewsResponse } from 'gql/campaign-news'
import { Button, Grid, Typography, Stack, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import AvTimerIcon from '@mui/icons-material/AvTimer'
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined'
import useMediaQuery from '@mui/material/useMediaQuery'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import {
  Apartment,
  Brush,
  BusAlert,
  Category,
  Forest,
  MedicalServices,
  Pets,
  School,
  SportsTennis,
  TheaterComedy,
  VolunteerActivism,
} from '@mui/icons-material'
import theme from 'common/theme'
import { routes } from 'common/routes'
import { HTMLContentSeparator } from 'common/util/htmlUtils'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import { useViewCampaignById } from 'common/hooks/campaigns'
import { dateToTime, formatDateString } from 'common/util/date'
import { GetArticleDocuments, GetArticleGalleryPhotos } from 'common/util/newsFilesUrls'
import { CampaignTypeCategory } from 'components/common/campaign-types/categories'
import { QuillStypeWrapper } from 'components/common/QuillStyleWrapper'
import { useShowMoreContent } from './hooks/useShowMoreContent'
import { scrollToTop } from './utils/scrollToTop'
import { getArticleHeight } from './utils/getArticleHeight'
import Layout from '../layout/Layout'

const categories: {
  [key in CampaignTypeCategory]: { icon?: React.ReactElement }
} = {
  medical: { icon: <MedicalServices fontSize="small" /> },
  charity: { icon: <VolunteerActivism fontSize="small" /> },
  disasters: { icon: <BusAlert fontSize="small" /> },
  education: { icon: <School fontSize="small" /> },
  events: { icon: <TheaterComedy fontSize="small" /> },
  environment: { icon: <Apartment fontSize="small" /> },
  sport: { icon: <SportsTennis fontSize="small" /> },
  art: { icon: <Brush fontSize="small" /> },
  animals: { icon: <Pets fontSize="small" /> },
  nature: { icon: <Forest fontSize="small" /> },
  others: {},
}
const PREFIX = 'CampaignNewsSection'
const classes = {
  defaultPadding: `${PREFIX}-defaultPadding`,
  dateAndAuthorContainer: `${PREFIX}-dateAndAuthorContainer`,
  articleAuthor: `${PREFIX}-articleAuthorAndDate`,
  articlepublishedDate: `${PREFIX}-articlePublishedDate`,
  articleHeader: `${PREFIX}-articleHeader`,
  articleDescription: `${PREFIX}-articleDescription`,
  readMoreButton: `${PREFIX}-readMoreButton`,
  campaignTitle: `${PREFIX}-campaignTitle`,
}

const ArticleSection = styled(Grid)(({ theme }) => ({
  paddingBottom: theme.spacing(2),

  [`& .${classes.articleDescription}`]: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  [`& .${classes.articlepublishedDate}`]: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 400,
  },

  [`& .${classes.articleAuthor}`]: {
    fontSize: theme.typography.pxToRem(14),
    fontFamily: theme.typography.fontFamily,
    fontWeight: 400,

    [theme.breakpoints.down(450)]: {
      maxWidth: '20ch',
    },
  },

  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },

  [`& .${classes.campaignTitle}`]: {
    maxWidth: theme.spacing(70),
    fontWeight: 700,
  },

  [`& .${classes.articleHeader}`]: {
    maxWidth: theme.spacing(70),
    fontWeight: 700,

    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
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
    position: 'relative',
    bottom: 5,
  },
}))

// These images are only for development stage
const images = ['/img/fox.jpg', '/img/squirrel.jpg', '/img/wolf.jpg']

type Props = {
  articles: CampaignNewsResponse[] | []
}
const StatusText = styled('span')(() => ({
  fontSize: theme.typography.pxToRem(14),
}))
const StatusLabel = styled(Typography)(() => ({
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 700,
  marginRight: theme.spacing(1),
}))

export default function CampaignNewsList({ articles }: Props) {
  const isDesktop = useMediaQuery('only screen and (min-width : 830px)')
  const { t, i18n } = useTranslation()
  const INITIAL_HEIGHT_LIMIT = 400
  const [isExpanded, expandContent] = useShowMoreContent()
  const router = useRouter()

  return (
    <>
      {articles?.map((article, index: number) => {
        // The next two lines should be uncommented finally
        // const documents = GetArticleDocuments(article.newsFiles)
        // const images = GetArticleGalleryPhotos(article.newsFiles)
        const [, sanitizedDescription] = HTMLContentSeparator(article.description)
        const {
          data: campaign,
          isLoading: isLoadingCampaignData,
          isError: isErrorCampaignData,
        } = useViewCampaignById(article.campaign.id)
        if (isLoadingCampaignData || isErrorCampaignData) return <Layout />

        const campaignImagesUrl = campaignListPictureUrl(campaign)
        return (
          <Grid
            container
            key={article.id}
            spacing={2}
            sx={{
              backgroundColor: index % 2 === 0 ? theme.palette.common.white : '#E3E3E3',
              borderBottom: 1,
              borderColor: index % 2 === 0 ? theme.palette.common.white : '#C4C4C4',
              justifyContent: 'center',
              padding: theme.spacing(0, 2),

              [theme.breakpoints.up('sm')]: {
                padding: theme.spacing(0, 5),
              },
            }}>
            {/* The following should be uncommented finally 
             {article.newsFiles.length > 0 && (
            <Grid item sx={{ position: "relative", width: "300px" }} mt={1.5} md={3} xs={5}>
              <Image
                onClick={() => router.push(routes.campaigns.news.viewSingleArticle(article.slug))}
                src={article.newsFiles[0].src}
                alt={article.newsFiles[0].fileName}
                style={{  objectFit: 'contain',
                  cursor: 'pointer' }}
                />
            </Grid>
            )} */}

            {/* The next Grid item should be deleted finally and it will be replaced by the above*/}
            <Grid item sx={{ position: 'relative', width: '300px' }} mt={1.5} md={3} xs={5}>
              {/* The next condition should be in force finally and the following should be uncommented
              {article.newsFiles.length === 0 ? <Image src={campaignImagesUrl} alt={images[index]}
                onClick={() => router.push(routes.campaigns.news.viewSingleArticle(article.slug))}
                fill
                style={{
                  objectFit: 'contain',
                  cursor: 'pointer'
                }} /> : 
                 */}
              <Image
                src={images[index]}
                alt={images[index]}
                onClick={() => router.push(routes.campaigns.news.viewSingleArticle(article.slug))}
                fill
                style={{
                  objectFit: 'contain',
                  cursor: 'pointer',
                }}
              />
              {/* } */}
            </Grid>
            <Grid item md={9} xs={7} container>
              <ArticleSection id={article.id}>
                <Grid container rowGap={1}>
                  <Grid container item direction={'column'}>
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
                      className={classes.articleHeader}
                      onClick={() =>
                        router.push(routes.campaigns.news.viewSingleArticle(article.slug))
                      }>
                      {article.title}
                    </Typography>
                    <QuillStypeWrapper>
                      <Typography
                        component={'div'}
                        className={classes.articleDescription}
                        dangerouslySetInnerHTML={{
                          __html: sanitizedDescription,
                        }}
                        sx={{ wordBreak: 'break-word' }}
                      />
                    </QuillStypeWrapper>
                  </Grid>
                </Grid>
                {isDesktop && (
                  <>
                    <Grid container item mt={1.5} mb={1.5}>
                      <Grid item xs={3.9}>
                        <StatusLabel variant="body2" display="inline" color="primary">
                          {t('campaign-types:grid.category')}
                        </StatusLabel>
                        <StatusText>{article.campaign.campaignType.category}</StatusText>
                      </Grid>
                      <Grid item xs={3.9}>
                        <StatusLabel variant="body2" display="inline" color="primary">
                          {t('campaigns:campaign.status')}
                        </StatusLabel>
                        <StatusText>
                          {t(`campaigns:campaign-status.${article.campaign.state}`)}
                        </StatusText>
                      </Grid>
                    </Grid>
                    <Grid container columnGap={12} className={classes.dateAndAuthorContainer}>
                      <Grid container item gap={1} xs="auto">
                        <AvTimerIcon color="primary" />
                        <Typography className={classes.articlepublishedDate}>
                          {formatDateString(article.publishedAt, i18n.language)} &nbsp;
                          {dateToTime(article.publishedAt, i18n.language)}
                        </Typography>
                      </Grid>
                      <Grid container item gap={1} xs="auto">
                        <SupervisedUserCircleOutlinedIcon color="primary" />
                        <Typography className={classes.articleAuthor}>{article.author}</Typography>
                      </Grid>
                    </Grid>
                  </>
                )}
                {getArticleHeight(article.id) > INITIAL_HEIGHT_LIMIT && (
                  <Button
                    key={article.id}
                    className={classes.readMoreButton}
                    onClick={() => {
                      expandContent(article.id)
                      scrollToTop(article.id)
                    }}
                    sx={{ background: 'transperent', width: '100%' }}>
                    {!isExpanded[article.id]
                      ? `${t('news:read-more')} >`
                      : `${t('news:read-less')} <`}
                  </Button>
                )}
              </ArticleSection>
            </Grid>
            {!isDesktop && (
              <>
                <Grid container columnGap={14} className={classes.dateAndAuthorContainer} mb={2}>
                  <Grid container item gap={1} xs="auto" mb={0.5}>
                    <AvTimerIcon color="primary" />
                    <Typography className={classes.articlepublishedDate}>
                      {formatDateString(article.publishedAt, i18n.language)} &nbsp;
                      {dateToTime(article.publishedAt, i18n.language)}
                    </Typography>
                  </Grid>
                  <Grid container item gap={1} xs="auto" mb={0.5}>
                    <SupervisedUserCircleOutlinedIcon color="primary" />
                    <Typography className={classes.articleAuthor}>{article.author}</Typography>
                  </Grid>
                  <Grid container item gap={1.5} xs="auto" mb={0.5}>
                    <Grid item>
                      {Object.values(CampaignTypeCategory).map((category) => {
                        if (category === article.campaign.campaignType.category)
                          return (
                            <IconButton
                              color="primary"
                              key={article.campaign.campaignType.category}>
                              {categories[article.campaign.campaignType.category].icon ?? (
                                <Category fontSize="small" />
                              )}
                            </IconButton>
                          )
                      })}
                      <StatusText>{article.campaign.campaignType.category}</StatusText>
                    </Grid>
                    <Grid item>
                      <IconButton color="primary">
                        <AnalyticsIcon fontSize="small" />
                      </IconButton>
                      <StatusText>
                        {t(`campaigns:campaign-status.${article.campaign.state}`)}
                      </StatusText>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        )
      })}
    </>
  )
}
