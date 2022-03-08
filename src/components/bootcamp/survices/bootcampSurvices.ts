import axios, { AxiosResponse } from 'axios'
import { MutationFunction, QueryFunction, useQuery } from 'react-query'
import { endpoints } from './requester'

export type Bootcamp = {
  id: string
  createdAt: string
  updatedAt: string
  status: string
  title: string
  email: string
  message: string
  date: string
  firstName?: string
  lastName?: string
}

export type BootcampInput = {
  status: string
  title: string
  email: string
  message: string
  date: string
  firstName: string
  lastName: string
}

export const queryFn: QueryFunction = async function ({ queryKey }) {
  const response = await axios.get(queryKey.join('/'))
  return await response.data
}

export function useTasksList() {
  return useQuery<Bootcamp[]>(endpoints.bootcamp.allTasks.url)
}

export const createTask: MutationFunction<AxiosResponse, BootcampInput> = async (
  data: BootcampInput,
) => {
  return await axios.post<BootcampInput, AxiosResponse>(endpoints.bootcamp.createTask.url, data)
}

export const deleteTasks: MutationFunction<AxiosResponse, []> = async (data: []) => {
  return await axios.post<BootcampInput, AxiosResponse>(endpoints.bootcamp.deleteTasks.url, data)
}

export const deleteTask: MutationFunction<AxiosResponse<Bootcamp>, string> = async (id: string) => {
  return await axios.delete<BootcampInput, AxiosResponse<Bootcamp>>(
    endpoints.bootcamp.deleteTask(id).url,
  )
}
