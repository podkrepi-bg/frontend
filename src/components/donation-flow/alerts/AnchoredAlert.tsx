import { Alert, AlertProps } from '@mui/material'
import theme from 'common/theme'

export interface AnchoredAlertProps extends AlertProps {
  sectionRef: React.RefObject<HTMLDivElement>
}

export const AnchoredAlert = (props: AnchoredAlertProps) => {
  const { sectionRef, ...alertProps } = props
  console.log('AnchoredAlert', sectionRef?.current)
  return (
    <Alert
      sx={{
        position: 'absolute',
        // calculates the top based on the offset of the amount section + the amount heading's margin + the amount headings's padding
        top: `calc(${sectionRef?.current?.offsetTop}px + ${theme.spacing(4)} + 1.5rem)`,
        overflow: 'auto',
      }}
      {...alertProps}
    />
  )
}
