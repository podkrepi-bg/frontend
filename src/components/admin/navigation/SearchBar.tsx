import { ModalContext } from 'context/ModalContext'
import { useContext } from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

export default function SearchBar() {
  const { setSearch }: any = useContext(ModalContext)
  return (
    <Paper
      elevation={0}
      component="form"
      sx={{
        transform: 'scale(0.8)',
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '25%',
        background: '#f7f7f7',
        borderRadius: '10px',
      }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="филтър"
        onChange={(e) => {
          setSearch(e.target.value)
        }}
      />
      <IconButton aria-label="search">
        <SearchIcon sx={{ p: 0 }} />
      </IconButton>
    </Paper>
  )
}
