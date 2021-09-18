import { Box, Button } from '@material-ui/core'
import { GitHub, Web } from '@material-ui/icons'
import { useTranslation } from 'next-i18next'

type Props = {
  githubUrl: string
  figmaUrl: string
}

export default function ImproveThisPageTag({ githubUrl, figmaUrl }: Props) {
  const { t } = useTranslation()
  return (
    <Box textAlign="center" margin={2} position="absolute" right="0" top="7rem">
      {t('improve-this-page')}
      <Button
        href={githubUrl}
        size="small"
        variant="text"
        target="_blank"
        rel="noreferrer noopener"
        startIcon={<GitHub fontSize="small" />}>
        {t('github-link-text')}
      </Button>
      <Button
        href={figmaUrl}
        size="small"
        variant="text"
        target="_blank"
        rel="noreferrer noopener"
        startIcon={<Web fontSize="small" />}>
        {t('figma-link-text')}
      </Button>
    </Box>
  )
}
