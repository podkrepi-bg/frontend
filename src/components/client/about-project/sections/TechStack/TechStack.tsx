import { useTranslation } from 'next-i18next'

import { Grid } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'

import { data } from '../../helpers/technologyStackData'

import { CategoryTitle, CategoryWrapper, Root, TechnologyItem } from './TechStack.styled'
import { Heading } from 'components/client/about-project/AboutProject.styled'

export default function TechStack() {
  const { t } = useTranslation()

  return (
    <Root>
      <Heading variant="h3">{t('about-project:tech-stack.title')}</Heading>
      <Grid container direction="column" component="section" justifyContent="center">
        {data.map(({ icon: Icon, label, items }, section: number) => (
          <CategoryWrapper item xs={12} sm={8} key={section}>
            <Grid container justifyContent="center" gap="5px">
              <Icon color="action" />
              <CategoryTitle variant="subtitle1">{label}</CategoryTitle>
            </Grid>
            <Grid item xs={12} md={6} component="ul" margin="0 auto">
              {items.map((line: string, key: number) => (
                <TechnologyItem key={key}>
                  <CheckIcon />
                  {t(line)}
                </TechnologyItem>
              ))}
            </Grid>
          </CategoryWrapper>
        ))}
      </Grid>
    </Root>
  )
}
