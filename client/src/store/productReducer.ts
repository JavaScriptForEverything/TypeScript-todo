import axios from 'axios'
import { Remainder } from '../types/remainder'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'


export const getTodos  = async () => {
  const { data } = await axios.get<Remainder[]>('/todos')
  return data
}

export const addTodo  = async (title: string) => {
  /**
   * why we need only title, we also need id isn't it ?
   *  - Yes, but when we add todo, it generate id from server side and
   *    our list item will be reloaded when new value comes,
   * 
   * But if we use Redux, then we want to update redux store, with exact
   * value as server pass, than we need to pass id too, which is unique
   */
  const { data } = await axios.post<Remainder>('/todos', { title })
  return data
}

export const removeTodo  = async (id: number) => {
  const { data } = await axios.delete<Remainder>(`/todos/${id}`)
  return data
}