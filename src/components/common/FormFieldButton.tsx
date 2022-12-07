import React from 'react'
import { styled } from '@mui/material/styles'
import { Button, Typography, ButtonBase } from '@mui/material'

const PREFIX = 'FormFieldButton'

const classes = {
  imitateInputBox: `${PREFIX}-imitateInputBox`,
  errorInputBox: `${PREFIX}-errorInputBox`,
  errorText: `${PREFIX}-errorText`,
  placeholderText: `${PREFIX}-placeholderText`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.imitateInputBox}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: `1px solid rgba(0, 0, 0, 0.23)`,
    borderRadius: 60,
    width: '100%',
    padding: '8.5px 14px',
    cursor: 'pointer',
    '&:hover': {
      outlineColor: 'rgba(0, 0, 0, 0.87)',
      borderColor: 'rgba(0, 0, 0, 0.87)',
    },
    '&:focus': {
      outlineColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${classes.errorInputBox}`]: {
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
    '&:hover,&:focus': {
      outlineColor: `${theme.palette.error.main} !important`,
      borderColor: `${theme.palette.error.main} !important`,
    },
  },
  [`& .${classes.errorText}`]: {
    color: theme.palette.error.main,
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
    textAlign: 'left',
    marginTop: '4px',
    marginRight: '14px',
    marginBottom: 0,
    marginLeft: '14px',
  },
  [`& .${classes.placeholderText}`]: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '1rem',
    lineHeight: '1.4375em',
    letterSpacing: '0.01071em',
    fontWeight: 400,
    padding: 0,
  },
}))

type Props = {
  label?: string
  error?: string
  onClick?: () => void
  placeholder?: string
  value?: string
  button?: { label: string }
}

function FormFieldButton({ error, onClick, value, placeholder, button, label }: Props) {
  return (
    <Root>
      <ButtonBase
        aria-label={label}
        onClick={onClick}
        className={
          error ? classes.imitateInputBox + ' ' + classes.errorInputBox : classes.imitateInputBox
        }>
        <Typography className={value ? '' : classes.placeholderText}>
          {value || placeholder}
        </Typography>
        {button ? (
          <Button tabIndex={-1} sx={{ padding: 0 }} onClick={onClick}>
            {button.label}
          </Button>
        ) : null}
      </ButtonBase>
      {error ? <p className={classes.errorText}>{error}</p> : null}
    </Root>
  )
}

export default FormFieldButton
