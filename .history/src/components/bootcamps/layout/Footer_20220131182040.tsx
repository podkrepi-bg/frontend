import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => {
  return {
    footer: {
      background: '#32A9FE',
      width: '100%',
      position: 'fixed',
      height: '60px',
      bottom: 0,
      margin: 0,
    },
    footerText: {
      textAlign: 'center',
    },
  }
})

export default function MyFooter() {
  const styles = useStyles()

  return (
    <div className={styles.footer}>
      <p className={styles.footerText}> Подкрепи БГ &copy;</p>
    </div>
  )
}
