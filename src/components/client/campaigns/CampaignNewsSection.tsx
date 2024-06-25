import { Typography, Grid, Button, Link } from '@mui/material'
import { CampaignResponse } from 'gql/campaigns'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab'
import AvTimerIcon from '@mui/icons-material/AvTimer'
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined'

import { styled } from '@mui/material/styles'
import { dateToTime, formatDateString } from 'common/util/date'
import { routes } from 'common/routes'
import { OutlinedButton } from '../index/IndexPage.styled'

import { useTranslation } from 'next-i18next'

import Image from 'next/image'
import useMobile from 'common/hooks/useMobile'
import theme from 'common/theme'
import { GetArticleDocuments, GetArticleGalleryPhotos } from 'common/util/newsFilesUrls'
import { useShowMoreContent } from '../campaign-news/hooks/useShowMoreContent'
import { sanitizeHTML } from 'common/util/htmlUtils'
import { QuillStypeWrapper } from 'components/common/QuillStyleWrapper'
import { scrollToTop } from '../campaign-news/utils/scrollToTop'
import { getArticleHeight } from '../campaign-news/utils/getArticleHeight'
import Gallery from 'components/common/Gallery'

const PREFIX = 'NewsTimeline'

const classes = {
  timelineItem: `${PREFIX}-timelineItem`,
  connector: `${PREFIX}-connector`,
  dot: `${PREFIX}-dot`,
  timelineOppositeContent: `${PREFIX}-timelineOppositeContent`,
  articlePublishedDate: `${PREFIX}-articlePublishedDate`,
  articleAuthor: `${PREFIX}-articleAuthor`,
  articleContent: `${PREFIX}-articleContent`,
  timelineContent: `${PREFIX}-timelineContent`,
  articleHeader: `${PREFIX}-articleHeader`,
  articleDescription: `${PREFIX}-articleDescription`,
  articleAttachmentContainer: `${PREFIX}-articleAttachment`,
  readMoreButton: `${PREFIX}-readMoreButton`,
  readAllButton: `${PREFIX}-readAllButton`,
  dateAndAuthorContainer: `${PREFIX}-dateAndAuthorContainer`,
}

const StyledTimeline = styled(Timeline)(({ theme }) => ({
  padding: 0,
  [`& .MuiTimelineItem-root:before`]: {
    display: 'none',
  },

  [`& .${classes.connector}`]: {
    backgroundColor: theme.palette.primary.light,
    minHeight: theme.spacing(20),
  },

  [`& .${classes.dot}`]: {
    backgroundColor: theme.palette.primary.light,
    margin: 0,
  },

  [`& .${classes.dateAndAuthorContainer}`]: {
    marginBottom: theme.spacing(2),
  },

  [`& .${classes.timelineOppositeContent}`]: {
    paddingTop: theme.spacing(0),
    paddingLeft: theme.spacing(0),
    maxWidth: theme.spacing(18),
    marginTop: theme.spacing(-0.5),
  },

  [`& .${classes.timelineContent}`]: {
    paddingTop: theme.spacing(0),
    marginTop: theme.spacing(-0.5),
  },

  [`& .${classes.articleHeader}`]: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 700,
  },

  [`& .${classes.articleContent}`]: {
    marginBottom: theme.spacing(5),
  },

  [`& .${classes.articlePublishedDate}`]: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 400,
    textAlign: 'left',

    [theme.breakpoints.down('sm')]: {
      maxWidth: '60%',
    },
  },

  [`& .${classes.articleAuthor}`]: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 400,
    textAlign: 'left',
  },

  [`& .${classes.articleDescription}`]: {
    fontSize: theme.typography.pxToRem(16),
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    padding: 0,
  },

  [`article.${classes.articleDescription} > p`]: {
    margin: 0,
  },

  [`& .${classes.readMoreButton}`]: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.primary.light,
    textDecoration: 'underline',
    padding: 0,
    margin: 0,
    position: 'relative',
    bottom: 3,
  },

  [`& .${classes.readAllButton}`]: {
    marginTop: theme.spacing(5),
    fontWeight: 500,
    color: theme.palette.primary.dark,
    marginLeft: `calc(18% - ${theme.spacing(2)})`,
    minWidth: theme.spacing(15),
  },

  [`& .${classes.articleAttachmentContainer}`]: {
    display: 'flex',
    flexDirection: 'column',
  },

  ['& .ql-editor']: {
    fontSize: theme.typography.pxToRem(16),
    fontFamily: theme.typography.fontFamily,
    fontWeight: 400,
    fontStyle: 'normal',
    padding: 0,
  },

  ['& .ql-container']: {
    fontFamily: theme.typography.fontFamily,
  },
}))

type Props = {
  campaign: CampaignResponse
  canCreateArticle: boolean
}

export default function CampaignNewsSection({ campaign, canCreateArticle }: Props) {
  const { t, i18n } = useTranslation('news')
  const { small }: { small: boolean } = useMobile()

  const LINE_HEIGHT = theme.typography.body1.lineHeight
  const INITIAL_HEIGHT_LIMIT = 200 * Number(LINE_HEIGHT)
  const [isExpanded, expandContent] = useShowMoreContent()

  return (
    <Grid container item xs={12} spacing={1} id="news">
      <Grid container item flexDirection={'column'}>
        <Typography component="h4" color={theme.palette.common.black} fontSize="2rem">
          {t('news')}
        </Typography>
        {canCreateArticle && (
          <Link href={routes.campaigns.news.newsAdminPanel(campaign.slug)}>
            <Typography color="primary" fontWeight="medium" fontSize={16}>
              {t('write-new-article')}
            </Typography>
          </Link>
        )}
      </Grid>
      {campaign.campaignNews.length === 0 ? (
        <Grid item>
          <Typography>{t('news-not-found')}</Typography>
        </Grid>
      ) : (
        <Grid item>
          <StyledTimeline>
            {campaign.campaignNews?.map((article) => {
              const documents = GetArticleDocuments(article.newsFiles)
              const images = GetArticleGalleryPhotos(article.newsFiles)
              const sanitizedDescription = sanitizeHTML(article.description)
              return (
                <TimelineItem key={article.id} className={classes.timelineItem} id={article.id}>
                  {!small && (
                    <TimelineOppositeContent className={classes.timelineOppositeContent}>
                      <Grid container flexDirection={'column'} wrap="nowrap" gap={2}>
                        <Grid container item wrap="nowrap" gap={1}>
                          <AvTimerIcon color="action" />
                          <Typography className={classes.articlePublishedDate}>
                            {`${formatDateString(article.publishedAt, i18n?.language)} ${dateToTime(
                              article.publishedAt,
                              i18n?.language,
                            )}`}
                          </Typography>
                        </Grid>
                        <Grid container item wrap="nowrap" gap={1}>
                          <SupervisedUserCircleOutlinedIcon color="action" />
                          <Typography className={classes.articleAuthor}>
                            {article.author}
                          </Typography>
                        </Grid>
                      </Grid>
                    </TimelineOppositeContent>
                  )}
                  <TimelineSeparator>
                    <TimelineDot className={classes.dot} />
                    <TimelineConnector className={classes.connector} />
                  </TimelineSeparator>
                  <TimelineContent className={classes.timelineContent}>
                    {small && (
                      <Grid
                        container
                        columnGap={2}
                        rowGap={1}
                        className={classes.dateAndAuthorContainer}>
                        <Grid container item gap={1} xs="auto">
                          <AvTimerIcon color="action" />
                          <Typography className={classes.articlePublishedDate}>
                            {`${formatDateString(article.publishedAt, i18n?.language)} ${dateToTime(
                              article.publishedAt,
                              i18n?.language,
                            )}`}
                          </Typography>
                        </Grid>
                        <Grid
                          container
                          item
                          gap={1}
                          xs="auto"
                          style={{ maxWidth: '40%' }}
                          wrap="nowrap">
                          <SupervisedUserCircleOutlinedIcon color="action" />
                          <Typography className={classes.articleAuthor}>
                            {article.author}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                    <Grid container gap={1} direction={'column'} className={classes.articleContent}>
                      <Grid item>
                        <Typography component={'h2'} className={classes.articleHeader}>
                          {article.title}
                        </Typography>
                      </Grid>
                      <Grid
                        container
                        item
                        direction={'row'}
                        sx={{
                          height:
                            getArticleHeight(article.id) > INITIAL_HEIGHT_LIMIT &&
                            !isExpanded[article.id]
                              ? INITIAL_HEIGHT_LIMIT
                              : 'auto',
                          overflow: 'hidden',
                        }}>
                        <QuillStypeWrapper>
                          <Typography
                            component={'article'}
                            className={classes.articleDescription}
                            dangerouslySetInnerHTML={{
                              __html: sanitizedDescription,
                            }}
                            sx={{ wordBreak: 'break-word' }}
                          />
                        </QuillStypeWrapper>
                      </Grid>
                      {getArticleHeight(article.id) >= INITIAL_HEIGHT_LIMIT && (
                        <Button
                          className={classes.readMoreButton}
                          onClick={() => {
                            expandContent(article.id)
                            scrollToTop(article.id)
                          }}>
                          {!isExpanded[article.id] ? `${t('read-more')} >` : `${t('read-less')} <`}
                        </Button>
                      )}
                      {article.newsFiles.length > 0 && (
                        <Grid container gap={1}>
                          <Grid container item direction={'column'} gap={0.5}>
                            {documents.map((file) => (
                              <Grid item key={file.id}>
                                <Link href={file.fileUrl} target="_blank">
                                  <Typography color="primary.dark" fontSize={16} fontWeight="700">
                                    {file.fileName}
                                  </Typography>
                                </Link>
                              </Grid>
                            ))}
                          </Grid>
                          <Grid container item gap={1}>
                            <Gallery images={images}>
                              {images.map((file) => {
                                return (
                                  <Grid item key={file.id}>
                                    <Image
                                      src={file.src}
                                      width={220}
                                      height={140}
                                      alt={file.fileName}
                                      style={{ objectFit: 'scale-down' }}
                                    />
                                  </Grid>
                                )
                              })}
                            </Gallery>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </TimelineContent>
                </TimelineItem>
              )
            })}
            <Grid>
              <OutlinedButton
                href={routes.campaigns.news.listNewsForCampaign(campaign.slug)}
                variant="outlined"
                className={classes.readAllButton}>
                {t('see-all-news')}
              </OutlinedButton>
            </Grid>
          </StyledTimeline>
        </Grid>
      )}
    </Grid>
  )
}
