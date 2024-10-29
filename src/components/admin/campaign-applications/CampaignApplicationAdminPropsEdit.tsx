import { useTranslation } from 'next-i18next'

import { Grid } from '@mui/material'
import { StatusSelector } from 'components/client/campaign-application/helpers/campaign-application-status'
import {
  StyledFormTextField,
  StyledStepHeading,
} from 'components/client/campaign-application/helpers/campaignApplication.styled'
import { CamAppDetail } from 'components/client/campaign-application/steps/CampaignApplicationSummary'
import CheckboxField from 'components/common/form/CheckboxField'
import OrganizerCanEditAt from './CampaignApplicationOrganizerCanEditAt'
import { UploadedFile } from 'components/common/file-upload/UploadedFilesList'
import UploadedCampaignApplicationFiles from './UploadedCampaignApplicationFiles'

export default function CampaignApplicationAdminPropsEdit({
  id,
  files,
}: {
  id: string
  files: UploadedFile[]
}) {
  const { t } = useTranslation('campaign-application')
  return (
    <Grid container spacing={6} justifyContent="center" direction="column" alignContent="center">
      <Grid item container justifyContent="center">
        <StyledStepHeading variant="h4">{t('steps.admin.title')}</StyledStepHeading>
      </Grid>
      <Grid item container spacing={6} justifyContent="space-between" direction="row">
        <Grid item xs={6}>
          <StatusSelector name="admin.state" />
        </Grid>
        <Grid item xs={6}>
          <CheckboxField label={t('steps.admin.archived')} name="admin.archived" />
        </Grid>
      </Grid>
      <Grid item container spacing={6} justifyContent="space-between" direction="row">
        <Grid container item xs={12}>
          <StyledFormTextField
            label={t('steps.admin.external-url')}
            type="text"
            name="admin.ticketURL"
          />
        </Grid>
      </Grid>
      <Grid item container spacing={6} justifyContent="space-between" direction="row" mb="20px">
        <CamAppDetail
          label={t('steps.admin.organizer-edit-link')}
          value={<OrganizerCanEditAt id={id} />}
        />
      </Grid>
      <Grid item>
        <UploadedCampaignApplicationFiles files={files} campaignApplicationId={id} />
      </Grid>
    </Grid>
  )
}
