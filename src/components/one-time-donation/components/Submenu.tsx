import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material'
import {
  Checkbox,
  Collapse,
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
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export default function SubMenu() {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <Checkbox icon={<CheckCircleTwoToneIcon />} checkedIcon={<CheckCircleIcon />} />
        <ListItemText primary="Дарение без регистрация" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Typography>
            За да сме сигурни, че дарението ви ще отиде на правилното място бихме искали да вземем
            вашите данни. Данните ви няма да бъдат видими в платформата. Сертификат ще бъде изпратен
            на мейл, Няма да можете да видите отчетност, и репорт
          </Typography>
          <Grid>
            <TextField
              // className={classes.field}
              name="email"
              type="text"
              label="Email"
              variant="outlined"
              color="primary"
            />
          </Grid>
          <Grid>
            <TextField
              // className={classes.field}
              name="password"
              type="text"
              label="Парола"
              variant="outlined"
              color="primary"
            />
          </Grid>
          <Grid>
            <TextField
              // className={classes.field}
              name="phone"
              type="text"
              label="Телефон"
              variant="outlined"
              color="primary"
            />
          </Grid>
          <Typography>Данните ви няма да бъдат споделяни с никой. </Typography>
        </List>
      </Collapse>
    </>
  )
}
