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

const useStyles = makeStyles(() =>
  createStyles({
    h2: {
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '35px',
      lineHeight: '120%',
      marginTop: '58px',
      marginBottom: '59px',
      letterSpacing: '-0.5px',
      color: '#343434',
    },
    message: {
      maxWidth: '540px',
      height: '70px',
      background: '#FFFFFF',
      borderRadius: '60px',
      textAlign: 'center',
    },
    uncheked: {
      maxWidth: '284px',
      height: '75px',
      background: '#FFFFFF',
      border: '1px solid #000000',
      boxSizing: 'border-box',
      borderRadius: '37.5px',
      marginBottom: '33px',
    },
    checked: {
      maxWidth: '284px',
      height: '75px',
      background: '#D2F0FF',
      border: '1px solid #000000',
      boxSizing: 'border-box',
      borderRadius: '37.5px',
      marginBottom: '33px',
    },
  }),
)
export default function ThirdStep() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [status, setStatus] = useState('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus((event.target as HTMLInputElement).value)
  }

  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <Grid>
      <Typography className={classes.h2}>Как желаете да дарите?</Typography>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={status}
        onChange={handleChange}>
        <Grid container m={10} direction="column">
          <FormControlLabel
            value="card"
            className={status === 'card' ? classes.checked : classes.uncheked}
            control={
              <Radio
                icon={<CircleOutlinedIcon />}
                checkedIcon={<CheckCircleIcon color="info" />}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}
              />
            }
            onChange={handleClick}
            label="Карта"
          />
          <FormControlLabel
            value="bank"
            className={status === 'bank' ? classes.checked : classes.uncheked}
            control={
              <Radio
                icon={<CircleOutlinedIcon />}
                checkedIcon={<CheckCircleIcon color="info" />}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}
              />
            }
            onChange={handleClick}
            label="Банков Превод"
          />
        </Grid>
      </RadioGroup>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Typography>Детайли на банкова сметка:</Typography>
          <Divider />
          <Typography>
            Сдружение Подкрепи БГ Уникредит Булбанк IBAN: BG66 UNCR 7000 1524 3490 32
          </Typography>
          <Typography>Основание за дарение запишете</Typography>
          <Divider />
          <Typography>Campaing Name</Typography>
          <Typography>
            Ако не напишете правилно основанието, може да не разпределим парите по предназначение
          </Typography>
        </List>
      </Collapse>
    </Grid>
  )
}
