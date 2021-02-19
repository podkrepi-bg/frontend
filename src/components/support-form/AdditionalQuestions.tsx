import React from 'react'

export default function AdditionalQuestions({ formik }: { formik: FormikProps<SupportFormData> }) {
  return (
    <div>
      {Object.entries(formik.values.roles)
        .filter(([_, value]) => value)
        .map(([key, _]) => (
          <h2 key={key}>{key}</h2>
        ))}
    </div>
  )
}
