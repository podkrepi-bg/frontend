import { Document, Page, StyleSheet, Text, View, Font } from '@react-pdf/renderer'
import Logo from '../utils/Logo'

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
})

Font.load({ fontFamily: 'Roboto' })

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E1E4E5',
  },
  view: {
    border: '3px solid #899CB5',
  },
  heading: {
    fontFamily: 'Roboto',
    fontSize: '100',
  },
})

export default function Certificate(): JSX.Element {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.view}>
          <Logo />
          <Text style={styles.heading}>СЕРТИФИКАТ №</Text>
        </View>
      </Page>
    </Document>
  )
}
