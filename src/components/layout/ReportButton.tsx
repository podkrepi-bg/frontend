import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { IconButton, IconButtonProps, Popover } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'
import ReportForm from './ReportForm'

export type ReportButtonProps = Omit<IconButtonProps, 'aria-label' | 'aria-describedby'>
export default function ReportButton(props: ReportButtonProps) {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const { t } = useTranslation()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    props.onClick ? props.onClick(event) : null
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
        onClick={handleClick}
        {...props}>
        <ErrorOutline sx={{ fontSize: '1.4rem' }} />
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
