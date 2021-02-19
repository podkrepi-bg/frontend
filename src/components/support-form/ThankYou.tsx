import React from 'react'

import { Button, createStyles, makeStyles, Theme, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
)

export default function ThankYou({
  setActiveStep,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
}) {
  const classes = useStyles()
  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <div>
      <Typography className={classes.instructions}>
        All steps completed - you&apos;re finished
      </Typography>
      <Button onClick={handleReset} className={classes.button}>
        Reset
      </Button>
    </div>
  )
}
