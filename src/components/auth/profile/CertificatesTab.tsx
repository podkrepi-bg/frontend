import Tab from './Tab'
import { Box, Checkbox, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { formatDateString } from 'common/util/date'
import Avatar from '@mui/material/Avatar'
import StarIcon from '@mui/icons-material/Star'
import React from 'react'
import { useUserDonations } from 'common/hooks/donation'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
const useStyles = makeStyles({
  h3: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '25px',
    lineHeight: '116.7%',
    margin: '0',
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
  smallText: {
    fontFamily: 'Lato, sans-serif',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '160%',
    letterSpacing: '0.15px',
  },
})

function CertificatesTab(props: { value: number; index: number }) {
  const { value, index } = props
  const classes = useStyles()
  const { data = { donations: [], total: 0 } } = useUserDonations()
  const [fromDate, setFromDate] = React.useState(new Date())
  const [toDate, setToDate] = React.useState(new Date())

  return (
    <Tab value={value} index={index}>
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '10px 30px',
          margin: '10px 0 0 0',
        }}>
        <h3 className={classes.h3}>История на сертификати</h3>
      </Box>
      <Box
        sx={{
          backgroundColor: 'white',
          flexGrow: 1,
          padding: '10px 30px',
        }}>
        <Box>
          <h3 className={classes.thinFont}>Онлайн дарения</h3>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}>
          <span className={classes.smallText}>Покажи:</span>
          <Box>
            <Checkbox defaultChecked />
            <span className={classes.smallText}>еднократни</span>
          </Box>
          <Box>
            <Checkbox defaultChecked />
            <span className={classes.smallText}>месечни</span>
          </Box>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <span className={classes.smallText}>от дата</span>
            <DesktopDatePicker
              label="от дата"
              inputFormat="MM/dd/yyyy"
              value={fromDate}
              onChange={(date) => setFromDate(date as Date)}
              renderInput={(params) => <TextField {...params} />}
            />
            <span className={classes.smallText}>до дата</span>
            <DesktopDatePicker
              label="до дата"
              inputFormat="MM/dd/yyyy"
              value={toDate}
              onChange={(date) => setToDate(date as Date)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        {data.donations.length ? (
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
                {data.donations.map((donation, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>{formatDateString(donation.createdAt)}</TableCell>
                    <TableCell>
                      <Avatar sx={{ background: '#F6992B' }}>
                        <StarIcon></StarIcon>
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
        ) : (
          <h3 className={classes.h3}>Към момента няма направени дарения</h3>
        )}
      </Box>
    </Tab>
  )
}

export default CertificatesTab
