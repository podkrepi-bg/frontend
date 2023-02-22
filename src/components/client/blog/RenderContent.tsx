import { Box, Typography } from '@mui/material'

type Props = {
  html?: string | null
}
export default function RenderContent({ html }: Props) {
  if (!html) return null
  return (
    <Box
      sx={{
        a: { color: 'primary.main' },
        hr: {
          my: 5,
          width: '8rem',
          borderTop: '1px solid #ddd',
        },
        img: {
          my: 4,
          width: '100%',
          maxHeight: '35rem',
          objectFit: 'contain',
        },
      }}>
      <Typography
        component="div"
        variant="body2"
        sx={{ fontSize: (theme) => theme.typography.pxToRem(18) }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Box>
  )
}
