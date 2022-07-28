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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { CircleOutlined } from '@mui/icons-material'

import BetaPopUpTextCard from 'components/index/helpers/betaPopUp/BetaPopUpTextCard'
import BetaManIcon from 'components/index/helpers/betaPopUp/BetaManIcon'
import BetaWomanIcon from 'components/index/helpers/betaPopUp/BetaWomanIcon'
let showAgainProp = true

export default function BetaPopUpDialog() {
  const { t } = useTranslation('index')
  const [open, setOpen] = useState(false)
  const [showAgain, setShowAgain] = useState(true)

  const handleClose = () => {
    console.log('button click')
    setOpen(false)
    console.log(open)
    showAgainProp = showAgain
  }

  useEffect(() => {
    if (showAgainProp === true && open === false) {
      setTimeout(() => {
        setOpen(true)
      }, 3000)
    }
  }, [showAgainProp])

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    console.log('changed')
    setShowAgain(!checked)
  }

  return (
    <Grid container>
      <Dialog
        fullWidth={true}
        maxWidth="xl"
        open={open}
        onClose={handleClose}
        aria-describedby="beta-pop-up-description"
        PaperProps={{
          sx: (theme) => ({
            background: 'transparent',
            width: {
              xl: '100vw',
              lg: '100vw',
              md: '100vw',
              xs: '100vw',
            },
            height: {
              xl: '100vh',
              lg: '100vh',
              md: '100vh',
              xs: '100vh',
            },
            boxShadow: 'none',
            overflow: {
              xl: 'hidden',
              lg: 'hidden',
              md: 'hidden',
              xs: 'auto',
            },
            margin: '0',
          }),
        }}>
        <Grid
          sx={(theme) => ({
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
            margin: '0 auto',
            padding: {
              xs: theme.spacing(6, 1, 0, 1),
              md: theme.spacing(10, 6, 1, 6),
              lg: theme.spacing(10, 6, 1, 6),
              xl: theme.spacing(10, 6, 1, 6),
            },
            border: '16px solid #E3E3E3',
            borderRadius: '50px',
            background: 'white',
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
                control={
                  <Checkbox
                    onChange={handleCheckboxChange}
                    checkedIcon={<CheckCircleOutlineIcon />}
                    icon={<CircleOutlined sx={() => ({ height: '24px' })} />}
                  />
                }
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
          sx={() => ({
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'flex-end',
            position: 'relative',
            top: {
              xl: '-180px',
              lg: '-180px',
              md: '-180px',
              xs: '-60px',
            },
            width: {
              xl: '900px',
              lg: '900px',
              md: '900px',
              xs: '370px',
            },
            margin: '0 auto',
          })}>
          <BetaManIcon
            sx={() => ({
              height: {
                xl: '500px',
                lg: '500px',
                md: '500px',
                xs: '190px',
              },
              width: {
                xl: '200px',
                lg: '200px',
                md: '200px',
                xs: '100px',
              },
            })}
          />
          <BetaWomanIcon
            sx={() => ({
              height: {
                xl: '500px',
                lg: '500px',
                md: '500px',
                xs: '190px',
              },
              width: {
                xl: '200px',
                lg: '200px',
                md: '200px',
                xs: '100px',
              },
            })}
          />
        </Grid>
      </Dialog>
    </Grid>
  )
}
