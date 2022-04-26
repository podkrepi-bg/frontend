import React from 'react'
import { Button, Typography, Box } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'

type Props = {
  error?: string
  onClick?: () => void
  placeholder?: string
  value?: string
  button?: { label: string }
}

const useStyles = makeStyles({
  imitateInputBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: `1px solid rgba(0, 0, 0, 0.23)`,
    borderRadius: '3px',
    padding: '8.5px 14px',
    cursor: 'pointer',
  },
  errorInputBox: {
    borderColor: '#d32f2f',
    color: '#d32f2f',
  },
  errorText: {
    color: '#d32f2f',
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
})

function FormFieldButton({ error, onClick, value, placeholder, button }: Props) {
  const classes = useStyles()
  return (
    <>
      <Box
        onClick={onClick}
        className={
          error ? classes.imitateInputBox + ' ' + classes.errorInputBox : classes.imitateInputBox
        }>
        <Typography>{value || placeholder}</Typography>
        {button ? (
          <Button sx={{ padding: 0 }} onClick={onClick}>
            {button.label}
          </Button>
        ) : null}
      </Box>
      {error ? <p className={classes.errorText}>{error}</p> : null}
    </>
  )
}

export default FormFieldButton
