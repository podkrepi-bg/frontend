import React, { useEffect } from 'react'
import truncate from 'lodash.truncate'
import { parseISO, isBefore, isAfter, format } from 'date-fns'
import { bg, enUS } from 'date-fns/locale'
import styled from '@emotion/styled'
import { makeStyles } from '@mui/styles'
import Table from '@mui/material/Table'
import Avatar from '@mui/material/Avatar'
import TableRow from '@mui/material/TableRow'
import StarIcon from '@mui/icons-material/Star'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TextField from '@mui/material/TextField'
import {
  Box,
  Checkbox,
  Button,
  Grid,
  Card,
  Typography,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  CircularProgress,
  useMediaQuery,
} from '@mui/material'
import { useUserDonations } from 'common/hooks/donation'
import TableContainer from '@mui/material/TableContainer'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import ProfileTab from './ProfileTab'
import { ProfileTabs } from './tabs'
import theme from 'common/theme'
import { darken } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { useCampaignList } from 'common/hooks/campaigns'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import { useCurrentPerson } from 'common/util/useCurrentPerson'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { money } from 'common/util/money'

const useStyles = makeStyles({
  donationsBox: {
    padding: theme.spacing(5),
  },
  donationsBoxRow: {
    '&:first-child': {
      borderBottom: `1px solid ${theme.palette.divider}`,
      marginBottom: theme.spacing(5),
      paddingBottom: theme.spacing(3),
    },
    marginBottom: theme.spacing(5),
    display: 'flex',
    justifyContent: 'space-between',
  },
})

const CheckboxLabel = styled.label``
export default function DonationTab() {
  const classes = useStyles()
  const { t, i18n } = useTranslation()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const { data: user } = useCurrentPerson()
  const { data: userDonations, isLoading: isUserDonationLoading } = useUserDonations()
  const { data: campaigns, isLoading: isCampaignLoading } = useCampaignList()
  const [filteredDonations, setFilteredDonations] = React.useState(userDonations?.donations)
  const [fromDate, setFromDate] = React.useState<Date | null>(null)
  const [toDate, setToDate] = React.useState<Date | null>(null)
  const [monthly, setMonthly] = React.useState(true)
  const [oneTime, setOneTime] = React.useState(true)
  useEffect(() => {
    setFilteredDonations(userDonations?.donations)
  }, [userDonations])
  useEffect(() => {
    if (monthly && oneTime) {
      setFilteredDonations(userDonations?.donations)
      return
    }
    if (!monthly && !oneTime) {
      setFilteredDonations([])
    }
    if (monthly) {
      setFilteredDonations(userDonations?.donations?.filter((d) => d.type !== 'donation'))
    }
    if (oneTime) {
      setFilteredDonations(userDonations?.donations?.filter((d) => d.type === 'donation'))
    }
  }, [monthly, oneTime])
  useEffect(() => {
    if (!fromDate && !toDate) {
      setFilteredDonations(userDonations?.donations)
      return
    }
    if (fromDate && toDate) {
      setFilteredDonations(
        userDonations?.donations?.filter((d) => {
          const createdAtDate = parseISO(d.createdAt)
          return isAfter(createdAtDate, fromDate) && isBefore(createdAtDate, toDate)
        }),
      )
      return
    }
    if (fromDate) {
      setFilteredDonations(
        userDonations?.donations?.filter((d) => {
          const createdAtDate = parseISO(d.createdAt)
          return isAfter(createdAtDate, fromDate)
        }),
      )
      return
    }
    if (toDate) {
      setFilteredDonations(
        userDonations?.donations?.filter((d) => {
          const createdAtDate = parseISO(d.createdAt)
          return isBefore(createdAtDate, toDate)
        }),
      )
      return
    }
  }, [fromDate, toDate])
  return (
    <ProfileTab
      title={user?.user ? user.user.firstName + ' ' + user?.user.lastName : ''}
      name={ProfileTabs.donations}>
      <Typography variant="h5" fontWeight={'medium'}>
        {t('auth:profile.donations.helpThanks')} ❤️
      </Typography>
      <Grid
        container
        spacing={theme.spacing(2)}
        marginTop={theme.spacing(1)}
        alignItems={'flex-end'}>
        <Grid order={matches ? 3 : 1} item xs={12} md={4}>
          <Card>
            {!isCampaignLoading && campaigns ? (
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="193"
                  image={campaignListPictureUrl(campaigns[0])}
                  alt={campaigns[0].title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {campaigns[0].title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {truncate(campaigns[0].description, { length: 120 })}
                  </Typography>
                </CardContent>
              </CardActionArea>
            ) : (
              <CircularProgress />
            )}
            <CardActions>
              <Button variant="contained" size="medium" color="secondary">
                {t('auth:profile.donations.donateNow')} ❤️
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid order={matches ? 1 : 2} item xs={12} md={8}>
          {!isUserDonationLoading && userDonations ? (
            <Card className={classes.donationsBox}>
              <Box className={classes.donationsBoxRow}>
                <Typography fontWeight="medium" variant="h5">
                  {t('auth:profile.donations.totalDonations')}
                </Typography>
                <Typography fontWeight="medium" variant="h5">
                  {money(userDonations.total)}
                </Typography>
              </Box>
              <Box className={classes.donationsBoxRow}>
                <Box>
                  <Typography variant="h5">
                    {t('auth:profile.donations.recurringDonations')}
                  </Typography>
                  {/* TODO: Use date-fns to format and localize the months,
                   that the user has recurring donations when that is possible */}
                  <Typography>Я, Ф, М, А 2022</Typography>
                </Box>
                <Typography fontWeight="medium" variant="h5">
                  {money(userDonations.donations[0].amount)}
                </Typography>
              </Box>
              <Box className={classes.donationsBoxRow}>
                <Typography variant="h5">{t('auth:profile.donations.cardDonations')}</Typography>
                <Typography fontWeight="medium" variant="h5">
                  {money(userDonations.total)}
                </Typography>
              </Box>
              <Box className={classes.donationsBoxRow}>
                <Typography variant="h5">{t('auth:profile.donations.bankDonations')}</Typography>
                <Typography fontWeight="medium" variant="h5">
                  {money(userDonations.total)}
                </Typography>
              </Box>
            </Card>
          ) : (
            <CircularProgress />
          )}
        </Grid>
        <Grid order={matches ? 2 : 3} item xs={12}>
          <Card sx={{ padding: theme.spacing(2) }}>
            <Grid container alignItems={'flex-start'} spacing={theme.spacing(2)}>
              <Grid item xs={6} sm={3}>
                <CheckboxLabel>{t('auth:profile.donations.oneTime')}</CheckboxLabel>
                <Checkbox
                  onChange={(e, checked) => {
                    setOneTime(checked)
                  }}
                  checked={oneTime}
                  name="oneTime"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <CheckboxLabel>{t('auth:profile.donations.monthly')}</CheckboxLabel>
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
                    label={t('auth:profile.donations.fromDate')}
                    value={fromDate}
                    onChange={setFromDate}
                    renderInput={(params) => <TextField size="small" {...params} />}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <DatePicker
                    label={t('auth:profile.donations.toDate')}
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
                      <TableCell>{t('auth:profile.donations.date')}</TableCell>
                      <TableCell>{t('auth:profile.donations.type')}</TableCell>
                      <TableCell>{t('auth:profile.donations.cause')}</TableCell>
                      <TableCell>{t('auth:profile.donations.amount')}</TableCell>
                      <TableCell>{t('auth:profile.donations.certificate')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredDonations.map((donation, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                            {t('auth:profile.donations.download')} <ArrowForwardIcon />
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
        </Grid>
      </Grid>
    </ProfileTab>
  )
}
