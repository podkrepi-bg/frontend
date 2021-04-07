export const getServerSideProps = () => ({ props: {} })

export default function TestError() {
  throw new Error('Test Error')
}
