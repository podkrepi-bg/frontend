import React from 'react'
import { AlertProps, Box, List, ListItem, ListItemText, SxProps, Typography } from '@mui/material'
import { useFormikContext } from 'formik'
import { AnchoredAlert } from './AnchoredAlert'
import {
  DonationFormDataAuthState,
  DonationFormDataPaymentOption,
  DonationFormDataV2,
} from '../helpers/types'

const cardAlertDescription = `Таксата на Stripe се изчислява според района на картодържателя: 1.2% + 0.5лв. за Европейската икономическа зона`
const bankAlertDescription = `Таксата за транзакция при банков превод зависи от индивидуалните условия на Вашата банка. от (0-4лв)`

const paymentMethodAlertMap = {
  [DonationFormDataPaymentOption.CARD]: cardAlertDescription,
  [DonationFormDataPaymentOption.BANK]: bankAlertDescription,
}

function AlertsColumn({
  sectionsRefArray,
}: {
  sectionsRefArray: React.MutableRefObject<HTMLDivElement | null>[]
}) {
  const {
    values: { payment, authentication },
  } = useFormikContext<DonationFormDataV2>()

  const liSx: SxProps = {
    py: 0,
  }

  const alerts: { [key: string]: AlertProps } = {
    'select-payment-method': {
      color: 'info',
      children: <Typography>{payment && paymentMethodAlertMap[payment]}</Typography>,
      icon: false,
      sx: {
        display: payment ? 'flex' : 'none',
      },
    },
    'select-authentication': {
      color: 'info',
      children: (
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
      ),
      icon: false,
      sx: {
        display: authentication === DonationFormDataAuthState.AUTHENTICATED ? 'none' : 'flex',
      },
    },
  }

  return (
    <>
      {sectionsRefArray.map((ref, index) => {
        const alert = alerts[ref.current?.id as keyof typeof alerts]
        return <AnchoredAlert key={index} sectionRef={ref} {...alert} />
      })}
    </>
  )
}

export default AlertsColumn
