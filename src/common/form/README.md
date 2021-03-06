# Forms and validation

## Form definition

```tsx
import React from 'react'
import * as yup from 'yup'
import { useTranslation } from 'next-i18next'
import { Grid, TextField, Button } from '@material-ui/core'

import { AlertStore } from 'stores/AlertStore'
import useForm, { translateError, customValidators } from 'common/form/useForm'

export type FormData = {
  email: string
}

const validationSchema: yup.SchemaOf<FormData> = yup.object().defined().shape({
  email: yup.string().email().required(),
})

const defaults: FormData = {
  email: '',
}

export type MyFormProps = { initialValues?: FormData }

export default function MyForm({ initialValues = defaults }: MyFormProps) {
  const { t } = useTranslation()

  const { formik } = useForm({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            type="text"
            fullWidth
            label={t('auth:fields.email')}
            name="email"
            size="small"
            variant="outlined"
            autoFocus
            error={Boolean(formik.errors.email)}
            helperText={translateError(formik.errors.email)}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth type="submit" color="primary" variant="contained">
            {t('auth:cta.login')}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
```

## Form usage

```tsx
<MyForm />

<MyForm initailValues={{email: 'test@example.com'}} />
```

## Validation

### Default translations

Simple strings are mapped directly to their respective translation

```json
{
  "invalid": "Field is invalid",
  "required": "Required field"
}
```

```tsx
setLocale({
  mixed: {
    default: 'validation:invalid',
    required: 'validation:required',
  },
  string: {
    email: 'validation:email',
  },
})
```

### Default translations with interpolation

Complex translation keys are being evaluated upon translation

```json
{
  "field-too-short": "Field should be at least {{min}} symbols",
  "field-too-long": "Field should be maximum {{max}} symbols"
}
```

```tsx
setLocale({
  string: {
    min: ({ min }: { min: number }) => ({
      key: 'validation:field-too-short',
      values: { min },
    }),
    max: ({ max }: { max: number }) => ({
      key: 'validation:field-too-long',
      values: { max },
    }),
  },
})
```

#### Custom translations in validation schema

Commonly used translations with the same translation key

```tsx
yup.string().min(6 customValidators.passwordMin)
```

#### Inline translations in validation schema

Custom translations with keys defined right next to the form

```tsx
const validationSchema: yup.SchemaOf<FormData> = yup
  .object()
  .defined()
  .shape({
    password: yup.string().min(6, ({ min }) => ({
      key: 'validation:password-min',
      values: { min },
    })),
  })
```
