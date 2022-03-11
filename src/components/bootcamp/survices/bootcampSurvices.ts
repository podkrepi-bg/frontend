import axios, { AxiosResponse } from 'axios'
import { MutationFunction, useQuery } from 'react-query'
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
  firstName?: string
  lastName?: string
}
export type BootcampEdit = {
  id: string
  status: string
  title: string
  email: string
  message: string
  date: string
  firstName?: string
  lastName?: string
}

export function useTasksList() {
  return useQuery<Bootcamp[]>(endpoints.bootcamp.allTasks.url)
}

export const createTask: MutationFunction<AxiosResponse, BootcampInput> = async (
  data: BootcampInput,
) => {
  return await axios.post<BootcampInput, AxiosResponse>(endpoints.bootcamp.createTask.url, data)
}

export const editTask: MutationFunction<AxiosResponse<Bootcamp>, BootcampEdit> = async (
  data: BootcampEdit,
) => {
  return await axios.patch<BootcampEdit, AxiosResponse<Bootcamp>>(
    endpoints.bootcamp.editTask(data.id).url,
    data,
  )
}

export const deleteTasks: MutationFunction<AxiosResponse, []> = async (data: []) => {
  return await axios.post<BootcampInput, AxiosResponse>(endpoints.bootcamp.deleteTasks.url, data)
}

export const deleteTask: MutationFunction<AxiosResponse<Bootcamp>, string> = async (id: string) => {
  return await axios.delete<BootcampInput, AxiosResponse<Bootcamp>>(
    endpoints.bootcamp.deleteTask(id).url,
  )
}
