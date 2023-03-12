import { Document, Page, StyleSheet, Text, View, Font, Image } from '@react-pdf/renderer'

import Logo from './Logo'
import { DonationResponse } from 'gql/donations'
import { formatDateString } from 'common/util/date'
import { money } from 'common/util/money'

Font.register({
  family: 'Arial',
  src: 'public/fonts/Arial.ttf',
})

Font.load({ fontFamily: 'Arial' })

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    fontFamily: 'Arial',
  },
  backgroundImage: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  heading: {
    fontSize: '36',
    color: '#2A4E84',
    textAlign: 'center',
  },
  subheading: {
    color: '#2A4E84',
    textAlign: 'center',
    marginTop: '12',
    fontSize: '28',
  },
  text1: {
    textAlign: 'center',
    marginTop: '30',
    fontSize: '16',
  },
  text2: {
    textAlign: 'center',
    marginTop: '5',
    fontSize: '16',
  },
  name: {
    textAlign: 'center',
    fontSize: '30',
    marginTop: '28',
  },
  donationText: {
    textAlign: 'center',
    paddingTop: '5',
    width: '300',
    alignSelf: 'center',
    fontSize: '16',
  },
  donationRow: {
    textAlign: 'center',
    color: '#2A4E84',
    fontSize: '14',
    width: '450',
    height: '55',
    alignSelf: 'center',
  },
  dateAndSignView: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  date: {
    marginTop: '10',
    marginLeft: '50',
  },
  dateText: {
    marginTop: '5',
    marginLeft: '50',
    fontSize: '11',
  },
  members: {
    fontSize: '11',
    marginTop: '60',
    marginRight: '60',
    marginLeft: '50',
  },
  signs: {
    position: 'absolute',
    left: '350',
    top: '5',
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
  locationText: {
    fontSize: '10',
    textAlign: 'center',
    marginTop: '3',
  },
})

type Props = {
  donation: DonationResponse
}
export default function Certificate({ donation }: Props) {
  return (
    <Document title="Дарение">
      <Page size="LETTER" style={styles.page}>
        <Image src="public/img/pdf/background.png" style={styles.backgroundImage} />
        <View>
          <Logo />
          <Text style={styles.heading}>СЕРТИФИКАТ</Text>
          <Text style={styles.subheading}>за дарение № {donation.id.slice(0, 2)}</Text>
        </View>
        <View>
          <Text style={styles.text1}>С този сертификат Управителният съвет на</Text>
          <Text style={styles.text2}>Сдружение „Подкрепи БГ“ удостоверява, че:</Text>
          <Text style={styles.name}>
            {donation.person?.firstName} {donation.person?.lastName}
          </Text>
        </View>
        <View style={{ marginTop: '10' }}>
          <Text style={styles.donationText}>
            дари сума в размер на{' '}
            <Text style={styles.donationRow}>{money(donation?.amount ?? 0)}</Text>
          </Text>
          <Text style={styles.donationText}>за кампания:</Text>
          <Text style={styles.donationRow}>{donation?.targetVault?.campaign?.title ?? '-'}</Text>
        </View>
        <View style={styles.dateAndSignView}>
          <View>
            <Text style={styles.date}>{formatDateString(donation.createdAt)}</Text>
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
        <View style={styles.locationText}>
          <Text>Сдружение „Подкрепи БГ“, ЕИК 206398075</Text>
          <Text>гр. София, бул. „Александър Стамболийски“ № 136, ет. 2</Text>
        </View>
      </Page>
    </Document>
  )
}
