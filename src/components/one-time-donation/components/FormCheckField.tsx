import { useField } from 'formik'
import { useTranslation } from 'next-i18next'
import { Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, Icon } from '@mui/material'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { TranslatableField, translateError } from 'common/form/validation'
import React from 'react'
import { createStyles, makeStyles } from '@mui/styles'
import CheckIcon from '@mui/icons-material/Check'

const useStyles = makeStyles(() =>
  createStyles({
    iconUncheck: {
      fontSize: 33,
      border: '1px solid #000000',
      boxSizing: 'border-box',
      borderRadius: '50px',
    },
    iconCheck: {
      width: '33px',
      height: '33px',
      backgroundColor: '#C4C4C4',
      borderRadius: '50px',
      color: '#000000',
      textAlign: 'center',
      fontSize: 28,
    },
  }),
)
export type CheckboxFieldProps = {
  name: string
  label: string | number | React.ReactElement
}

export default function CheckboxField({ name, label }: CheckboxFieldProps) {
  const classes = useStyles()
  const { t } = useTranslation('one-time-donation')
  const [field, meta] = useField(name)
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  return (
    <FormControl required component="fieldset" error={Boolean(meta.error) && Boolean(meta.touched)}>
      <FormControlLabel
        label={typeof label === 'string' ? `${t(label)}` : label}
        control={
          <Checkbox
            icon={<Icon className={classes.iconUncheck} />}
            checkedIcon={
              <Grid className={classes.iconCheck}>
                <CheckIcon fontSize="small" />
              </Grid>
            }
            // sx={{ '& .MuiSvgIcon-root': { size: 13 } }}
            // color="primary"
            checked={Boolean(field.value)}
            {...field}
          />
        }
      />
      {Boolean(meta.error) && <FormHelperText error>{t(helperText!)}</FormHelperText>}
    </FormControl>
  )
}
