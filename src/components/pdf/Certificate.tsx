import { Document, Page, StyleSheet, Text, View, Font } from '@react-pdf/renderer'

import Logo from './Logo'
import { DonationResponse } from 'gql/donations'
import { PersonResponse } from 'gql/person'
import { format } from 'date-fns'

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
})

Font.load({ fontFamily: 'Roboto' })

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E1E4E5',
  },
  heading: {
    fontFamily: 'Roboto',
    fontSize: '30',
    color: '#29599D',
    textAlign: 'center',
  },
  subheading: {
    fontFamily: 'Roboto',
    color: '#29599D',
    textAlign: 'center',
  },
  text1: {
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginTop: '15',
  },
  name: {
    fontFamily: 'Roboto',
    textDecoration: 'underline',
    textAlign: 'center',
    fontSize: '50',
  },
  donationText: {
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  dateAndSignView: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '50',
  },
  date: {
    fontFamily: 'Roboto',
    textDecoration: 'underline',
  },
  dateText: {
    fontFamily: 'Roboto',
  },
  members: {
    fontFamily: 'Roboto',
    fontSize: '10',
  },
})

type Props = {
  donation: DonationResponse
  person?: PersonResponse
}
export default function Certificate({ donation, person }: Props) {
  const name = `${person?.firstName} ${person?.lastName}`
  const formattedDate = format(Date.parse(donation.createdAt), 'dd.MM.yyyy')
  return (
    <Document title="Дарение">
      <Page size="A4" style={styles.page}>
        <View>
          <Logo />
          <Text style={styles.heading}>СЕРТИФИКАТ</Text>
          <Text style={styles.subheading}>за дарение № {donation.id}</Text>
        </View>
        <View>
          <Text style={styles.text1}>С този сертификат Управителният съвет на Сдружение</Text>
          <Text style={styles.text1}>„Подкрепи БГ“ удостоверява, че:</Text>
          <Text style={styles.name} fixed>
            {name}
          </Text>
        </View>
        <View>
          <Text style={styles.donationText}>
            дари сума в размер на <Text style={{ color: '#29599D' }}>{donation?.amount} </Text>
            лева за дейността на сдружението.
          </Text>
        </View>
        <View style={styles.dateAndSignView}>
          <View>
            <Text style={styles.date}>{formattedDate}</Text>
            <Text style={styles.dateText}>Дата</Text>
          </View>
          <View>
            <Text>_______________</Text>
            <Text style={styles.members}>Членове на УС</Text>
            <Text style={styles.members}>Станка Черкезова-Калайджиева</Text>
            <Text style={styles.members}>Ана Николова</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
