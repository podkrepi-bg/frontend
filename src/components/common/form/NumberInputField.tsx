import { useEffect } from 'react'

import { InputAdornment } from '@mui/material'
import FormTextField from './FormTextField'

import { isInteger, useField } from 'formik'
import { useTranslation } from 'next-i18next'
import { moneyPublic } from 'common/util/money'

type Props = {
  name?: string
  limit?: number
}

export default function NumberInputField({
  name = 'otherAmount',
  limit = Number.MAX_SAFE_INTEGER,
}: Props) {
  const { t, i18n } = useTranslation('one-time-donation')
  const [, meta, { setValue, setError }] = useField(name)
  const decimalSeparator = (1.1).toLocaleString(i18n.lang).charAt(1)

  useEffect(() => {
    setValue(1)
  }, [])

  return (
    <FormTextField
      name={name}
      type="number"
      value={meta.value === 1 ? '' : meta.value}
      label={t('first-step.amount')}
      lang={i18n.language}
      onKeyDown={(e) => {
        if (meta.error && e.key !== 'Backspace' && e.key !== 'Delete' && !isInteger(meta.value)) {
          e.preventDefault()
          return
        }
        if (decimalSeparator !== e.key && (e.key === '.' || e.key === ',')) {
          e.preventDefault()
          return
        }

        if (
          (e.key.charCodeAt(0) >= 48 && e.key.charCodeAt(0) <= 57) ||
          (isInteger(meta.value) && e.key === decimalSeparator) ||
          (e.ctrlKey && e.key === 'v') ||
          (e.ctrlKey && e.key === 'c') ||
          (e.ctrlKey && e.key === 'a') ||
          (e.metaKey && e.key === 'a') ||
          (e.metaKey && e.key === 'v') ||
          (e.metaKey && e.key === 'c') ||
          e.key === 'Backspace' ||
          e.key === 'Delete' ||
          e.key === 'ArrowUp' ||
          e.key === 'ArrowDown' ||
          e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight' ||
          e.code === 'NumpadDecimal'
        ) {
          return
        }

        e.preventDefault()
      }}
      onPaste={async (e) => {
        e.preventDefault()
        const value = e.clipboardData.getData('Text')
        const transformedValue: string = value.replace(/ /g, '') as string
        if (!isNaN(Number(transformedValue))) {
          setValue(transformedValue)
          return
        }
        setValue(1)
      }}
      onChange={(e) => {
        const amount = e.target.value
        if (isNaN(Number(amount))) {
          setError(t('first-step.only-numbers'))
          return
        }
        if (Number(amount) > limit) {
          setError(t('first-step.transaction-limit', { limit: moneyPublic(limit, 'BGN', 1) }))
          return
        } else if (Number(amount) < 1) {
          setValue(1)
          return
        }

        setValue(amount)
      }}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        inputProps: {
          max: limit,
          inputMode: 'decimal',
        },
        style: { padding: 5 },
        endAdornment: (
          <InputAdornment variant="filled" position="end">
            {t('first-step.BGN')}
          </InputAdornment>
        ),
      }}
      autoFocus
    />
  )
}
