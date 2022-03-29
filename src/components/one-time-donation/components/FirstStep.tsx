import {
  Checkbox,
  FormControlLabel,
  Grid,
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    h3: {
      // position: 'absolute',
      // width: '646px',
      // height: '29px',
      // left: '383px',
      // top: '745px',

      /* typography/h3 */
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '25px',
      lineHeight: '116.7%',
      color: '#343434',
      marginTop: '71px',
      marginBottom: '25px',
    },
    message: {
      width: '615px',
      height: '247px',
      background: '#FFFFFF',
      borderRadius: '32px',
      textAlign: 'center',
    },
    stepper: {
      position: 'absolute',
      left: '30.96%',
      right: '68.28%',
      top: '23.06%',
      bottom: '76.06%',
      fontFamily: 'Open Sans',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '18px',
      lineHeight: '25px',

      /* identical to box height */

      color: '#000000',
    },
    avatarWrapper: {
      position: 'absolute',
      left: '750px',
      top: '275px',
    },
    avatar: {
      borderRadius: '50%',
      border: `10px solid ${theme.palette.common.white} !important`,
      textAlign: 'center',
    },
    infoWrapper: {
      gap: theme.spacing(2),
      display: 'grid',
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
          <FormControlLabel value="2" control={<Checkbox />} label="2" />
          <FormControlLabel value="5" control={<Checkbox />} label="5" />
          <FormControlLabel value="10" control={<Checkbox />} label="10" />
          <FormControlLabel value="20" control={<Checkbox />} label="20" />
          <FormControlLabel value="50" control={<Checkbox />} label="50" />
          <FormControlLabel value="100" control={<Checkbox />} label="100" />
        </RadioGroup>
      </Grid>
    </Grid>
  )
}
