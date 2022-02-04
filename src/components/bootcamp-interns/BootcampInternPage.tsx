import { Grid } from '@mui/material'
import { observer } from 'mobx-react'
import { NotificationStore } from 'stores/bootcamp-interns/NotificationStore'

import MyLayout from './MyLayout'
import BootcampInternGrid from './BootcampInternGrid'
import Notifications from './Snackbar'

export default observer(function BootcampInternPage() {
  const { isNotificationShown } = NotificationStore

  return (
    <MyLayout>
      <Grid container>
        <BootcampInternGrid />
        {isNotificationShown && <Notifications></Notifications>}
      </Grid>
    </MyLayout>
  )
})
