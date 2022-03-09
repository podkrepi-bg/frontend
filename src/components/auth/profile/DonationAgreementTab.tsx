import Tab from './Tab'

function DonationAgreementTab(props: any) {
  const { value, index } = props

  return (
    <Tab value={value} index={index}>
      <h2>Договор за дарение</h2>
    </Tab>
  )
}

export default DonationAgreementTab
