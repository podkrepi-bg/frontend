import { Box, List, ListItem, ListItemText, SxProps, Typography } from '@mui/material'

export const AuthenticateAlertContent = () => {
  const liSx: SxProps = {
    '& .MuiTypography-root': {
      fontSize: '0.875rem',
    },
    p: 0,
  }

  return (
    <Box>
      <Typography>Избирайки да се впишете. ще можете да:</Typography>
      <List
        sx={{
          listStyleType: 'disc',
          pl: 2,
          '& .MuiListItem-root': {
            display: 'list-item',
          },
        }}>
        <ListItem sx={liSx}>
          <ListItemText primary="създадете акаунт като физическо или юридическо лице" />
        </ListItem>
        <ListItem sx={liSx}>
          <ListItemText primary="получите сертификат за дарение" />
        </ListItem>
        <ListItem sx={liSx}>
          <ListItemText primary="правите месечни дарения по избрана кампания" />
        </ListItem>
        <ListItem sx={liSx}>
          <ListItemText primary="получавате и известия за статуса на подкрепени вече кампании" />
        </ListItem>
      </List>
    </Box>
  )
}
