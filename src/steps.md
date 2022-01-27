1.Creating new folder in pages folder to create a route.
1.1. Creating index.tsx file => will be the root route -> in my case -> https://localhost:3040/bootcamp-interns
1.2 Creating a [id].tsx file => will be the route on click of any row and the id will be dynamic => https://localahost:3040/bootcamp-interns/${id}
In pages folder I only import a page from components and do something on the "back-end" so to say (e.g fetching data before rendering) so I
can have the data even with the first render of the given page/component (SSR);
-index.tsx file will have few imports which we will use in it. \*

2.Creating new folder in the components folder to create the page I want to render for the client.
2.1 Create bootcamp-interns folder which will hold all our files for our page.
2.2 Create BootcampInternPage.tsx inside of it and export the same name as function as default
2.3 Create InternDataGrid.tsx file and inside of it import:
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
create the custom columns before creating the react component

3.In api-endpoints.ts file create new endpoint based on the endpoint I've created at the API.
3.1 listBootcampIntern: <Endpoint>{ url: '/bootcamp-intern', method: 'GET' }
3.2 Also in src/common/routes.ts create a route for bootcamp-interns
bootcampIntern: {
index: '/bootcamp-interns',
view: (id: string) => `/bootcamp-interns/${id}`,
}

4.In common/hooks create a hook to fetch data using keycloak and react-query
