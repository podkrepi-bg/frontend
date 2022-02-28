import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  separator: {
    border: 'none',
    borderBottom: '1px solid lightgrey',
    margin: '0 0 10px 0',
  },
})

const HeadingSeparator = () => {
  const classes = useStyles()
  return <hr className={classes.separator} />
}

export default HeadingSeparator
