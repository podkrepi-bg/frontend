import React from 'react'
import { useTranslation } from 'react-i18next'
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'

import BenefactorsIcon from '../icons/BenefactorsIcon'
import MeetingsIcon from '../icons/MeetingsIcon'
import InvestedHoursIcon from '../icons/InvestedHoursIcon'
import NameProposalIcon from '../icons/NameProposalIcon'
import ActivityIcon from '../icons/ActivityIcon'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.dark,
    },
    container: {
      marginBottom: theme.spacing(12),
      textAlign: 'center',
    },
    list: {
      padding: theme.spacing(1),
      marginRight: theme.spacing(1),
      '& list': {
        fontSize: theme.spacing(2),
      },
    },
  }),
)

export default function WhatIsDone() {
  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <Grid container direction="column" component="section" className={classes.container}>
      <Typography variant="h5" component="h2" className={classes.heading}>
        {'Какво направихме до момента?'}
      </Typography>
      <Grid item container>
        <Grid item xs={12} sm={3}>
          <ActivityIcon
            ComponentIcon={BenefactorsIcon}
            label="700+"
            description="брой доброволци записали се"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <ActivityIcon
            ComponentIcon={MeetingsIcon}
            label="50+"
            description="брой проведени срещи"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <ActivityIcon
            ComponentIcon={InvestedHoursIcon}
            label="500+"
            description="брой вложени часове"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <ActivityIcon
            ComponentIcon={NameProposalIcon}
            label="150+"
            description="предложения за име"
          />
          {/* 
          <div className={classes.activity}>
            <NameProposalIcon className={classes.icon} />
            <Typography variant="h4" component="span">
              {'150+'}
            </Typography>
            <Typography variant="body2" component="p">
              {'предложения за име'}
            </Typography>
          </div> */}
        </Grid>
      </Grid>
      <Grid item container className={classes.list}>
        <Grid item xs={12} sm={6}>
          <div>
            <CheckIcon />
            <Typography variant="h4" component="span">
              {'700+ доброволеца в Discord сървъра ни '}
            </Typography>
          </div>
          <div>
            <CheckIcon />
            <Typography variant="h4" component="span">
              {'700+ доброволеца в Discord сървъра ни '}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Grid>
  )
}
