import React from 'react'
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
  Note,
  Link,
  usePDF,
} from '@react-pdf/renderer'
import { Button, Grid } from '@mui/material'

const styles = StyleSheet.create({
  viewer: {
    height: '100%',
    width: '60%',
  },
  firstPage: {
    display: 'flex',
    flexDirection: 'column',
  },
})

export default function DemoPdf() {
  const MyDoc = () => (
    <Document>
      <Page>
        <View style={styles.firstPage}>
          <Text>My document data</Text>
          <Note>This is a note</Note>
        </View>
      </Page>
      <Page>
        <View>
          <Image src="/img/og-image.jpg" />
          <Link src="https://react-pdf.org/components#link">dmdmdm</Link>
        </View>
      </Page>
    </Document>
  )
  const [instance] = usePDF({ document: <MyDoc /> })

  const open = () => {
    window.open(instance.url || '')
  }

  return (
    <>
      <Grid>
        {/* <PDFViewer style={styles.viewer} showToolbar={true}>
          <MyDoc />
        </PDFViewer>
        <Button>
          <PDFDownloadLink document={<MyDoc />} fileName="mydoc.pdf">
            {({ loading }) => (loading ? 'Loading document...' : 'Download now!')}
          </PDFDownloadLink>
        </Button> */}
        <iframe src={instance.url || ''} height="300%" width="100%" typeof="application/pdf" />
        <Button onClick={open}>open</Button>
      </Grid>
    </>
  )
}
