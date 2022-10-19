import { Container, Grid } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'next-i18next'
import LinkButton from 'components/common/LinkButton'
import { routes } from 'common/routes'
import * as data from '../../faq/contents'
import theme from 'common/theme'

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
        sx={(theme) => ({
          pb: 10,
          color: theme.palette.primary.dark,
          textAlign: 'center',
          fontWeight: 500,
        })}>
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
        <Grid item xs={12} textAlign="center">
          <LinkButton
            href={routes.faq}
            variant="outlined"
            sx={{
              marginTop: theme.spacing(5),
              fontWeight: 'bold',
              color: theme.palette.common.black,
              minWidth: { sm: theme.spacing(35) },
            }}
            endIcon={<ChevronRightIcon />}>
            {t('index:campaign.see-all')}
          </LinkButton>
        </Grid>
      </Grid>
    </Container>
  )
}
