import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Modal,
} from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'next-i18next'
import { Bootcamp } from '../survices/bootcampSurvices'

interface Props {
  data: Bootcamp
  openInfo: boolean
  setClose: () => void
}

export default function InfoModal({ data, openInfo, setClose }: Props) {
  const { t } = useTranslation()

  return (
    <Modal open={openInfo} onClose={setClose}>
      <Dialog open={openInfo} onClose={setClose} aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {t('bootcamp:titles.intern-info')}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <Box fontSize={18}>Id: {data.id}</Box>
            <Box fontSize={18}>
              {t('bootcamp:task.status')}: {data.status}
            </Box>
            <Box fontSize={18}>
              {t('bootcamp:task.title')}: {data.title}
            </Box>
            <Box fontSize={18}>
              {t('bootcamp:task.email')}: {data.email}
            </Box>
            <Box fontSize={18}>
              {t('bootcamp:task.message')}: {data.message}
            </Box>
            <Box fontSize={18}>
              {t('bootcamp:task.final-date')}: {data.date}
            </Box>
            <Box fontSize={18}>
              {t('bootcamp:task.created-at')}: {data.createdAt}
            </Box>
            <Box fontSize={18}>
              {t('bootcamp:task.first-name')}: {data.firstName}
            </Box>
            <Box fontSize={18}>
              {t('bootcamp:task.second-name')}: {data.lastName}
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="info" onClick={setClose}>
            {t('bootcamp:btns.close')}
          </Button>
        </DialogActions>
      </Dialog>
    </Modal>
  )
}
