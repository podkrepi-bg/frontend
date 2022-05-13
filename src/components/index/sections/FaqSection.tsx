import { Container, Grid, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'next-i18next'
import theme from 'common/theme'
import LinkButton from 'components/common/LinkButton'
import { routes } from 'common/routes'
import * as data from '../../faq/contents'

import Heading from 'components/common/Heading'
import ExpandableListItem from 'components/faq/ExpandableListItem'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      paddingBottom: theme.spacing(10),
      color: theme.palette.primary.dark,
      textAlign: 'center',
      fontFamily: 'Montserrat',
    },
    container: {
      marginBottom: theme.spacing(12),
      padding: theme.spacing(0, 2),
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
    <Container maxWidth="lg">
      <Heading id="what-we-do" variant="h4" component="h2" className={classes.heading}>
        {t('common:nav.campaigns.faq')}
      </Heading>
      <Grid container justifyContent="center" spacing={2} className={classes.container}>
        {data.COMMON_QUESTIONS.slice(0, 3).flatMap(({ header, content, visible }) =>
          visible === true ? (
            <Grid item xs={12}>
              <ExpandableListItem key={header} header={header} content={content} />
            </Grid>
          ) : (
            []
          ),
        )}
        <LinkButton
          href={routes.faq}
          variant="outlined"
          endIcon={<ChevronRightIcon />}
          sx={{ marginTop: theme.spacing(4) }}>
          {t('index:campaign.see-all')}
        </LinkButton>
      </Grid>
    </Container>
  )
}
