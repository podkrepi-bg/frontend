import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('components/pdf/React-Pdf'), { ssr: false })

function Home() {
  return (
    <div>
      ddd
      <DynamicComponentWithNoSSR />
    </div>
  )
}

export default Home
