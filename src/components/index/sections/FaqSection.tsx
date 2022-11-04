import { Container, Grid } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'next-i18next'
import { routes } from 'common/routes'
import * as data from '../../faq/contents'
import theme from 'common/theme'

import Heading from 'components/common/Heading'
import ExpandableListItem from 'components/faq/ExpandableListItem'
import { OutlinedButton } from '../IndexPage.styled'

export default function FaqSection() {
  const { t } = useTranslation()

  return (
    <Container component="section" maxWidth="lg" style={{ padding: theme.spacing(0, 3) }}>
      <Heading variant="h4" component="h2">
        {t('common:nav.campaigns.faq')}
      </Heading>
      <Grid container justifyContent="center" spacing={2} sx={{ mb: 12 }}>
        {data.COMMON_QUESTIONS.slice(0, 5).flatMap(({ header, content, visible }) =>
          visible ? (
            <Grid item xs={12} key={header}>
              <ExpandableListItem header={header} content={content} />
            </Grid>
          ) : (
            []
          ),
        )}
        <Grid>
          <OutlinedButton href={routes.faq} variant="outlined" endIcon={<ChevronRightIcon />}>
            {t('index:campaign.see-all')}
          </OutlinedButton>
        </Grid>
      </Grid>
    </Container>
  )
}
