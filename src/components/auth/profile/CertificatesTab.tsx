import Tab from './Tab'

function CertificatesTab(props: { value: number; index: number }) {
  const { value, index } = props

  return (
    <Tab value={value} index={index}>
      <h2>История на сертификати</h2>
    </Tab>
  )
}

export default CertificatesTab
