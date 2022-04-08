import React from 'react'
import {
  Dialog,
  Card,
  CardContent,
  Typography,
  Divider,
  DialogActions,
  Button,
  DialogTitle,
} from '@mui/material'
import { BootcampResponse } from 'gql/bootcamp'

type Props = {
  task: BootcampResponse
  onClose: () => void
}

export default function DetailsModal({ task, onClose }: Props) {
  return (
    <Dialog open scroll="body" onClose={onClose}>
      <DialogTitle>Детайли за задачата</DialogTitle>
      <Card>
        <Divider />
        <CardContent sx={{ p: 3 }}>
          <Typography variant="body1">Статус: {task.status}</Typography>
          <Typography variant="body1">Заглавие: {task.title}</Typography>
          <Typography variant="body1">Емейл адрес: {task.email}</Typography>
          <Typography variant="body1">Съобщение: {task.message}</Typography>
          <Typography variant="body1">Стартова дата: {task.startDate}</Typography>
          <Typography variant="body1">Крайна Дата: {task.endDate}</Typography>
          <Typography variant="body1">Име: {task.firstName}</Typography>
          <Typography variant="body1">Фамилия: {task.lastName}</Typography>
        </CardContent>
      </Card>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Затвори
        </Button>
      </DialogActions>
    </Dialog>
  )
}
