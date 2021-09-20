import { ibanNumber } from '../../common/iban'
import React from 'react'
import { useTranslation } from 'next-i18next'

export const BankAccount = () => {
  const { t } = useTranslation()

  return (
    <div>
      {t('about-project:opened-donations-account')} <br />
      <i>{t('about-project:bank-name')}</i>
      <br />
      <strong>IBAN: {ibanNumber}</strong>
      <br /> {t('about-project:with-holder')} <strong>{t('about-project:association-name')}</strong>
      .
    </div>
  )
}
