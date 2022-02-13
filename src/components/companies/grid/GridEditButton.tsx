import { Box, Tooltip } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { GridRenderCellParams } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'

const useStyles = makeStyles(() => {
  return {
    btn: {
      marginRight: '16px',
      cursor: 'pointer',
      width: '15px',
      height: '15px',
    },
    link: {
      margin: 0,
      padding: 0,
      color: '#4AC3FF',
      display: 'flex',
    },
  }
})

export default function GridEditButton({ params }: { params: GridRenderCellParams }) {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Box className={classes.link}>
      <Link passHref href={routes.dashboard.editCompany(params.row.id)}>
        <Tooltip title={t('companies:cta.edit') || ''} placement="top">
          <EditIcon className={classes.btn} />
        </Tooltip>
      </Link>
    </Box>
  )
}
