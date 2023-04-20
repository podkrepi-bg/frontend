import { Heading } from './campaigns.styled.tsx'
import { styled } from '@mui/system'
// import theme, { lato } from 'common/theme'
import { useTranslation } from 'next-i18next'
import { Typography, IconButton, Box } from '@mui/material'
// import { PersonIcon } from '@mui/icons-material'
import PersonIcon from '@mui/icons-material/Person'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'

import ListIconButtons from './ListIconButtons'

// TODO: translations / array with data for the ListIconButtons
export default function CreateCampaignUserType() {
  return (
    <>
      <Heading>Тип на вашата организация</Heading>
      <Typography variant="h6">Моля, посочете типа на вашата организация:</Typography>

      {/* <ListIconButtons /> */}
    </>
  )
}
