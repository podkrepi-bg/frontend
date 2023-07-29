import { Chip } from '@mui/material'

interface CampaingDetailsChipProps {
  chip: string
  onClick: () => void
}

const CampaignDetailsChip: React.FC<CampaingDetailsChipProps> = ({ chip, onClick }) => {
  return <Chip label={chip} sx={{ marginX: '2px' }} onClick={onClick} />
}
export default CampaignDetailsChip
