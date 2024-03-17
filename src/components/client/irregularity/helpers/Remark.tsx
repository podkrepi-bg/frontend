import { Grid, Typography } from '@mui/material'

type RemarkProps = {
  text: string
}

const textStyles = {
  fontSize: theme.typography.pxToRem(13),
  marginTop: '100px',
}

export default function Remark({ text }: RemarkProps) {
  return (
    <Grid item xs={12}>
      <Typography variant="body1" sx={textStyles}>
        {text}
      </Typography>
    </Grid>
  )
}
