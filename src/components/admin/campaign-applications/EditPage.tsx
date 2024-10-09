import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { CampaignApplicationFormData } from 'components/client/campaign-application/helpers/campaignApplication.types'
import { ActionSubmitButton } from 'components/client/campaign-application/helpers/campaignApplicationFormActions.styled'
import CampaignApplicationBasic from 'components/client/campaign-application/steps/CampaignApplicationBasic'
import CampaignApplicationDetails from 'components/client/campaign-application/steps/CampaignApplicationDetails'
import CampaignApplicationOrganizer from 'components/client/campaign-application/steps/CampaignApplicationOrganizer'
import CampaignApplicationSummary, {
  CamAppDetail,
} from 'components/client/campaign-application/steps/CampaignApplicationSummary'
import GenericForm from 'components/common/form/GenericForm'
import AdminContainer from 'components/common/navigation/AdminContainer'
import AdminLayout from 'components/common/navigation/AdminLayout'
import { CampaignApplicationExisting } from 'gql/campaign-applications'
import { useTranslation } from 'next-i18next'
import NotFoundPage from 'pages/404'
import {
  mapCreateOrEditInput,
  useCreateOrEditApplication,
  useViewCampaignApplicationCached,
} from 'service/campaign-application'
import CampaignApplicationAdminPropsEdit from './CampaignApplicationAdminPropsEdit'
import OrganizerCanEditAt from './CampaignApplicationOrganizerCanEditAt'
import { campaignApplicationAdminValidationSchema } from 'components/client/campaign-application/helpers/validation-schema'

export type Props = {
  id: string
}

export function EditLoadedCampaign({ campaign }: { campaign: CampaignApplicationExisting }) {
  const { createOrUpdateApplication, ...c } = useCreateOrEditApplication({
    isEdit: true,
    campaignApplication: campaign,
  })
  const { t } = useTranslation('campaign-application')
  return (
    <AdminLayout>
      <AdminContainer title={'Кандидат Кампании'}>
        {c.createOrUpdateSuccessful ? (
          <CampaignApplicationSummary
            camApp={c.campaignApplicationResult}
            uploadedFiles={c.uploadedFiles}
            deletedFiles={c.deletedFiles}
            isEdit={true}
            prependChildren={
              <>
                <Grid
                  item
                  container
                  justifyContent="space-between"
                  direction="row"
                  border={'1px solid orange'}>
                  <Grid item xs={12}>
                    <Typography textAlign={'center'} variant="h5">
                      Admin props / Административни подробности
                    </Typography>
                  </Grid>
                  <CamAppDetail
                    label={t('steps.admin.organizer-edit-link')}
                    value={<OrganizerCanEditAt id={campaign.id} />}
                  />
                  <CamAppDetail
                    label={t('steps.admin.status')}
                    value={t(`status.${c.campaignApplicationResult?.state}`)}
                  />
                  <CamAppDetail
                    label={t('steps.admin.archived')}
                    value={c.campaignApplicationResult?.archived?.toString()}
                  />
                  <CamAppDetail
                    label={t('steps.admin.external-url')}
                    value={c.campaignApplicationResult?.ticketURL}
                  />
                </Grid>
              </>
            }
          />
        ) : (
          <GenericForm<CampaignApplicationFormData>
            onSubmit={async (v) => {
              const request = mapCreateOrEditInput(v)
              await createOrUpdateApplication(request)
            }}
            initialValues={c.initialValues}
            validationSchema={campaignApplicationAdminValidationSchema.defined()}>
            <CampaignApplicationAdminPropsEdit id={campaign.id} />
            <CampaignApplicationOrganizer isAdmin={true} />
            <CampaignApplicationBasic />
            <CampaignApplicationDetails files={c.files} setFiles={c.setFiles} />
            <ActionSubmitButton fullWidth label={t('result.editButton')} disabled={c.submitting} />
            {c.error &&
              c.error.map((e, i) => (
                <Typography key={i} color={red.A200}>
                  {e}
                </Typography>
              ))}
          </GenericForm>
        )}
        <Box mb="80px" />
      </AdminContainer>
    </AdminLayout>
  )
}

export default function EditPage({ id }: Props) {
  const { data, isLoading, isError } = useViewCampaignApplicationCached(id, 60 * 1000)

  if (isLoading) {
    return (
      <Grid container justifyContent="center" alignContent="center" sx={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    )
  }

  if (isError) {
    return <NotFoundPage />
  }

  return <EditLoadedCampaign campaign={data} />
}
