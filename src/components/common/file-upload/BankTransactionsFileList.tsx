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

import { BankTransactionsFileType, FileType } from 'components/admin/bank-transactions-file/types'

type Props = {
  files: File[]
  onDelete?: (file: File) => void
  onSetFileType: (file: File, type: BankTransactionsFileType) => void
  filesType: FileType[]
}

function BankTransactionsFileList({ files, onDelete, onSetFileType, filesType = [] }: Props) {
  const setFileType = (file: File) => {
    return (event: SelectChangeEvent<BankTransactionsFileType>) => {
      if (
        Object.values(BankTransactionsFileType).includes(
          event.target.value as BankTransactionsFileType,
        )
      ) {
        onSetFileType(file, event.target.value as BankTransactionsFileType)
      }
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
          <ListItemText primary={file.type} />
          <ListItemText primary={file.name} />
          <FormControl>
            <InputLabel id="choose-type-label">{'Избери вид на файла'}</InputLabel>
            <Select<BankTransactionsFileType>
              id="choose-type"
              label="Избери вид на файла"
              labelId="choose-type-label"
              value={
                filesType.find((f) => f.file === file.name)?.type ?? BankTransactionsFileType.xml
              }
              onChange={setFileType(file)}>
              {Object.values(BankTransactionsFileType).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>
      ))}
    </List>
  )
}

export default BankTransactionsFileList
