import React from 'react'
import truncate from 'lodash.truncate'
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
import { formatDateString } from 'common/util/date'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
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
} from '@mui/material'
import { useUserDonations } from 'common/hooks/donation'
import TableContainer from '@mui/material/TableContainer'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

import ProfileTab from './ProfileTab'
import { ProfileTabs } from './tabs'
import theme from 'common/theme'
import { darken } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { useCampaignList } from 'common/hooks/campaigns'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import { useCurrentPerson } from 'common/util/useCurrentPerson'
import { DatePicker } from '@mui/lab'

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
  const { t } = useTranslation()
  const { data: user } = useCurrentPerson()
  const { data: userDonations, isLoading: isUserDonationLoading } = useUserDonations()
  const { data: campaigns, isLoading: isCampaignLoading } = useCampaignList()
  const [fromDate, setFromDate] = React.useState(null)
  const [toDate, setToDate] = React.useState(null)
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
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={8}>
          {!isUserDonationLoading && userDonations ? (
            <Card className={classes.donationsBox}>
              <Box className={classes.donationsBoxRow}>
                <Typography fontWeight="medium" variant="h5">
                  {t('auth:profile.donations.totalDonations')}
                </Typography>
                <Typography fontWeight="medium" variant="h5">
                  {userDonations.total} {t('auth:profile.donations.lv')}
                </Typography>
              </Box>
              <Box className={classes.donationsBoxRow}>
                <Box>
                  <Typography variant="h5">
                    {t('auth:profile.donations.recurringDonations')}
                  </Typography>
                  <Typography>Я, Ф, М, А 2022</Typography>
                </Box>
                <Typography fontWeight="medium" variant="h5">
                  {userDonations.donations[0].amount} {t('auth:profile.donations.lv')}
                </Typography>
              </Box>
              <Box className={classes.donationsBoxRow}>
                <Typography variant="h5">{t('auth:profile.donations.cardDonations')}</Typography>
                <Typography fontWeight="medium" variant="h5">
                  {userDonations.total} {t('auth:profile.donations.lv')}
                </Typography>
              </Box>
              <Box className={classes.donationsBoxRow}>
                <Typography variant="h5">{t('auth:profile.donations.bankDonations')}</Typography>
                <Typography fontWeight="medium" variant="h5">
                  {userDonations.total} {t('auth:profile.donations.lv')}
                </Typography>
              </Box>
            </Card>
          ) : (
            <CircularProgress />
          )}
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ padding: theme.spacing(2) }}>
            <Grid container alignItems={'flex-start'} spacing={theme.spacing(2)}>
              <Grid item xs={6} sm={3}>
                <CheckboxLabel>{t('auth:profile.donations.oneTime')}</CheckboxLabel>
                <Checkbox name="oneTime" />
              </Grid>
              <Grid item xs={6} sm={3}>
                <CheckboxLabel>{t('auth:profile.donations.monthly')}</CheckboxLabel>
                <Checkbox name="monthly" />
              </Grid>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
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
            {userDonations?.donations.length ? (
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
                    {userDonations.donations.map((donation, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell>{formatDateString(donation.createdAt)}</TableCell>
                        <TableCell>
                          <Avatar sx={{ background: darken(theme.palette.secondary.main, 0.175) }}>
                            <StarIcon />
                          </Avatar>
                        </TableCell>
                        <TableCell>{donation.targetVault.campaign.title}</TableCell>
                        <TableCell>
                          {donation.amount} {donation.currency}
                        </TableCell>
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
