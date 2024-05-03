import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { CampaignNewsListResponse } from 'gql/campaign-news'
import { Button, Grid, Typography, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import AvTimerIcon from '@mui/icons-material/AvTimer'
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined'
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
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import { dateToTime, formatDateString } from 'common/util/date'
import { GetArticleDocuments, GetArticleGalleryPhotos } from 'common/util/newsFilesUrls'
import { CampaignTypeCategory } from 'components/common/campaign-types/categories'
import { useShowMoreContent } from './hooks/useShowMoreContent'
import { scrollToTop } from './utils/scrollToTop'
import { getArticleHeight } from './utils/getArticleHeight'

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
  display: 'grid',
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
  articles: CampaignNewsListResponse[] | []
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
        const campaignCardImage = campaignListPictureUrl(article.campaign.campaignFiles)
        const titleImage = images[0] ?? campaignCardImage
        const campaignImagesUrl = campaignListPictureUrl(article.campaign.campaignFiles)
        return (
          <Grid
            container
            key={article.id}
            sx={{
              borderBottom: 1,
              borderColor: '#C4C4C4',
              justifyContent: 'center',
              padding: theme.spacing(0, 2),

              [theme.breakpoints.up('sm')]: {
                padding: theme.spacing(1, 5),
              },
            }}>
            {/* The following should be uncommented finally 
             {article.newsFiles.length > 0 && (
            <Grid item sx={{ position: "relative", width: "200px" }}>
              <Image
                onClick={() => router.push(routes.campaigns.news.viewSingleArticle(article.slug))}
                src={article.newsFiles[0].src}
                alt={article.newsFiles[0].fileName}
                style={{  objectFit: 'contain',
                  cursor: 'pointer' }}
                />
            </Grid>
            )} */}

            <Grid item container columnGap={2}>
              {/* The next Grid item should be deleted finally and it will be replaced by the above*/}
              <Grid item md={3} xs={5}>
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
                  width={100}
                  height={100}
                  src={images[index]}
                  alt={images[index]}
                  onClick={() => router.push(routes.campaigns.news.viewSingleArticle(article.slug))}
                  style={{
                    position: 'relative',
                    objectFit: 'contain',
                    cursor: 'pointer',
                  }}
                />
                {/* } */}
              </Grid>
              <Grid item md={6} xs={6}>
                <ArticleSection id={article.id}>
                  <Grid container rowGap={1}>
                    <Grid container item direction={'column'}>
                      <Typography
                        sx={{
                          fontSize: {
                            xs: theme.typography.pxToRem(10),
                            sm: theme.typography.pxToRem(12),
                          },
                        }}
                        className={classes.campaignTitle}
                        color="primary">
                        {article.campaign.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: {
                            xs: theme.typography.pxToRem(12),
                            sm: theme.typography.pxToRem(16),
                          },
                        }}
                        className={classes.articleHeader}
                        onClick={() =>
                          router.push(routes.campaigns.news.viewSingleArticle(article.slug))
                        }>
                        {article.title}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container alignSelf="end" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    <Grid item container mt={1.5} mb={1.5}>
                      <Grid item xs={3.9} md={5}>
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
                    <Grid container className={classes.dateAndAuthorContainer}>
                      <Grid container item md={5} gap={1}>
                        <AvTimerIcon color="primary" />
                        <Typography className={classes.articlepublishedDate}>
                          {formatDateString(article.publishedAt, i18n.language)} &nbsp;
                          {dateToTime(article.publishedAt, i18n.language)}
                        </Typography>
                      </Grid>
                      <Grid container item md={5} gap={1}>
                        <SupervisedUserCircleOutlinedIcon color="primary" />
                        <Typography className={classes.articleAuthor}>{article.author}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
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
            </Grid>
            <>
              <Grid
                container
                columnGap={14}
                className={classes.dateAndAuthorContainer}
                mb={2}
                sx={{ display: { sm: 'none', xs: 'flex' } }}>
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
                <Grid container item gap={1.5} xs="auto" mb={0.5} ml={-1}>
                  <Grid item>
                    {Object.values(CampaignTypeCategory).map((category) => {
                      if (category === article.campaign.campaignType.category)
                        return (
                          <IconButton color="primary" key={article.campaign.campaignType.category}>
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
          </Grid>
        )
      })}
    </>
  )
}
