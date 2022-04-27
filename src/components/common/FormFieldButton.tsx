import React from 'react'
import { Button, Typography, Box } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import theme from 'common/theme'

type Props = {
  label?: string
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
    '&:hover': {
      outlineColor: 'rgba(0, 0, 0, 0.87)',
      borderColor: 'rgba(0, 0, 0, 0.87)',
    },
    '&:focus': {
      outlineColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
  errorInputBox: {
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
    '&:hover,&:focus': {
      outlineColor: `${theme.palette.error.main} !important`,
      borderColor: `${theme.palette.error.main} !important`,
    },
  },
  errorText: {
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
  placeholderText: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '1rem',
    lineHeight: '1.4375em',
    letterSpacing: '0.01071em',
    fontFamily: '"Roboto","Helvetica","Arial","sans-serif"',
    fontWeight: 400,
    padding: 0,
  },
})

function FormFieldButton({ error, onClick, value, placeholder, button, label }: Props) {
  const classes = useStyles()
  return (
    <>
      <Box
        aria-label={label}
        component="div"
        role="button"
        tabIndex={0}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.keyCode === 32 || e.keyCode === 13) {
            onClick ? onClick() : null
          }
        }}
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
      </Box>
      {error ? <p className={classes.errorText}>{error}</p> : null}
    </>
  )
}

export default FormFieldButton
