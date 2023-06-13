import { Container } from "@mui/material"
import Layout from "components/client/layout/Layout"
import CreateForm from "./CreateForm"

type Props = {
    campaignId: string,
    campaignTitle: string,
    isAdmin: boolean,
    slug:string
}

export default function NewsCreatePage({campaignId, slug, campaignTitle, isAdmin}: Props){
    return (

    <Layout>
        <Container maxWidth={'md'}>

       <CreateForm campaignId={campaignId} campaignTitle={campaignTitle} slug={slug} isAdmin={isAdmin}/> 
        </Container>
    </Layout>
    )
}