import { Grid2, Typography } from '@mui/material'

import theme from 'common/theme'

type RemarkProps = {
  text: string
}

const textStyles = {
  fontSize: theme.typography.pxToRem(13),
  marginTop: '100px',
}

export default function Remark({ text }: RemarkProps) {
  return (
    <Grid2 size={12}>
      <Typography variant="body1" sx={textStyles}>
        {text}
      </Typography>
    </Grid2>
  )
}
