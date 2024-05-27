import { useTranslation } from 'next-i18next'
import { styled } from '@mui/material/styles'
import { Box, Button, Card, Typography } from '@mui/material'
import { getCurrentPerson } from 'common/util/useCurrentPerson'
import { useRouter } from 'next/router'
import { ProfileTabs } from './tabs'
import ProfileTab from './ProfileTab'
import MyCampaignNotificationsTable from './MyCampaignNotificationsTable'
import { useState } from 'react'
import RenderNotificationsConfirmModal from './MyNotificationsConfirmModal'

const PREFIX = 'MyNotificationsTab'

const classes = {
  h3: `${PREFIX}-h3`,
  thinFont: `${PREFIX}-thinFont`,
  smallText: `${PREFIX}-smallText`,
  boxTitle: `${PREFIX}-boxTitle`,
  statusBoxRow: `${PREFIX}-statusBoxRow`,
  notificationsBox: `${PREFIX}-notificationBox`,
  statusBtn: `${PREFIX}-statusBtn`,
  statusActive: `${PREFIX}-statusActive`,
  statusInactive: `${PREFIX}-statusInactive`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.h3}`]: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: theme.typography.pxToRem(25),
    lineHeight: '116.7%',
    margin: '0',
  },
  [`& .${classes.thinFont}`]: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(24),
    lineHeight: '123.5%',
    letterSpacing: '0.25px',
    margin: 0,
  },
  [`& .${classes.smallText}`]: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: theme.typography.pxToRem(15),
    lineHeight: '160%',
    letterSpacing: '0.15px',
  },
  [`& .${classes.boxTitle}`]: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(3, 7),
    paddingBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    boxShadow: theme.shadows[3],
  },
  [`& .${classes.notificationsBox}`]: {
    padding: theme.spacing(5),
    boxShadow: theme.shadows[3],
    marginTop: theme.spacing(0.5),
  },
  [`& .${classes.statusBoxRow}`]: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 20,
    alignItems: 'center',
    padding: theme.spacing(0, 2),
  },
  [`& .${classes.statusActive}`]: {
    color: 'green',
  },
  [`& .${classes.statusInactive}`]: {
    color: '#880808',
  },
  [`& .${classes.statusBtn}`]: {
    fontSize: theme.typography.pxToRem(18),
    lineHeight: theme.spacing(3),
    letterSpacing: theme.spacing(0.05),
    color: theme.palette.common.black,
    background: `${theme.palette.secondary.main}`,
    padding: theme.spacing(1.5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2.5),
    width: theme.spacing(30),

    '&:hover': {
      background: theme.palette.primary.main,
    },
    '& svg': {
      color: '#333232 ',
    },
  },
}))

export default function MyNotificationsTab() {
  const { t } = useTranslation()
  const router = useRouter()
  const { data: user } = getCurrentPerson(!!router.query?.register)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  return (
    <Root>
      {showConfirmModal && (
        <RenderNotificationsConfirmModal
          setOpen={setShowConfirmModal}
          type={user?.user.newsletter ? 'unsubscribe' : 'subscribe'}
        />
      )}
      <Box className={classes.boxTitle}>
        <Typography className={classes.h3}>{t('profile:myNotifications.status-title')}</Typography>
      </Box>
      <Card className={classes.notificationsBox}>
        <Box className={classes.statusBoxRow}>
          <Typography fontWeight="medium" variant="h6">
            {t('profile:myNotifications.status-msg')}
          </Typography>
          <Typography
            fontWeight="bold"
            ml={1}
            variant="h5"
            className={user?.user.newsletter ? classes.statusActive : classes.statusInactive}>
            {user?.user.newsletter
              ? t('profile:myNotifications.status.active')
              : t('profile:myNotifications.status.inactive')}
          </Typography>
          <Button
            className={classes.statusBtn}
            style={{ opacity: user?.user.newsletter ? '80%' : '100%' }}
            onClick={() => setShowConfirmModal(true)}>
            {user?.user.newsletter
              ? t('profile:myNotifications.cta.deactivate')
              : t('profile:myNotifications.cta.activate')}
          </Button>
        </Box>
      </Card>
      {user?.user.newsletter && (
        <>
          <Box className={classes.boxTitle}>
            <Typography className={classes.h3}>
              {t('profile:myNotifications.campaign.index')}
            </Typography>
          </Box>
          <ProfileTab name={ProfileTabs.myNotifications}>
            <MyCampaignNotificationsTable />
          </ProfileTab>
        </>
      )}
    </Root>
  )
}
