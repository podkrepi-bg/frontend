import Tab from './Tab'

function CertificatesTab(props: any) {
  const { value, index } = props

  return (
    <Tab value={value} index={index}>
      <h2>История на сертификати</h2>
    </Tab>
  )
}

export default CertificatesTab
