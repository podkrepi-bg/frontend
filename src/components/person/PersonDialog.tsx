import { Close } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
  AlertTitle,
  IconButton,
} from '@mui/material'
import { Box } from '@mui/system'
import { FormikConfig } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { PersonFormData } from 'gql/person'

import PersonForm from './PersonForm'

type Props = {
  label: string
  type: 'coordinator' | 'beneficiary'
  onSubmit: FormikConfig<PersonFormData>['onSubmit']
}
export default function PersonDialog({ label, type, onSubmit }: Props) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Button fullWidth variant="contained" color="info" onClick={handleClickOpen}>
        {label}
      </Button>
      <Dialog
        open={open}
        onClose={(e, reason) => {
          if (reason === 'backdropClick') return
          handleClose()
        }}
        onBackdropClick={() => false}>
        <DialogTitle>
          {label}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            {type === 'beneficiary' ? (
              <Alert severity="info">
                <AlertTitle>{t('campaigns:campaign.beneficiary.name')}</AlertTitle>
                Лице, в чиято полза се организира кампанията. От юридическа гледна точка,
                бенефициентът <strong>НЕ влиза</strong> във взаимоотношения с оператора при набиране
                на средства в негова полза. Всички договори, изисквания, банкова сметка на
                кампанията са на името на организатора. Възможно е бенефициентът по една кампания да
                е и неговият организатор.
              </Alert>
            ) : (
              <Alert severity="warning">
                <AlertTitle>{t('campaigns:campaign.coordinator.name')}</AlertTitle>
                Организаторът е физическото или юридическо лице, с което се сключва договор за
                набиране на средства, след като негова заявка за кампания е одобрена. Набраните
                средства се прехвърлят в неговата банкова сметка, от него се изискват отчети за
                разходените средства. Когато дадено лице иска да стане организатор на кампании,
                преминава през процес на верификация, за да се избегнат измамите. Организаторът също
                може да е и бенефициент по дадена кампания.
              </Alert>
            )}
          </Box>
          <PersonForm
            {...type}
            onSubmit={(...args) => {
              onSubmit(...args)
              handleClose()
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
