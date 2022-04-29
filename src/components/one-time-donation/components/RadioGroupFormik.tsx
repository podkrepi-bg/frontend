import { useField } from 'formik'
import { useTranslation } from 'next-i18next'
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Icon,
  Radio,
  RadioGroup,
} from '@mui/material'
import { TranslatableField, translateError } from 'common/form/validation'
import { createStyles, makeStyles } from '@mui/styles'
import CheckIcon from '@mui/icons-material/Check'
import PriceRadioButton from './PriceRadioButton'

const useStyles = makeStyles(() =>
  createStyles({
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
    unchecked: {
      width: '309px',
      height: '75px',
      border: '1px solid #000000',
      boxSizing: 'border-box',
      borderRadius: '37.5px',
      marginRight: '33px',
      marginBottom: '20px',
    },
    iconUncheck: {
      fontSize: 39,
      border: '1px solid #000000',
      boxSizing: 'border-box',
      borderRadius: '50px',
      marginRight: 5,
      marginLeft: '15px',
    },
    iconCheck: {
      backgroundColor: '#0098E3',
      borderRadius: '50px',
      color: '#294E85',
      marginRight: 5,
      marginLeft: '15px',
    },
  }),
)

export type CheckboxFieldProps = {
  name: string
  options: []
}

export default function RadioGroupFormik({ name, options }: CheckboxFieldProps) {
  const { t } = useTranslation('one-time-donation')
  const [field, meta, helpers] = useField(name)
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  const { value } = meta
  const { setValue } = helpers
  const classes = useStyles()
  return (
    <FormControl required component="fieldset" error={Boolean(meta.error) && Boolean(meta.touched)}>
      <RadioGroup value={value} row={field.name === 'amount'} name={name}>
        {options.map(({ values, label }, index) => (
          <FormControlLabel
            className={value === values ? classes.checked : classes.unchecked}
            key={index}
            label={<span style={{ fontSize: '20px' }}>{label}</span>}
            control={
              <PriceRadioButton
                checked={Boolean(value === values)}
                onChange={() => {
                  setValue(values)
                }}
              />
            }
          />
        ))}
      </RadioGroup>
      {Boolean(meta.error) && <FormHelperText error>{t(helperText!)}</FormHelperText>}
    </FormControl>
  )
}
