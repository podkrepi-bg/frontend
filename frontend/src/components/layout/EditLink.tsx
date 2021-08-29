import { Box, Button } from '@material-ui/core'
import { GitHub } from '@material-ui/icons'
import { useTranslation } from 'next-i18next'

type Props = { link: string }
export default function EditLink({ link }: Props) {
  const { t } = useTranslation()
  return (
    <Box textAlign="center" margin={2} position="absolute" right="0" top="7rem">
      <Button
        href={link}
        size="small"
        variant="text"
        target="_blank"
        rel="noreferrer noopener"
        endIcon={<GitHub fontSize="small" />}>
        {t('edit-page')}
      </Button>
    </Box>
  )
}
