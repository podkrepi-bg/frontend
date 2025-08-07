import { useTranslation } from 'next-i18next'

import { Grid2 } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import * as data from '../../../faq/contents'
import { routes } from 'common/routes'
import ExpandableListItem from 'components/client/faq/ExpandableListItem'

import { Heading, OutlinedButton } from '../../IndexPage.styled'
import { Root, FaqWrapper } from './FaqSection.styled'

export default function FaqSection() {
  const { t } = useTranslation()

  return (
    <Root>
      <Grid2 maxWidth="lg">
        <Heading variant="h4">{t('common:nav.campaigns.faq')}</Heading>
        <FaqWrapper container spacing={2}>
          {data.COMMON_QUESTIONS.slice(0, 5).flatMap(({ header, content, visible }) =>
            visible ? (
              <Grid2 key={header} size={12}>
                <ExpandableListItem header={header} content={content} />
              </Grid2>
            ) : (
              []
            ),
          )}
          <Grid2>
            <OutlinedButton
              href={routes.faq}
              variant="outlined"
              data-testid="faq-see-more-button"
              endIcon={<ChevronRightIcon />}>
              {t('index:campaign.see-all')}
            </OutlinedButton>
          </Grid2>
        </FaqWrapper>
      </Grid2>
    </Root>
  )
}
