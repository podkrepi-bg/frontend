import React from 'react'
import { observer } from 'mobx-react'
import { Dialog, Card, CardContent, Typography, SxProps, Theme } from '@mui/material'

import { ModalStore } from 'stores/dashboard/ModalStore'
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
  value: string | number | JSX.Element
}

type Prop = {
  data: Field[]
}

export default observer(function DetailsDialog({ data }: Prop) {
  const { isDetailsOpen, hideDetails } = ModalStore

  return (
    <Dialog open={isDetailsOpen} onClose={hideDetails} sx={containerStyles}>
      <Card style={{ paddingTop: '35px' }}>
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
