import React from 'react'
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  PDFViewer,
  Text,
  StyleSheet,
  Image,
  Note,
  Link,
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
  return (
    <>
      <Grid>
        <PDFViewer style={styles.viewer} showToolbar={true}>
          <MyDoc />
        </PDFViewer>
        <Button>
          <PDFDownloadLink document={<MyDoc />} fileName="mydoc.pdf">
            {({ loading }) => (loading ? 'Loading document...' : 'Download now!')}
          </PDFDownloadLink>
        </Button>
      </Grid>
    </>
  )
}
