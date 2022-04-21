import {
  Card,
  Checkbox,
  darken,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
  Grid,
  Table,
  TableRow,
  Avatar,
  Button,
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { money } from 'common/util/money'
import { format, isAfter, isBefore, parseISO } from 'date-fns'
import React, { useEffect, useMemo, useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useTranslation } from 'next-i18next'
import { UserDonation } from 'gql/donations'
import theme from 'common/theme'
import { bg, enUS } from 'date-fns/locale'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import styled from '@emotion/styled'
import { Box } from '@mui/system'

export type DonationTableProps = {
  donations: UserDonation[] | undefined
}
const CheckboxLabel = styled.label``
function DonationTable({ donations }: DonationTableProps) {
  const { t, i18n } = useTranslation()
  const [fromDate, setFromDate] = React.useState<Date | null>(null)
  const [toDate, setToDate] = React.useState<Date | null>(null)
  const [monthly, setMonthly] = React.useState(true)
  const [oneTime, setOneTime] = React.useState(true)
  const filteredByTypeDonations = useMemo(() => {
    if (monthly && oneTime) {
      return donations
    }
    if (!monthly && !oneTime) {
      return []
    }
    if (monthly) {
      return donations?.filter((d) => d.type !== 'donation')
    }
    if (oneTime) {
      return donations?.filter((d) => d.type === 'donation')
    }
    return donations
  }, [donations, monthly, oneTime])
  const filteredDonations = useMemo(() => {
    if (!fromDate && !toDate) {
      return filteredByTypeDonations
    }
    if (fromDate && toDate) {
      return filteredByTypeDonations?.filter((d) => {
        const createdAtDate = parseISO(d.createdAt)
        return isAfter(createdAtDate, fromDate) && isBefore(createdAtDate, toDate)
      })
    }
    if (fromDate) {
      return filteredByTypeDonations?.filter((d) => {
        const createdAtDate = parseISO(d.createdAt)
        return isAfter(createdAtDate, fromDate)
      })
    }
    if (toDate) {
      return filteredByTypeDonations?.filter((d) => {
        const createdAtDate = parseISO(d.createdAt)
        return isBefore(createdAtDate, toDate)
      })
    }
  }, [filteredByTypeDonations, fromDate, toDate])
  return (
    <Card sx={{ padding: theme.spacing(2) }}>
      <Grid container alignItems={'flex-start'} spacing={theme.spacing(2)}>
        <Grid item xs={6} sm={3}>
          <CheckboxLabel>{t('profile:donations.oneTime')}</CheckboxLabel>
          <Checkbox
            onChange={(e, checked) => {
              setOneTime(checked)
            }}
            checked={oneTime}
            name="oneTime"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <CheckboxLabel>{t('profile:donations.monthly')}</CheckboxLabel>
          <Checkbox
            onChange={(e, checked) => {
              setMonthly(checked)
            }}
            checked={monthly}
            name="monthly"
          />
        </Grid>
        <LocalizationProvider
          locale={i18n.language === 'bg' ? bg : enUS}
          dateAdapter={AdapterDateFns}>
          <Grid item xs={12} sm={3}>
            <DatePicker
              label={t('profile:donations.fromDate')}
              value={fromDate}
              onChange={setFromDate}
              renderInput={(params) => <TextField size="small" {...params} />}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <DatePicker
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
                <TableCell>№</TableCell>
                <TableCell>{t('profile:donations.date')}</TableCell>
                <TableCell>{t('profile:donations.type')}</TableCell>
                <TableCell>{t('profile:donations.cause')}</TableCell>
                <TableCell>{t('profile:donations.amount')}</TableCell>
                <TableCell>{t('profile:donations.certificate')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDonations.map((donation, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    {format(parseISO(donation.createdAt), 'd.LL.yyyy', {
                      locale: i18n.language === 'bg' ? bg : enUS,
                    })}
                  </TableCell>
                  <TableCell>
                    <Avatar sx={{ background: darken(theme.palette.secondary.main, 0.175) }}>
                      <StarIcon />
                    </Avatar>
                  </TableCell>
                  <TableCell>{donation.targetVault.campaign.title}</TableCell>
                  <TableCell>{money(donation.amount)}</TableCell>
                  <TableCell>
                    <Button variant="outlined">
                      {t('profile:donations.download')} <ArrowForwardIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{ fontSize: 20, mt: 4 }}>Към момента няма направени дарения</Box>
      )}
    </Card>
  )
}

export default DonationTable
