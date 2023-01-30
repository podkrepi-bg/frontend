import { useEffect, useState } from 'react'
import { Box, Typography, Alert, ListItem, List, ListItemText, SxProps } from '@mui/material'
import { useFormikContext } from 'formik'
import { useSession } from 'next-auth/react'

import {
  DonationFormDataAuthState,
  DonationFormDataV2,
} from 'components/donation-flow/helpers/types'
import theme from 'common/theme'
import EmailField from 'components/common/form/EmailField'

import RadioAccordionGroup from '../../common/RadioAccordionGroup'
import InlineLoginForm from './InlineLoginForm'
import InlineRegisterForm from './InlineRegisterForm'

export default function Authentication({
  sectionRef,
}: {
  sectionRef: React.MutableRefObject<HTMLDivElement | null>
}) {
  const { data: session } = useSession()
  const {
    values: { authentication },
    setFieldValue,
  } = useFormikContext<DonationFormDataV2>()

  useEffect(() => {
    if (session?.user) {
      setFieldValue('authentication', DonationFormDataAuthState.AUTHENTICATED)
    }
  }, [session?.user])

  const liSx: SxProps = {
    py: 0,
  }

  const [showMobileAlert, setShowMobileAlert] = useState(true)

  const options = [
    {
      value: DonationFormDataAuthState.LOGIN,
      label: 'Login',
      disabled: Boolean(session?.user),
      content: (
        <Box>
          {showMobileAlert ? (
            <Alert
              onClose={() => {
                setShowMobileAlert(false)
              }}
              color="info"
              icon={false}
              sx={{ mx: -2, sx: {} }}>
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
            </Alert>
          ) : null}
          <InlineLoginForm />
        </Box>
      ),
    },
    {
      value: DonationFormDataAuthState.REGISTER,
      label: 'Register',
      disabled: Boolean(session?.user),
      content: (
        <Box>
          {showMobileAlert ? (
            <Alert
              onClose={() => {
                setShowMobileAlert(false)
              }}
              color="info"
              icon={false}
              sx={{ mx: -2, sx: {} }}>
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
            </Alert>
          ) : null}
          <InlineRegisterForm />
        </Box>
      ),
    },
    {
      value: DonationFormDataAuthState.NOREGISTER,
      label: 'Continue without registration',
      disabled: Boolean(session?.user),
      content: (
        <Box>
          <Alert color="info">
            Ако не се регистрирате, ще получите само разписка, без сертификат за дарение, който да
            използвате за данъчни облекчения.
          </Alert>
          <EmailField label="Email" name="email" sx={{ mb: 1 }} />
        </Box>
      ),
    },
  ]

  return (
    <Box ref={sectionRef} component="section" id="select-authentication">
      <Typography mb={3} variant="h5">
        Как предпочитате да продължите?
      </Typography>
      {authentication === DonationFormDataAuthState.AUTHENTICATED ? (
        <Alert color="info">Вие сте влезли в системата като {session?.user?.email}</Alert>
      ) : (
        <>
          <RadioAccordionGroup
            sx={{ marginBottom: theme.spacing(2) }}
            name="authentication"
            options={options}
          />
        </>
      )}
    </Box>
  )
}
