import { Container } from "@mui/material"
import Layout from "components/client/layout/Layout"
import EditForm from "./EditForm"
import { useViewArticleById } from "common/hooks/campaign-news"


type Props = {
    articleId: string,
    slug:string,
    campaignTitle: string,
    isAdmin: boolean,
}
export default function NewsEditPage({articleId, slug, campaignTitle, isAdmin,} : Props){
  const { data: article, isLoading, isError }= useViewArticleById(articleId)
  if(isLoading || isError) {
    return <Layout/>
  }
    return (

    <Layout>
        <Container maxWidth={'md'}>

            <EditForm article={article} slug={slug} campaignTitle={campaignTitle} isAdmin={isAdmin} />
        </Container>
    </Layout>    
    )
}