import { useTranslation } from 'next-i18next'
import { Box, List, ListItem, ListItemText, SxProps, Typography } from '@mui/material'

export const AuthenticateAlertContent = () => {
  const { t } = useTranslation('donation-flow')

  const liSx: SxProps = {
    '& .MuiTypography-root': {
      fontSize: '1rem',
      fontStyle: 'italic',
    },
    p: 0,
  }

  return (
    <Box paddingRight={2} paddingLeft={2} sx={liSx}>
      <Typography>{t('step.authentication.alert.authenticate.title')}:</Typography>
      <List
        sx={{
          listStyleType: 'disc',
          pl: 4,
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

export const NoRegisterContent = () => {
  const { t } = useTranslation('donation-flow')
  return (
    <Typography
      paddingRight={1}
      paddingLeft={2}
      fontSize={16}
      fontStyle={'italic'}
      fontWeight={400}>
      {t('step.authentication.noregister.description')}
    </Typography>
  )
}
