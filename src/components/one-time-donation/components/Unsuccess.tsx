import {
  Checkbox,
  Collapse,
  Grid,
  List,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Stack,
  RadioGroup,
  Radio,
} from '@mui/material'
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material'
import SubmitButton from 'components/common/form/SubmitButton'
import Link from 'components/common/Link'
import React, { useState } from 'react'
import SubMenu from './Submenu'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { createStyles, makeStyles } from '@mui/styles'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

const useStyles = makeStyles(() =>
  createStyles({
    h2: {
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '32px',
      lineHeight: '120%',
      marginTop: '47.25px',
      marginBottom: '59px',
      letterSpacing: '-0.5px',
      color: '#343434',
    },
    buttons: {
      width: '309.55px',
      height: '70.69px',
      background: '#32A9FE',
      border: '0.7441px solid #000000',
      boxSizing: 'border-box',
      borderRadius: '35.3275px',
      margin: 10,
    },
  }),
)
export default function Unsuccess() {
  const classes = useStyles()

  return (
    <Grid>
      <Grid
        container
        justifyContent="center"
        sx={{ '& .MuiSvgIcon-root': { fontSize: 132.5, color: '#F44336', marginTop: '58px' } }}>
        <ErrorOutlineOutlinedIcon />
      </Grid>
      <Grid container justifyContent="center">
        <Typography className={classes.h2}>За съжаление, възникна проблем!</Typography>
      </Grid>
      <Grid container justifyContent="center">
        <Typography>
          Трансакцията не можа да бъде осъществена. Причините могат да бъдат няколко, включително
          проблем с Вашата интернет връзка.
        </Typography>
      </Grid>
      <Grid container display="flex" justifyContent="center">
        <Button className={classes.buttons}>ОПИТАЙТЕ ПАК</Button>
        <Button className={classes.buttons}>ПИШЕТЕ НИ</Button>
      </Grid>
    </Grid>
  )
}
