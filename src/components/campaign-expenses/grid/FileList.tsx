import React from 'react'
import { Delete, UploadFile } from '@mui/icons-material'
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'

import { CampaignFileRole, FileRole } from 'components/campaign-file/roles'

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
