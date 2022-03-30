import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material'
import {
  Checkbox,
  Collapse,
  FormControlLabel,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import * as React from 'react'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import Link from 'next/link'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { createStyles, makeStyles } from '@mui/styles'

const useStyles = makeStyles(() =>
  createStyles({
    message: {
      maxWidth: '540px',
      height: '70px',
      background: '#FFFFFF',
      borderRadius: '60px',
      textAlign: 'center',
    },
  }),
)

export default function SubMenu() {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            icon={<CircleOutlinedIcon />}
            checkedIcon={<CheckCircleIcon color="disabled" />}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 33 } }}
          />
        }
        onChange={handleClick}
        label="Дарение без регистрация"
      />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Typography>
            За да сме сигурни, че дарението ви ще отиде на правилното място бихме искали да вземем
            вашите данни. Данните ви няма да бъдат видими в платформата. Сертификат ще бъде изпратен
            на мейл, Няма да можете да видите отчетност, и репорт
          </Typography>
          <Grid my={'35px'}>
            <TextField
              name="email"
              type="text"
              label="Email"
              variant="outlined"
              color="primary"
              fullWidth
              InputProps={{
                classes: {
                  root: classes.message,
                },
              }}
            />
          </Grid>
          <Grid my={'45px'}>
            <TextField
              // className={classes.field}
              name="password"
              type="text"
              label="Парола"
              variant="outlined"
              color="primary"
              fullWidth
              InputProps={{
                classes: {
                  root: classes.message,
                },
              }}
            />
          </Grid>
          <Grid my={'17px'}>
            <TextField
              // className={classes.field}
              name="phone"
              type="text"
              label="Телефон"
              variant="outlined"
              color="primary"
              fullWidth
              InputProps={{
                classes: {
                  root: classes.message,
                },
              }}
            />
          </Grid>
          <Typography>Данните ви няма да бъдат споделяни с никой. </Typography>
        </List>
      </Collapse>
    </>
  )
}
