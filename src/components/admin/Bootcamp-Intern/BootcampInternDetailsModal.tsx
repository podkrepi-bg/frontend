import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { ModalContext } from 'context/ModalContext'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { useFetchBootcampIntern } from 'common/hooks/bootcampIntern'
import BootcampInternRow from './BootcampInternRow'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function BootcampInternDetailsModal() {
  const [editOpen, setEditOpen] = useState(false)
  const router = useRouter()
  const id: any = router.query.id
  console.log(id)
  const intern = useFetchBootcampIntern(id)
  console.log(intern)
  const modal: any = useContext(ModalContext)
  return (
    <div>
      <Modal
        open={modal.isOpen}
        onClose={modal.closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          {!editOpen ? (
            <BootcampInternRow intern={intern.data} setEditOpen={setEditOpen}></BootcampInternRow>
          ) : // <EditForm intern={intern.data} setEditOpen={setEditOpen}></EditForm>
          null}
        </Box>
      </Modal>
    </div>
  )
}
