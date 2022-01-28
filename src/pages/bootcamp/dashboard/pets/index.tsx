import DashboardLayout from 'components/bootcamp/DashboardLayout'
import PetsGrid from 'components/bootcamp/PetsGrid'

export default function PetsPage() {
  return (
    <DashboardLayout title="All pets">
      <PetsGrid />
    </DashboardLayout>
  )
}
