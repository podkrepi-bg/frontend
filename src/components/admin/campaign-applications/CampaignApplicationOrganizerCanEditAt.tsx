import { routes } from 'common/routes'
import { CopyTextButton } from 'components/common/CopyTextButton'
import getConfig from 'next/config'
import Copy from '@mui/icons-material/CopyAll'
import { Typography } from '@mui/material'
export type Props = {
  id: string
}
const OrganizerCanEditAt = ({ id }: Props) => {
  const { publicRuntimeConfig } = getConfig()
  const url = `${publicRuntimeConfig?.APP_URL}${routes.campaigns.applicationEdit(id)}`

  return (
    <>
      <Typography variant="subtitle1" component="span">
        {url}
      </Typography>
      <CopyTextButton label="" startIcon={<Copy />} text={url} title={`Copy ${url}`} />
    </>
  )
}

export default OrganizerCanEditAt
