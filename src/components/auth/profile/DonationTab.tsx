import React from 'react'
import truncate from 'lodash.truncate'
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
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

import ProfileTab from './ProfileTab'
import { ProfileTabs } from './tabs'
import theme from 'common/theme'
import { useTranslation } from 'next-i18next'
import { useCampaignList } from 'common/hooks/campaigns'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import { useCurrentPerson } from 'common/util/useCurrentPerson'

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
  thinFont: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '24px',
    lineHeight: '123.5%',
    letterSpacing: '0.25px',
    color: '#000000',
    margin: 0,
  },
  h3: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '25px',
    lineHeight: '116.7%',
    margin: '0',
  },
  donates: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  h5: {
    fontFamily: 'Lato, sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '22px',
    lineHeight: '133.4%',
    color: '#000000',
  },
  smallText: {
    fontFamily: 'Lato, sans-serif',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '15px',
    lineHeight: '160%',
    letterSpacing: '0.15px',
  },
})

export default function DonationTab() {
  const classes = useStyles()
  const { t } = useTranslation()
  const { data: user } = useCurrentPerson()
  const { data: userDonations, isLoading: isUserDonationLoading } = useUserDonations()
  const { data: campaigns, isLoading: isCampaignLoading } = useCampaignList()
  const [fromDate, setFromDate] = React.useState(new Date())
  const [toDate, setToDate] = React.useState(new Date())
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
          {userDonations?.donations.length ? (
            <Card>
              <TableContainer>
                <Table sx={{ minWidth: 650, backgroundColor: 'white' }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>№</TableCell>
                      <TableCell>Дата</TableCell>
                      <TableCell>Вид</TableCell>
                      <TableCell>Кауза</TableCell>
                      <TableCell>стойност</TableCell>
                      <TableCell>сертификат</TableCell>
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
                          <Avatar sx={{ background: '#F6992B' }}>
                            <StarIcon />
                          </Avatar>
                        </TableCell>
                        <TableCell>{donation.targetVault.campaign.title}</TableCell>
                        <TableCell>
                          {donation.amount} {donation.currency}
                        </TableCell>
                        <TableCell>
                          <Button variant="outlined">
                            Свали <ArrowForwardIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          ) : (
            <Box sx={{ fontSize: 20, mt: 4 }}>Към момента няма направени дарения</Box>
          )}
        </Grid>
      </Grid>
    </ProfileTab>
  )
}
