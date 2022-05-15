import { Container, Grid } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'next-i18next'
import LinkButton from 'components/common/LinkButton'
import { routes } from 'common/routes'
import * as data from '../../faq/contents'

import Heading from 'components/common/Heading'
import ExpandableListItem from 'components/faq/ExpandableListItem'

export default function FaqSection() {
  const { t } = useTranslation()

  return (
    <Container maxWidth="lg">
      <Heading
        id="what-we-do"
        variant="h4"
        component="h2"
        sx={(theme) => ({ pb: 10, color: theme.palette.primary.dark, textAlign: 'center' })}>
        {t('common:nav.campaigns.faq')}
      </Heading>
      <Grid container justifyContent="center" spacing={2} sx={{ mb: 12 }}>
        {data.COMMON_QUESTIONS.slice(0, 3).flatMap(({ header, content, visible }) =>
          visible ? (
            <Grid item xs={12} key={header}>
              <ExpandableListItem header={header} content={content} />
            </Grid>
          ) : (
            []
          ),
        )}
        <LinkButton
          href={routes.faq}
          variant="outlined"
          endIcon={<ChevronRightIcon />}
          sx={{ my: 4 }}>
          {t('index:campaign.see-all')}
        </LinkButton>
      </Grid>
    </Container>
  )
}
