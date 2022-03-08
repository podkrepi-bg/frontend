import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Modal,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'next-i18next'
import { date } from 'yup/lib/locale'
import { Bootcamp } from './survices/bootcampSurvices'

interface Props {
  data: Bootcamp
  openInfo: boolean
  setClose: () => void
}

export default function InfoModal({ data, openInfo, setClose }: Props) {
  const { t } = useTranslation()
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    cursor: 'move',
  }

  return (
    <Modal open={openInfo} onClose={setClose}>
      <Dialog open={openInfo} onClose={setClose} aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Bootcamp Details
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
              {t('bootcamp:task.first-name')}: {data.firstNam}
            </Box>
            <Box fontSize={18}>
              {t('bootcamp:task.second-name')}: {data.lastNam}
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
