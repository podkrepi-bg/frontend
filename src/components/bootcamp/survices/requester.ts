import { Method } from 'axios'

type Endpoint = {
  url: string
  method: Method
}
const baseUrl = 'http://localhost:5010/api/bootcamp/'
export const endpoints = {
  bootcamp: {
    createTask: <Endpoint>{ url: baseUrl, method: 'POST' },
    allTasks: <Endpoint>{ url: '/bootcamp', method: 'GET' },
    viewTask: (id: string) => <Endpoint>{ url: `${baseUrl}${id}`, method: 'GET' },
    editTask: (id: string) => <Endpoint>{ url: `${baseUrl}${id}`, method: 'PATCH' },
    deleteTask: (id: string) => <Endpoint>{ url: `${baseUrl}${id}`, method: 'DELETE' },
    deleteTasks: <Endpoint>{
      url: `${baseUrl}delete-many`,
      method: 'POST',
    },
  },
}
