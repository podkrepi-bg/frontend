import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { FormControl, FormLabel } from '@material-ui/core'
import CheckboxField from 'components/common/form/CheckboxField'
import ConfirmationDialog from 'components/common/ConfirmationDialog'

export default function Newsletter() {
  const { t } = useTranslation()

  const [isOpen, updateIsOpen] = useState(false)

  const [isChecked, updateIsChecked] = useState(false)

  const handleCancel = () => {
    updateIsOpen(false)
    updateIsChecked(false)
  }

  const handleConfirm = () => {
    updateIsOpen(false)
    updateIsChecked(true)
  }

  const handleClick = () => {
    updateIsOpen(true)
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{t('common:support-form.steps.newsletter.title')}</FormLabel>
      <CheckboxField
        label={t('common:support-form.steps.newsletter.label')}
        name="newsletter"
        preChecked={isChecked}
        onClick={handleClick}
      />
      <ConfirmationDialog
        title={t('common:support-form.steps.newsletter.confirm.title')}
        content={t('common:support-form.steps.newsletter.confirm.content')}
        confirmButtonLabel={t('common:support-form.steps.newsletter.confirm.confirmButtonLabel')}
        cancelButtonLabel={t('common:support-form.steps.newsletter.confirm.cancelButtonLabel')}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        isOpen={isOpen}></ConfirmationDialog>
    </FormControl>
  )
}
