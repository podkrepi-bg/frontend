import { AccountHolderType } from './BankAccountTypes'
import FormSelectField from 'components/common/form/FormSelectField'
import { useTranslation } from 'next-i18next'

export default function AccountHolderSelect() {
  const { t } = useTranslation()
  return (
    <FormSelectField
      name="accountHolderType"
      label="bankaccounts:fields.accountHolderType"
      options={Object.keys(AccountHolderType).map((key: string) => {
        return {
          key,
          value: AccountHolderType[key as AccountHolderType],
          name: t(`bankaccounts:accountHolderType.${key}`),
        }
      })}
    />
  )
}
