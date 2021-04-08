import CheckboxField from './CheckboxField'

export type AcceptTermsFieldProps = {
  name: string
}

export default function AcceptTermsField({ name }: AcceptTermsFieldProps) {
  return <CheckboxField name={name} label="validation:agree-terms" />
}
