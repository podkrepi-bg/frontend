import React, { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  Typography,
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { CircleOutlined } from '@mui/icons-material'

import BetaPopUpTextCard from 'components/index/helpers/betaPopUp/BetaPopUpTextCard'

let showAgainProp = true

export default function BetaPopUpDialog() {
  const { t } = useTranslation('index')
  const [open, setOpen] = useState(false)
  const [showAgain, setShowAgain] = useState(true)

  const handleClose = () => {
    setOpen(false)
    showAgainProp = showAgain
  }

  useEffect(() => {
    if (showAgainProp === true && open === false) {
      setTimeout(() => {
        setOpen(true)
      }, 30000)
    }
  }, [showAgainProp])

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setShowAgain(!checked)
  }

  return (
    <Dialog
      fullWidth={true}
      open={open}
      onClose={handleClose}
      aria-describedby="beta-pop-up-description"
      PaperProps={{
        sx: (theme) => ({
          width: {
            xl: '700px',
            lg: '700px',
            md: '700px',
            xs: '322px',
          },
          height: {
            xl: '452px',
            lg: '452px',
            md: '452px',
            xs: '473px',
          },
          padding: {
            xs: theme.spacing(6, 1, 0, 1),
            md: theme.spacing(10, 6, 1, 6),
            lg: theme.spacing(10, 6, 1, 6),
            xl: theme.spacing(10, 6, 1, 6),
          },
          border: '16px solid #E3E3E3',
          borderRadius: '50px',
          background: 'white',
        }),
      }}>
      <DialogContent id="beta-pop-up-description" sx={() => ({ padding: 0 })}>
        <BetaPopUpTextCard translationKey="index:beta-pop-up.beta-version" />
        <BetaPopUpTextCard translationKey="index:beta-pop-up.feedback" />
      </DialogContent>

      <DialogActions
        sx={() => ({
          display: 'flex',
          flexDirection: 'column',
        })}>
        <Button
          onClick={handleClose}
          sx={() => ({
            margin: 'auto',
            border: '2px solid #00B0FF',
            borderRadius: '25px',
            padding: '0 50px',
            fontSize: '12px',
          })}>
          {t('beta-pop-up.close')}
        </Button>

        <FormControl>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckboxChange}
                checkedIcon={<CheckCircleOutlineIcon />}
                icon={<CircleOutlined sx={() => ({ height: '24px' })} />}
              />
            }
            label={
              <Typography fontSize={12}>{t('beta-pop-up.do-not-show-again').toString()}</Typography>
            }
          />
        </FormControl>
      </DialogActions>
    </Dialog>
  )
}
