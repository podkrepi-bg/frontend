import { Paper, Popper, Typography, Box } from '@mui/material'
import * as React from 'react'

interface GridCellExpandProps {
  value: string
  width: number
}

function isOverflown(element: Element): boolean {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth
}

const GridCellExpand = React.memo(function GridCellExpand(props: GridCellExpandProps) {
  const { width, value } = props
  const wrapper = React.useRef<HTMLDivElement | null>(null)
  const cellDiv = React.useRef(null)
  const cellValue = React.useRef(null)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [showFullCell, setShowFullCell] = React.useState(false)
  const [showPopper, setShowPopper] = React.useState(false)

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current!)
    setShowPopper(isCurrentlyOverflown)
    setAnchorEl(cellDiv.current)
    setShowFullCell(true)
  }

  const handleMouseLeave = () => {
    setShowFullCell(false)
  }

  React.useEffect(() => {
    if (!showFullCell) {
      return undefined
    }

    function handleKeyDown(nativeEvent: KeyboardEvent) {
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [setShowFullCell, showFullCell])

  return (
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: 'center',
        lineHeight: '24px',
        width: 1,
        height: 1,
        position: 'relative',
        display: 'flex',
      }}>
      <Box
        ref={cellDiv}
        sx={{
          height: 1,
          width,
          display: 'block',
          position: 'absolute',
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {value}
      </Box>
      {showPopper && (
        <Popper open={showFullCell && anchorEl !== null} anchorEl={anchorEl} style={{ width }}>
          <Paper elevation={15} style={{ minHeight: wrapper.current!.offsetHeight - 3 }}>
            <Typography
              variant="body2"
              sx={(theme) => ({
                padding: theme.spacing(2),
              })}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </Box>
  )
})

export { GridCellExpand }
