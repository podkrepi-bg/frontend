import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
export default function Search() {
  return (
    <Paper
      elevation={0}
      component="form"
      sx={{
        p: '2px 0px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        background: '#eeeeee',
        border: '1px solid #ababab',
      }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder=" search"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Paper>
  )
}
