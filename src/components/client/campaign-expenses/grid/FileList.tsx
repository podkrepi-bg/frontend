import React from 'react'
import { Delete, UploadFile } from '@mui/icons-material'
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'

import { CampaignFileRole, FileRole } from 'components/common/campaign-file/roles'

type Props = {
  files: File[]
  onDelete?: (file: File) => void
  onSetFileRole: (file: File, role: CampaignFileRole) => void
  filesRole: FileRole[]
}

function FileList({ files, onDelete }: Props) {
  return (
    <List dense>
      {files.map((file, key) => (
        <ListItem
          key={key}
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => onDelete && onDelete(file)}>
              <Delete />
            </IconButton>
          }>
          <ListItemAvatar>
            <Avatar>
              <UploadFile />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={file.name} />
        </ListItem>
      ))}
    </List>
  )
}

export default FileList
