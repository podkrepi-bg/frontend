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
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'

import React from 'react'

type NewType = {
  files: File[]
  onDelete?: (file: File) => void
  onSetFileRole: (file: File, role: string) => void
  filesRole: { file: string; role: string }[]
}

function FileList({ files, onDelete, onSetFileRole, filesRole = [] }: NewType) {
  const setFileRole = (file: File) => {
    return (event: SelectChangeEvent) => {
      onSetFileRole(file, event.target.value as string)
    }
  }
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
          <FormControl>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={(filesRole.find((f) => f.file === file.name)?.role as string) || ''}
              label="Type"
              onChange={setFileRole(file)}>
              <MenuItem value="">Избери тип</MenuItem>
              <MenuItem value="background">background</MenuItem>
              <MenuItem value="coordinator">coordinator</MenuItem>
              <MenuItem value="campaignPhoto">campaignPhoto</MenuItem>
              <MenuItem value="invoice">invoice</MenuItem>
              <MenuItem value="document">document</MenuItem>
            </Select>
          </FormControl>
        </ListItem>
      ))}
    </List>
  )
}

export default FileList
