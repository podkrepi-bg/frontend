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
  const { t, i18n } = useTranslation('donation-flow')
  const [, meta, { setValue, setError }] = useField(name)

  useEffect(() => {
    setValue(1)
  }, [])

  return (
    <FormTextField
      name={name}
      type="number"
      value={meta.value === 1 ? '' : meta.value}
      label={t('step.amount.field.other-amount.label')}
      lang={i18n?.language}
      onKeyDown={(e) => {
        if ((e.shiftKey && e.key === 'Tab') || e.key === 'Tab') {
          return
        }
        if (meta.error && e.key !== 'Backspace' && e.key !== 'Delete' && !isInteger(meta.value)) {
          e.preventDefault()
          return
        }

        //prevent decimal amounts
        if (e.key === '.' || e.key === ',') {
          e.preventDefault()
          return
        }

        if (
          (e.key.charCodeAt(0) >= 48 && e.key.charCodeAt(0) <= 57) ||
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
        if (value.includes('.') || value.includes(',')) return

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
          setError(t('step.amount.field.other-amount.only-numbers'))
          return
        }
        if (Number(amount) > limit) {
          setError(
            t('step.amount.field.other-amount.transaction-limit', {
              limit: moneyPublic(limit, 'BGN', 1),
            }),
          )
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
          tabIndex: 0,
        },
        style: { padding: 5 },
        endAdornment: (
          <InputAdornment variant="filled" position="end">
            {t('step.amount.field.other-amount.currency')}
          </InputAdornment>
        ),
      }}
      autoFocus
    />
  );
}
