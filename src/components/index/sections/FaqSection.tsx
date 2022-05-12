import { Container, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useTranslation } from 'next-i18next'
import theme from 'common/theme'
import LinkButton from 'components/common/LinkButton'
import { routes } from 'common/routes'
import * as data from '../../faq/contents'

import Heading from 'components/common/Heading'
import ExpandableListItem from 'components/faq/ExpandableListItem'

const PREFIX = 'FaqSection'

const classes = {
  heading: `${PREFIX}-heading`,
  container: `${PREFIX}-container`,
  graphic: `${PREFIX}-graphic`,
}

const StyledContainer = styled(Container)(({ theme }) => ({
  [`& .${classes.heading}`]: {
    paddingBottom: theme.spacing(10),
    color: theme.palette.primary.dark,
    textAlign: 'center',
    fontFamily: 'Montserrat',
  },

  [`& .${classes.container}`]: {
    marginBottom: theme.spacing(12),
  },

  [`& .${classes.graphic}`]: {
    marginTop: theme.spacing(5),
  },
}))

export default function FaqSection() {
  const { t } = useTranslation()

  return (
    <StyledContainer maxWidth="md">
      <Heading id="what-we-do" variant="h4" component="h2" className={classes.heading}>
        {t('common:nav.campaigns.faq')}
      </Heading>
      <Grid container justifyContent="center" spacing={2} className={classes.container}>
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
          sx={{ marginY: theme.spacing(2) }}>
          {t('index:campaign.see-all')}
        </LinkButton>
      </Grid>
    </StyledContainer>
  )
}
