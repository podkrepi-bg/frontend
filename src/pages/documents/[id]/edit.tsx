import EditForm from 'components/documents/EditForm'
import Layout from 'components/cars/Layout'

export default function EditPage({ document }: any) {
  return (
    <>
      <Layout>
        <EditForm document={document} />
      </Layout>
    </>
  )
}

export async function getServerSideProps({ params }: any) {
  const req = await fetch(`http://localhost:5010/api/document/${params.id}`)
  const document = await req.json()

  return {
    props: {
      document,
    },
  }
}
