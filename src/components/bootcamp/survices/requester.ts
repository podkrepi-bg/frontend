import { Method } from 'axios'

type Endpoint = {
  url: string
  method: Method
}

export const endpoints = {
  bootcamp: {
    createTask: <Endpoint>{ url: 'http://localhost:5010/api/bootcamp/', method: 'POST' },
    allTasks: <Endpoint>{ url: '/bootcamp', method: 'GET' },
    viewTask: (id: string) =>
      <Endpoint>{ url: `http://localhost:5010/api/bootcamp/${id}`, method: 'GET' },
    editTask: (id: string) =>
      <Endpoint>{ url: `http://localhost:5010/api/bootcamp/${id}`, method: 'PATCH' },
    deleteTask: (id: string) =>
      <Endpoint>{ url: `http://localhost:5010/api/bootcamp/${id}`, method: 'DELETE' },
    deleteTasks: <Endpoint>{
      url: 'http://localhost:5010/api/bootcamp/delete-many',
      method: 'POST',
    },
  },
}
