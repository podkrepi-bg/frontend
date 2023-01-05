import React from 'react'
import RadioButtonGroup from 'components/common/form/RadioButtonGroup'
import { useSinglePriceList } from 'common/hooks/donation'
import { moneyPublic } from 'common/util/money'
import { useTranslation } from 'react-i18next'

function ChooseAmount() {
  const { data: prices } = useSinglePriceList()
  const { t } = useTranslation('one-time-donation')
  return (
    <RadioButtonGroup
      name="payment"
      options={
        prices
          ?.sort((a, b) => Number(a.unit_amount) - Number(b.unit_amount))
          .map((v) => ({
            label: moneyPublic(Number(v.unit_amount)),
            value: String(Number(v.unit_amount)),
          }))
          .concat({ label: t('first-step.other'), value: 'other' }) || []
      }
    />
  )
}

export default ChooseAmount
