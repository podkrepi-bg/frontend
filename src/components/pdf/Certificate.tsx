import { Document, Page, StyleSheet, Text, View, Font, Image } from '@react-pdf/renderer'

import Logo from './Logo'
import { DonationResponse } from 'gql/donations'
import { PersonResponse } from 'gql/person'
import { formatDateString } from 'common/util/date'

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
})

Font.load({ fontFamily: 'Roboto' })

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    // @ts-expect-error non-existent value passed to display property enum
    display: 'block',
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
    marginTop: '55',
    marginLeft: '25',
  },
  dateText: {
    fontFamily: 'Roboto',
    marginTop: '5',
    marginLeft: '25',
  },
  members: {
    fontFamily: 'Roboto',
    fontSize: '10',
    marginTop: '90',
    marginRight: '60',
  },
  signs: {
    position: 'absolute',
    left: '350',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  signImage: {
    width: '50',
    height: '50',
  },
  thankYouImage: {
    width: '120',
    height: '120',
    marginLeft: '240',
    marginTop: '20',
  },
})

type Props = {
  donation: DonationResponse
  person?: PersonResponse
}
export default function Certificate({ donation, person }: Props) {
  const name = `${person?.firstName} ${person?.lastName}`
  const formattedDate = formatDateString(donation.createdAt)
  return (
    <Document title="Дарение">
      <Page size="LETTER" style={styles.page}>
        <Image src="public/img/pdf/background.png" style={styles.backgroundImage} />
        <View>
          <Logo />
          <Text style={styles.heading}>СЕРТИФИКАТ</Text>
          <Text style={styles.subheading}>за дарение № {donation.id}</Text>
        </View>
        <View>
          <Text style={styles.text1}>С този сертификат Управителният съвет на Сдружение</Text>
          <Text style={styles.text1}>„Подкрепи БГ“ удостоверява, че:</Text>
          <Text style={styles.name}>{name}</Text>
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
          <View style={styles.signs}>
            <Image src="public/img/pdf/sign.png" style={styles.signImage} />
            <Image src="public/img/pdf/sign1.png" style={styles.signImage} />
          </View>
          <View style={styles.members}>
            <Text>Членове на УС</Text>
            <Text>Станка Черкезова-Калайджиева</Text>
            <Text>Ана Николова</Text>
          </View>
        </View>
        <Image src="public/img/pdf/thank-you.png" style={styles.thankYouImage} />
      </Page>
    </Document>
  )
}
