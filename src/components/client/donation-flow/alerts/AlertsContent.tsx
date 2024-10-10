import { useTranslation } from 'next-i18next'
import { Box, List, ListItem, ListItemText, SxProps, Typography } from '@mui/material'

export const AuthenticateAlertContent = () => {
  const { t } = useTranslation('donation-flow')

  const liSx: SxProps = {
    '& .MuiTypography-root': {
      fontSize: '0.875rem',
    },
    p: 0,
  }

  return (
    <Box>
      <Typography>{t('step.authentication.alert.authenticate.title')}:</Typography>
      <List
        sx={{
          listStyleType: 'disc',
          pl: 2,
          '& .MuiListItem-root': {
            display: 'list-item',
          },
        }}>
        <ListItem sx={liSx}>
          <ListItemText primary={t('step.authentication.alert.authenticate.create-account')} />
        </ListItem>
        <ListItem sx={liSx}>
          <ListItemText primary={t('step.authentication.alert.authenticate.certificate')} />
        </ListItem>
        <ListItem sx={liSx}>
          <ListItemText primary={t('step.authentication.alert.authenticate.monthly-donation')} />
        </ListItem>
        <ListItem sx={liSx}>
          <ListItemText primary={t('step.authentication.alert.authenticate.notification')} />
        </ListItem>
      </List>
    </Box>
  )
}
