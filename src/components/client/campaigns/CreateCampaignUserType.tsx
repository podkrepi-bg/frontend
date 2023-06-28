import { Heading } from './campaigns.styled'
import { useTranslation } from 'next-i18next'
import { Typography } from '@mui/material'
import { CategoryType } from 'gql/types'

import PersonIcon from '@mui/icons-material/Person'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import ListIconButtons from './ListIconButtons'

type Props = {
  onClick: (item: CategoryType) => void
}

export default function CreateCampaignUserType({ onClick }: Props) {
  const { t } = useTranslation('campaigns')

  const users = [
    {
      type: 'individual',
      text: t('individual'),
      icon: <PersonIcon fontSize="large" />,
    },
    {
      type: 'organization',
      text: t('organization'),
      icon: <PeopleOutlinedIcon fontSize="large" />,
    },
  ]

  return (
    <>
      <Heading>{t('type-of-organization')}</Heading>
      <Typography variant="h6">{t('please-select-organization')}</Typography>

      <ListIconButtons data={users} onClick={onClick} style={{ width: 426 }} />
    </>
  )
}
