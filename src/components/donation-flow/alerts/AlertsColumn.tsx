import React from 'react'
import { useSession } from 'next-auth/react'
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { useFormikContext } from 'formik'
import { AnchoredAlert, AnchoredAlertProps } from './AnchoredAlert'
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

  const alerts: Omit<AnchoredAlertProps, 'sectionRef'>[] = [
    {
      color: 'info',
      children: <Typography>Amount selected is wrong</Typography>,
    },
    {
      color: 'info',
      children: <Typography>{payment && paymentMethodAlertMap[payment]}</Typography>,
      icon: false,
      hidden: !payment,
    },
    {
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
            <ListItem>
              <ListItemText primary="създадете акаунт като физическо или юридическо лице" />
            </ListItem>
            <ListItem>
              <ListItemText primary="получите сертификат за дарение" />
            </ListItem>
            <ListItem>
              <ListItemText primary="правите месечни дарения по избрана кампания" />
            </ListItem>
            <ListItem>
              <ListItemText primary="получавате и известия за статуса на подкрепени вече кампании" />
            </ListItem>
          </List>
        </Box>
      ),
      icon: false,
      hidden: authentication === DonationFormDataAuthState.AUTHENTICATED,
    },
  ]

  return (
    <>
      {sectionsRefArray.map((ref, index) => {
        return <AnchoredAlert key={index} sectionRef={ref} {...alerts[index]} />
      })}
    </>
  )
}

export default AlertsColumn
