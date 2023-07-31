import { Button, Grid, Link, Typography } from '@mui/material'

import { CampaignNewsResponse } from 'gql/campaign-news'

import { styled } from '@mui/material/styles'
import { dateToTime, formatDateString } from 'common/util/date'
import AvTimerIcon from '@mui/icons-material/AvTimer'
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined'
import { useTranslation } from 'react-i18next'

import Image from 'next/image'
import { GetArticleDocuments, GetArticleGalleryPhotos } from 'common/util/newsFilesUrls'
import { useShowMoreContent } from './hooks/useShowMoreContent'
import { HTMLContentSeparator } from 'common/util/htmlUtils'
import { QuillStypeWrapper } from 'components/common/QuillStyleWrapper'
import { scrollToTop } from './utils/scrollToTop'
import { getArticleHeight } from './utils/getArticleHeight'

const PREFIX = 'CampaignNewsSection'
const classes = {
  defaultPadding: `${PREFIX}-defaultPadding`,
  dateAndAuthorContainer: `${PREFIX}-dateAndAuthorContainer`,
  articleAuthor: `${PREFIX}-articleAuthorAndDate`,
  articlepublishedDate: `${PREFIX}-articlePublishedDate`,
  articleHeader: `${PREFIX}-articleHeader`,
  articleDescription: `${PREFIX}-articleDescription`,
  readMoreButton: `${PREFIX}-readMoreButton`,
}

const ArticleSection = styled(Grid)(({ theme }) => ({
  paddingLeft: theme.spacing(7),
  paddingRight: theme.spacing(7),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
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

  [`& .${classes.articleHeader}`]: {
    fontSize: theme.typography.pxToRem(16),
    maxWidth: theme.spacing(70),
    fontWeight: 700,
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

type Props = {
  articles: CampaignNewsResponse[] | []
}

export default function CampaignNewsList({ articles }: Props) {
  const { t, i18n } = useTranslation('news')
  const INITIAL_HEIGHT_LIMIT = 400
  const [isExpanded, expandContent] = useShowMoreContent()

  return (
    <>
      {articles?.map((article, index: number) => {
        const documents = GetArticleDocuments(article.newsFiles)
        const images = GetArticleGalleryPhotos(article.newsFiles)
        const [, sanitizedDescription] = HTMLContentSeparator(article.description)
        return (
          <Grid
            container
            key={article.id}
            sx={{
              backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#E3E3E3',
              borderBottom: 1,
              borderColor: index % 2 === 0 ? '#FFFFFF' : '#C4C4C4',
            }}>
            <ArticleSection id={article.id}>
              <Grid container columnGap={2} rowGap={1} className={classes.dateAndAuthorContainer}>
                <Grid container item gap={1} xs="auto">
                  <AvTimerIcon color="primary" />
                  <Typography className={classes.articlepublishedDate}>
                    {formatDateString(article.publishedAt, i18n.language)} &nbsp;
                    {dateToTime(article.publishedAt, i18n.language)}
                  </Typography>
                </Grid>
                <Grid container item gap={1} xs="auto" style={{ maxWidth: '100%' }} wrap="nowrap">
                  <SupervisedUserCircleOutlinedIcon color="primary" />
                  <Typography className={classes.articleAuthor}>{article.author}</Typography>
                </Grid>
              </Grid>
              <Grid
                container
                rowGap={1}
                columnGap={4}
                sx={{
                  height:
                    getArticleHeight(article.id) > INITIAL_HEIGHT_LIMIT && !isExpanded[article.id]
                      ? INITIAL_HEIGHT_LIMIT
                      : 'auto',
                  overflow: 'hidden',
                }}>
                <Grid container item direction={'column'} gap={1}>
                  <Typography className={classes.articleHeader}>{article.title}</Typography>
                  <QuillStypeWrapper>
                    <Typography
                      component={'div'}
                      className={classes.articleDescription}
                      dangerouslySetInnerHTML={{
                        __html: sanitizedDescription,
                      }}
                      sx={{ wordBreak: 'break-word', maxWidth: 1200 }}
                    />
                  </QuillStypeWrapper>
                  <Grid container item direction={'column'} gap={0.5}>
                    {documents.map((file) => (
                      <Grid item key={file.id}>
                        <Link key={file.id} href={file.fileUrl} target="_blank">
                          <Typography color="primary.dark" fontWeight="700">
                            {file.fileName}
                          </Typography>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                {article.newsFiles.length > 0 && (
                  <Grid container item gap={1} xs={'auto'} style={{ maxWidth: '100%' }}>
                    {images.map((file) => (
                      <Grid item key={file.id}>
                        <Image src={file.imgSource} width={220} height={120} alt={file.id} />
                      </Grid>
                    ))}
                  </Grid>
                )}
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
                  {!isExpanded[article.id] ? `${t('read-more')} >` : `${t('read-less')} <`}
                </Button>
              )}
            </ArticleSection>
          </Grid>
        )
      })}
    </>
  )
}
