import { Button, Grid, Link, Typography } from '@mui/material'

import 'react-quill/dist/quill.bubble.css'

import { CampaignNewsResponse } from 'gql/campaign-news'

import { styled } from '@mui/material/styles'
import { dateToTime, formatDateString } from 'common/util/date'
import AvTimerIcon from '@mui/icons-material/AvTimer'
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined'
import { useTranslation } from 'react-i18next'

import Image from 'next/image'
import { GetArticleDocuments, GetArticleGalleryPhotos } from 'common/util/newsFilesUrls'
import { useShowMoreContent } from './hooks/useShowMoreContent'
import { sanitizeHTML } from 'common/util/htmlSanitizer'
import { QuillStypeWrapper } from 'components/common/QuillStyleWrapper'

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

  [`& .${classes.articleDescription}`]: {
    margin: 0,
  },
}))

type Props = {
  articles: CampaignNewsResponse[] | []
}

export default function CampaignNewsList({ articles }: Props) {
  const { t, i18n } = useTranslation('news')
  const CHARACTER_LIMIT = 350
  const [isExpanded, expandContent] = useShowMoreContent()

  return (
    <>
      {articles?.map((article, index) => {
        const documents = GetArticleDocuments(article.newsFiles)
        const images = GetArticleGalleryPhotos(article.newsFiles)
        const sanitizedDescription = sanitizeHTML(article.description)
        return (
          <Grid
            container
            key={article.id}
            sx={{
              backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#E3E3E3',
              borderBottom: 1,
              borderColor: index % 2 === 0 ? '#FFFFFF' : '#C4C4C4',
            }}>
            <ArticleSection>
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
              <Grid container rowGap={1} columnGap={4}>
                <Grid
                  container
                  item
                  direction={'column'}
                  gap={1}
                  xs={'auto'}
                  style={{ maxWidth: '100%' }}>
                  <Typography className={classes.articleHeader}>{article.title}</Typography>
                  <QuillStypeWrapper>
                    {!isExpanded[article.id] && sanitizedDescription.length > CHARACTER_LIMIT ? (
                      <Typography
                        component={'div'}
                        className={classes.articleDescription}
                        dangerouslySetInnerHTML={{
                          __html: sanitizedDescription.slice(0, CHARACTER_LIMIT) + '...',
                        }}
                      />
                    ) : (
                      <Typography
                        component={'div'}
                        className={classes.articleDescription}
                        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                      />
                    )}
                    {sanitizedDescription.length > CHARACTER_LIMIT && (
                      <Button
                        className={classes.readMoreButton}
                        onClick={() => expandContent(article.id)}>
                        {!isExpanded[article.id] ? `${t('read-more')} >` : `${t('read-less')} <`}
                      </Button>
                    )}
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
            </ArticleSection>
          </Grid>
        )
      })}
    </>
  )
}
