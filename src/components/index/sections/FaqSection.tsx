import { Grid, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'next-i18next'
import LinkButton from 'components/common/LinkButton'
import { routes } from 'common/routes'
import * as data from '../../faq/contents'

import Heading from 'components/common/Heading'
import ExpandableListItem from 'components/faq/ExpandableListItem'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      paddingBottom: theme.spacing(7),
      color: theme.palette.primary.dark,
      textAlign: 'center',
    },
    container: {
      marginBottom: theme.spacing(12),
      textAlign: 'center',
    },
    graphic: {
      marginTop: theme.spacing(5),
    },
  }),
)

export default function FaqSection() {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <>
      <Heading id="what-we-do" variant="h5" component="h2" className={classes.heading}>
        {t('index:campaign.emergency-causes')}
      </Heading>
      <Grid container justifyContent="center" spacing={2}>
        {/* {data.COMMON_QUESTIONS.slice(0, 3).map((campaign, index) => (
        ))} */}
        {data.COMMON_QUESTIONS.slice(0, 3).flatMap(({ header, content, visible }) =>
          visible === true ? (
            <ExpandableListItem key={header} header={header} content={content} />
          ) : (
            []
          ),
        )}
        <LinkButton
          href={routes.faq}
          variant="outlined"
          endIcon={<ChevronRightIcon />}
          sx={{ marginTop: '10%' }}>
          {t('index:campaign.see-all')}
        </LinkButton>
      </Grid>
    </>
  )
}
