import { BankAccountStatus } from './BankAccountTypes'
import FormSelectField from 'components/common/form/FormSelectField'
import { useTranslation } from 'next-i18next'

type Props = {
  name?: string
}
export default function BankAccountStatusSelect({ name = 'status' }: Props) {
  const { t } = useTranslation()
  return (
    <FormSelectField
      name={name}
      label="bankaccounts:fields.status"
      options={Object.keys(BankAccountStatus).map((key: string) => {
        return {
          key,
          value: BankAccountStatus[key as BankAccountStatus],
          name: t(`bankaccounts:status.${key}`),
        }
      })}
    />
  )
}
