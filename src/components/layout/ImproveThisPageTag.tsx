import { useTranslation } from 'next-i18next'
import { GitHub, Web } from '@material-ui/icons'
import { Alert, AlertTitle } from '@material-ui/lab'
import { Box, Button, Container } from '@material-ui/core'

type Props = {
  githubUrl?: string
  figmaUrl?: string
}

export default function ImproveThisPageTag({ githubUrl, figmaUrl }: Props) {
  const { t } = useTranslation()
  if (!githubUrl && !figmaUrl) return null
  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Alert variant="outlined" color="info" severity="info">
          <AlertTitle>{t('improve-this-page')}</AlertTitle>
          {githubUrl && (
            <Button
              href={githubUrl}
              size="small"
              variant="text"
              target="_blank"
              rel="noreferrer noopener"
              startIcon={<GitHub fontSize="small" />}>
              {t('github-link-text')}
            </Button>
          )}
          {figmaUrl && (
            <Button
              href={figmaUrl}
              size="small"
              variant="text"
              target="_blank"
              rel="noreferrer noopener"
              startIcon={<Web fontSize="small" />}>
              {t('figma-link-text')}
            </Button>
          )}
        </Alert>
      </Box>
    </Container>
  )
}
