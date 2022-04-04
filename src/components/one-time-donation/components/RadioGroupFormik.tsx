import { useField } from 'formik'
import { useTranslation } from 'next-i18next'
import { FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup } from '@mui/material'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { TranslatableField, translateError } from 'common/form/validation'
import { createStyles, makeStyles } from '@mui/styles'

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

export type CheckboxFieldProps = {
  name: string
  options: string[]
}

export default function RadioGroupFormik({ name, options }: CheckboxFieldProps) {
  const { t } = useTranslation()
  const [field, meta, helpers] = useField(name)
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  const { value } = meta
  const { setValue } = helpers
  const classes = useStyles()
  return (
    <FormControl required component="fieldset" error={Boolean(meta.error) && Boolean(meta.touched)}>
      <RadioGroup value={value} row={field.name === 'amount'} name={name}>
        {options.map((option) => (
          <FormControlLabel
            className={value === option ? classes.checked : classes.button}
            key={option}
            label={<span style={{ fontSize: '20px' }}>{option}</span>}
            control={
              <Radio
                sx={{ '& .MuiSvgIcon-root': { fontSize: 39 }, marginRight: 5 }}
                icon={<CircleOutlinedIcon />}
                checkedIcon={<CheckCircleIcon color="info" />}
                checked={Boolean(value === option)}
                {...field}
                onChange={() => {
                  setValue(option)
                }}
              />
            }
          />
        ))}
      </RadioGroup>
      {Boolean(meta.error) && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}
