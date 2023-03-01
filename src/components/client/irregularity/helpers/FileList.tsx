import React from 'react'

import { Delete, UploadFile } from '@mui/icons-material'
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'

type Props = {
  files: File[]
  onDelete?: (file: File) => void
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
          <ListItemText primary={file.type} />
          <ListItemText primary={file.name} />
        </ListItem>
      ))}
    </List>
  )
}

export default FileList
