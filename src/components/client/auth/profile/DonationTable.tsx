import {
  Card,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
  Grid,
  Table,
  TableRow,
  Button,
  Link,
  Box,
} from '@mui/material'

import React, { useMemo } from 'react'
import { bg, enUS } from 'date-fns/locale'
import { useTranslation } from 'next-i18next'
import { isAfter, isBefore, parseISO } from 'date-fns'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'

import theme from 'common/theme'
import { money } from 'common/util/money'
import { UserDonation } from 'gql/donations'
import { routes } from 'common/routes'
import { getExactDateTime } from 'common/util/date'

export type DonationTableProps = {
  donations: UserDonation[] | undefined
}

function DonationTable({ donations }: DonationTableProps) {
  const { t, i18n } = useTranslation()
  const [fromDate, setFromDate] = React.useState<Date | null>(null)
  const [toDate, setToDate] = React.useState<Date | null>(null)

  const filteredDonations = useMemo(() => {
    if (!fromDate && !toDate) {
      return donations
    }
    if (fromDate && toDate) {
      return donations?.filter((d) => {
        const createdAtDate = parseISO(d.createdAt)
        return isAfter(createdAtDate, fromDate) && isBefore(createdAtDate, toDate)
      })
    }
    if (fromDate) {
      return donations?.filter((d) => {
        const createdAtDate = parseISO(d.createdAt)
        return isAfter(createdAtDate, fromDate)
      })
    }
    if (toDate) {
      return donations?.filter((d) => {
        const createdAtDate = parseISO(d.createdAt)
        return isBefore(createdAtDate, toDate)
      })
    }
  }, [donations, fromDate, toDate])

  return (
    <Card sx={{ padding: theme.spacing(2), boxShadow: theme.shadows[0] }}>
      <Grid container alignItems={'flex-start'} spacing={theme.spacing(2)}>
        <LocalizationProvider
          adapterLocale={i18n.language === 'bg' ? bg : enUS}
          dateAdapter={AdapterDateFns}>
          <Grid item xs={12} sm={3}>
            <DateTimePicker
              label={t('profile:donations.fromDate')}
              value={fromDate}
              onChange={setFromDate}
              renderInput={(params) => <TextField size="small" {...params} />}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <DateTimePicker
              label={t('profile:donations.toDate')}
              value={toDate}
              onChange={setToDate}
              renderInput={(params) => <TextField size="small" {...params} />}
            />
          </Grid>
        </LocalizationProvider>
      </Grid>
      {filteredDonations?.length ? (
        <TableContainer>
          <Table sx={{ minWidth: 650, backgroundColor: 'white' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{t('profile:donations.date')}</TableCell>
                <TableCell>{t('profile:donations.status.header')}</TableCell>
                <TableCell>{t('profile:donations.sort')}</TableCell>
                <TableCell>{t('profile:donations.cause')}</TableCell>
                <TableCell>{t('profile:donations.amount')}</TableCell>
                <TableCell>{t('profile:donations.certificate')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDonations.map((donation, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{getExactDateTime(donation.createdAt)}</TableCell>
                  <TableCell>{`${t('profile:donations.status.' + donation.status)}`}</TableCell>
                  <TableCell>{donation.provider}</TableCell>
                  <TableCell>
                    <Link
                      target="_blank"
                      href={routes.campaigns.viewCampaignBySlug(
                        donation.targetVault.campaign.slug,
                      )}>
                      {donation.targetVault.campaign.title}
                    </Link>{' '}
                  </TableCell>
                  <TableCell>{money(donation.amount)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      disabled={donation.status !== 'succeeded'}
                      endIcon={<ArrowForwardIcon />}>
                      <Link
                        sx={{ color: donation.status !== 'succeeded' ? 'inherit' : '#32A9FE' }}
                        target="_blank"
                        href={routes.donation.viewCertificate(donation.id)}>
                        {t('profile:donations.download')}
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{ fontSize: 20, mt: 4 }}>{t('profile:donations.noDonations')}</Box>
      )}
    </Card>
  )
}

export default DonationTable
