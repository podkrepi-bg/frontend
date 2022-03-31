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
    divider: {
      border: '1px solid #000000',
    },
    uncheked: {
      width: '284px',
      height: '75px',
      background: '#FFFFFF',
      border: '1px solid #000000',
      boxSizing: 'border-box',
      borderRadius: '37.5px',
      marginBottom: '33px',
    },
    checked: {
      width: '284px',
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
      <Grid container justifyContent="center">
        <Typography className={classes.h2}>Как желаете да дарите?</Typography>
      </Grid>
      <Grid container display="flex" justifyContent="center">
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={status}
          onChange={handleChange}>
          <Stack direction="column">
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
          </Stack>
        </RadioGroup>
      </Grid>
      <Grid container justifyContent="center">
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Typography my={2} mx={10} variant="h6">
              Детайли на банкова сметка:
            </Typography>
            <Divider className={classes.divider} />
            <Grid mx={11} my={3} container display="flex" justifyContent="space-between" xs={9}>
              <Typography>Сдружение Подкрепи БГ</Typography>
              <Button variant="contained" color="info">
                Копирай
              </Button>
            </Grid>
            <Grid mx={11} my={3} container display="flex" justifyContent="space-between" xs={9}>
              <Typography>Уникредит Булбанк</Typography>
              <Button variant="contained" color="info">
                Копирай
              </Button>
            </Grid>
            <Grid mx={11} my={3} container display="flex" justifyContent="space-between" xs={9}>
              <Typography>IBAN: BG66 UNCR 7000 1524 3490 32</Typography>
              <Button variant="contained" color="info">
                Копирай
              </Button>
            </Grid>
            <Typography my={2} mx={10} variant="h6">
              Основание за дарение запишете
            </Typography>
            <Divider className={classes.divider} />
            <Grid mx={11} my={3} container display="flex" justifyContent="space-between" xs={9}>
              <Typography>Campaing Name</Typography>
              <Button variant="contained" color="info">
                Копирай
              </Button>
            </Grid>
            <Typography mx={10}>
              Ако не напишете правилно основанието, може да не разпределим парите по предназначение
            </Typography>
          </List>
        </Collapse>
      </Grid>
    </Grid>
  )
}
