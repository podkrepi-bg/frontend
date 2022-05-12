import { Grid, lighten, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'

import theme from 'common/theme'

const PREFIX = 'Title'

const classes = {
  subtitleText: `${PREFIX}-subtitleText`,
}

const StyledGrid = styled(Grid)(() => ({
  [`& .${classes.subtitleText}`]: {
    color: lighten(theme.palette.primary.dark, 0.1),
    width: '100%',
  },
}))

interface TitleProps {
  label: string
}

export default function Title({ label }: TitleProps) {
  const { t } = useTranslation()
  return (
    <StyledGrid item xs={12}>
      <Typography variant="h4" align="center">
        {t(label)}
      </Typography>
    </StyledGrid>
  )
}
