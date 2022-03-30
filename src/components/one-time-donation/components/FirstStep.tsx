import {
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Theme,
  Typography,
} from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import FormTextField from 'components/common/form/FormTextField'
import GenericForm from 'components/common/form/GenericForm'
import React, { useState } from 'react'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const useStyles = makeStyles(() =>
  createStyles({
    h3: {
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '25px',
      lineHeight: '116.7%',
      color: '#343434',
      marginTop: '91px',
      marginBottom: '25px',
    },
    message: {
      maxWidth: '615px',
      maxHeight: '247px',
      background: '#FFFFFF',
      borderRadius: '32px',
      textAlign: 'center',
    },
    checked: {
      width: '309px',
      height: '75px',
      border: '1px solid #000000',
      boxSizing: 'border-box',
      borderRadius: '37.5px',
      marginRight: '33px',
      marginBottom: '20px',
      background: '#D2F0FF',
    },
    button: {
      width: '309px',
      height: '75px',
      border: '1px solid #000000',
      boxSizing: 'border-box',
      borderRadius: '37.5px',
      marginRight: '33px',
      marginBottom: '20px',
    },
  }),
)
export default function FirstStep() {
  const classes = useStyles()
  const [status, setStatus] = useState('0')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus((event.target as HTMLInputElement).value)
  }
  return (
    <Grid>
      <Typography className={classes.h3}>Искате ли да пожелаете нещо на бенефициента:</Typography>
      <Grid>
        <TextField
          name="title"
          type="text"
          label="Вашето послание"
          variant="outlined"
          color="primary"
          multiline
          rows={9}
          fullWidth
          InputProps={{
            classes: {
              root: classes.message,
            },
          }}
        />
      </Grid>
      <Grid>
        <FormControlLabel
          control={
            <Checkbox
              icon={<CircleOutlinedIcon />}
              checkedIcon={<CheckCircleIcon color="disabled" />}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 33 } }}
            />
          }
          label="Анонино дарение"
        />
      </Grid>
      <Typography variant="body1">
        Анонимно дарение означава, че организатора и бенефициент на кампания няма да се известени за
        вашата идентичност
      </Typography>
      <Typography className={classes.h3}>Каква сума желаете да дарите*?</Typography>
      <Grid>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={status}
          onChange={handleChange}>
          <FormControlLabel
            className={status === '2' ? classes.checked : classes.button}
            value="2"
            control={
              <Radio
                sx={{ '& .MuiSvgIcon-root': { fontSize: 39 }, marginRight: 5 }}
                icon={<CircleOutlinedIcon />}
                checkedIcon={<CheckCircleIcon color="info" />}
              />
            }
            label={<span style={{ fontSize: '20px' }}>2 лв.</span>}
          />
          <FormControlLabel
            className={status === '20' ? classes.checked : classes.button}
            value="20"
            control={
              <Radio
                sx={{ '& .MuiSvgIcon-root': { fontSize: 39 }, marginRight: 5 }}
                icon={<CircleOutlinedIcon />}
                checkedIcon={<CheckCircleIcon color="info" />}
              />
            }
            label={<span style={{ fontSize: '20px' }}>20 лв.</span>}
          />
          <FormControlLabel
            className={status === '5' ? classes.checked : classes.button}
            value="5"
            control={
              <Radio
                sx={{ '& .MuiSvgIcon-root': { fontSize: 39 }, marginRight: 5 }}
                icon={<CircleOutlinedIcon />}
                checkedIcon={<CheckCircleIcon color="info" />}
              />
            }
            label={<span style={{ fontSize: '20px' }}>5 лв.</span>}
          />
          <FormControlLabel
            className={status === '50' ? classes.checked : classes.button}
            value="50"
            control={
              <Radio
                sx={{ '& .MuiSvgIcon-root': { fontSize: 39 }, marginRight: 5 }}
                icon={<CircleOutlinedIcon />}
                checkedIcon={<CheckCircleIcon color="info" />}
              />
            }
            label={<span style={{ fontSize: '20px' }}>50 лв.</span>}
          />
          <FormControlLabel
            className={status === '10' ? classes.checked : classes.button}
            value="10"
            control={
              <Radio
                sx={{ '& .MuiSvgIcon-root': { fontSize: 39 }, marginRight: 5 }}
                icon={<CircleOutlinedIcon />}
                checkedIcon={<CheckCircleIcon color="info" />}
              />
            }
            label={<span style={{ fontSize: '20px' }}>10 лв.</span>}
          />
          <FormControlLabel
            className={status === '100' ? classes.checked : classes.button}
            value="100"
            control={
              <Radio
                sx={{ '& .MuiSvgIcon-root': { fontSize: 39 }, marginRight: 5 }}
                icon={<CircleOutlinedIcon />}
                checkedIcon={<CheckCircleIcon color="info" />}
              />
            }
            label={<span style={{ fontSize: '20px' }}>100 лв.</span>}
          />
        </RadioGroup>
      </Grid>
    </Grid>
  )
}
