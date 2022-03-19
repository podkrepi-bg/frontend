import BootcampComponent from 'components/bootcamp/BootcampPageComponent'
import { securedProps } from 'middleware/auth/keycloak'

export const getServerSideProps = securedProps

const BootcampPage = () => {
  return <BootcampComponent />
}

export default BootcampPage
