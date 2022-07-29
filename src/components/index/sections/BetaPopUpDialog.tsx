import React, { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import {
  Button,
  Grid,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  Typography,
} from '@mui/material'
import { CircleOutlined } from '@mui/icons-material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

import BetaPopUpTextCard from 'components/index/helpers/betaPopUp/BetaPopUpTextCard'
import BetaManIcon from 'components/index/icons/BetaManIcon'
import BetaWomanIcon from 'components/index/icons/BetaWomanIcon'

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
      }, 10000)
    }
  }, [showAgainProp])

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setShowAgain(!checked)
  }

  return (
    <Dialog
      maxWidth="xl"
      open={open}
      onClose={handleClose}
      aria-describedby="beta-pop-up-description"
      PaperProps={{
        sx: {
          background: 'transparent',
          maxHeight: '600px',
          boxShadow: 'none',
          overflow: {
            xl: 'hidden',
            lg: 'hidden',
            md: 'hidden',
            xs: 'auto',
          },
          margin: '0',
        },
      }}>
      <Grid
        sx={(theme) => ({
          width: '600px',
          margin: '0 auto',
          padding: theme.spacing(7, 6, 0, 6),
          border: '16px solid #E3E3E3',
          borderRadius: '40px',
          background: 'white',
          [theme.breakpoints.down('md')]: {
            width: '322px',
            padding: theme.spacing(6, 1, 0, 1),
            border: '8px solid #E3E3E3',
          },
        })}>
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
              zIndex: 1,
            })}>
            {t('beta-pop-up.close')}
          </Button>

          <FormControl>
            <FormControlLabel
              control={<Checkbox onChange={handleCheckboxChange} />}
              label={
                <Typography fontSize={12}>
                  {t('beta-pop-up.do-not-show-again').toString()}
                </Typography>
              }
            />
          </FormControl>
        </DialogActions>
      </Grid>

      <Grid
        item
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'flex-end',
          position: 'relative',
          margin: '0 auto',
          top: '-125px',
          width: '800px',
          [theme.breakpoints.down('md')]: {
            top: '-35px',
            width: '370px',
          },
        })}>
        {/* <BetaManIcon
          sx={(theme) => ({
            height: '325px',
            width: '180px',
            [theme.breakpoints.down('md')]: {
              height: '205px',
              width: '115px',
            },
          })}
        />
        <BetaWomanIcon
          sx={(theme) => ({
            height: '325px',
            width: '200px',
            [theme.breakpoints.down('md')]: {
              height: '205px',
              width: '131px',
            },
          })}
        /> */}
      </Grid>
    </Dialog>
  )
}
