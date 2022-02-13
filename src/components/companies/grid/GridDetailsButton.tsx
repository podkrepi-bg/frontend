import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Tooltip } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import PermDeviceInformationIcon from '@mui/icons-material/PermDeviceInformation'
import { makeStyles } from '@mui/styles'

import CompanyDetailsModal from '../CompanyDetailsModal'

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

export default function GridDetailsButton({ params }: { params: GridRenderCellParams }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const closeModal = () => setModalIsOpen(false)
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Box className={classes.link}>
      <Tooltip title={t('companies:cta.details') || ''} placement="top">
        <PermDeviceInformationIcon onClick={() => setModalIsOpen(true)} className={classes.btn} />
      </Tooltip>
      <CompanyDetailsModal
        isOpen={modalIsOpen}
        close={closeModal}
        companyName={params.row.companyName}
        companyNumber={params.row.companyNumber}
        representative={params.row.legalPersonName}
        countryCore={params.row.countryCode}
      />
    </Box>
  )
}
