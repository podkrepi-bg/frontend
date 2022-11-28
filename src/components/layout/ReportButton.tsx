import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { IconButton, Popover } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'
import ReportForm from './ReportForm'

export default function ReportButton() {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const { t } = useTranslation()

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'report-a-problem-form' : undefined
  return (
    <>
      <IconButton
        aria-label={t('nav.report-form.trigger-label')}
        aria-describedby={id}
        size="small"
        onClick={handleClick}>
        <ErrorOutline />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <ReportForm />
      </Popover>
    </>
  )
}
