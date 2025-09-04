import React from 'react'
import { observer } from 'mobx-react'
import { Dialog, Card, CardContent, Typography, SxProps, Theme } from '@mui/material'

import { ModalStoreImpl } from 'stores/dashboard/ModalStore'
import CloseModalButton from 'components/common/CloseModalButton'

const containerStyles: SxProps<Theme> = {
  position: 'absolute' as const,
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  p: 4,
}

export type Field = {
  name: string
  value: React.ReactNode
}

type Prop = {
  modalStore: ModalStoreImpl
  data: Field[]
}

export default observer(function DetailsDialog({ modalStore, data }: Prop) {
  const { isDetailsOpen, hideDetails } = modalStore

  return (
    <Dialog open={isDetailsOpen} onClose={hideDetails} sx={containerStyles}>
      <Card sx={{ pt: '35px' }}>
        <CloseModalButton onClose={hideDetails} />
        <CardContent>
          {data.map((field) => (
            <Typography variant="body2" key={field.name}>
              <b>{field?.name}:</b> {field?.value}
            </Typography>
          ))}
        </CardContent>
      </Card>
    </Dialog>
  )
})
