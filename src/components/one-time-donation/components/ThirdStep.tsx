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
} from '@mui/material'
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material'
import SubmitButton from 'components/common/form/SubmitButton'
import Link from 'components/common/Link'
import React, { useState } from 'react'
import SubMenu from './Submenu'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export default function ThirdStep() {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <Grid>
      <Typography>Как желаете да дарите?</Typography>
      <Grid>
        <Button
          style={{ justifyContent: 'flex-start' }}
          color="info"
          variant="outlined"
          // startIcon={
          //   <CircleOutlinedIcon
          //     sx={{
          //       width: '39.31px',
          //       height: '39px',
          //     }}
          //   />
          // }
          sx={{
            // position: 'absolute',
            width: '284px',
            height: '75px',
            // left: '503px',
            // top: '970px',

            // background: '#D2F0FF',
            borderRadius: '37.5px',
          }}>
          <Checkbox
            icon={
              <CircleOutlinedIcon
                sx={{
                  width: '39.31px',
                  height: '39px',
                  // border: '1px solid #000000',
                  // boxSizing: 'border-box',
                  // borderRadius: '19.5px',
                }}
              />
            }
            checkedIcon={
              <CheckCircleIcon
                sx={{
                  width: '39.31px',
                  height: '39px',
                }}
              />
            }
          />
          Карта
        </Button>
        <Button
          style={{ justifyContent: 'flex-start' }}
          color="info"
          variant="outlined"
          onClick={handleClick}
          sx={{
            // position: 'absolute',
            width: '284px',
            height: '75px',
            // left: '503px',
            // top: '970px',

            // background: '#D2F0FF',
            borderRadius: '37.5px',
          }}>
          <Checkbox
            icon={
              <CircleOutlinedIcon
                sx={{
                  width: '39.31px',
                  height: '39px',
                  // border: '1px solid #000000',
                  // boxSizing: 'border-box',
                  // borderRadius: '19.5px',
                }}
              />
            }
            checkedIcon={
              <CheckCircleIcon
                sx={{
                  width: '39.31px',
                  height: '39px',
                }}
              />
            }
          />
          Банков Превод
        </Button>
        {/* <Button color="info" variant="outlined" onClick={() => console.log('clicked')}>
          Банков Превод
        </Button> */}
      </Grid>
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
