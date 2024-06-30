import { CampaignApplicationFormData } from 'components/client/campaign-application/helpers/campaignApplication.types'
import { validationSchema } from 'components/client/campaign-application/helpers/validation-schema'
import CampaignApplication from 'components/client/campaign-application/steps/CampaignApplication'
import CampaignApplicationDetails from 'components/client/campaign-application/steps/CampaignApplicationDetails'
import CampaignApplicationOrganizer from 'components/client/campaign-application/steps/CampaignApplicationOrganizer'
import GenericForm from 'components/common/form/GenericForm'
import AdminContainer from 'components/common/navigation/AdminContainer'
import AdminLayout from 'components/common/navigation/AdminLayout'

export default function EditPage() {
  const initialValues: CampaignApplicationFormData = {
    organizer: {
      name: '',
      phone: '',
      email: '',
    },
  }

  return (
    <AdminLayout>
      <AdminContainer title={'Кандидат Кампании'}>
        Will layout all the steps from the stepper plus the admin step
        <GenericForm<CampaignApplicationFormData>
          onSubmit={(v) => console.log(v)}
          initialValues={initialValues}>
          <CampaignApplicationOrganizer />
        </GenericForm>
        <div>.</div>
        <CampaignApplication />
        <div>.</div>
        <CampaignApplicationDetails />
        <div>.</div>
        Edit the status and ticket URL here
      </AdminContainer>
    </AdminLayout>
  )
}
