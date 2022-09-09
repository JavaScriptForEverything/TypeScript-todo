import axios from 'axios'
import { IFields } from '../types/addProduct'
import { Tproduct } from '../types/product'

axios.defaults.baseURL = 'http://localhost:5000'

type GetProductsProps = {
  products: Tproduct[]
}

type AddProductProps = {
  product: Tproduct
}

export const getProducts = async () => {
  const { data: { products } } = await axios.get<GetProductsProps>('/api/products')

  return products
}

export const addProduct = async (data:IFields) => {
  const { data: { product } } = await axios.post<AddProductProps>('/api/products', data)

  return product
}

export const updateProduct = async (productId: string, data:IFields) => {
  const { data: { product } } = await axios.patch<AddProductProps>(`/api/products/${productId}`, data)

  return product
}
export const removeProduct = async (productId: string) => {
  const { data: { product } } = await axios.delete<AddProductProps>(`/api/products/${productId}`)

  return product
}