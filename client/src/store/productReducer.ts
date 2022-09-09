import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IFields } from '../types/addProduct'
import { Tproduct } from '../types/product'
import { AppDispatch } from './index'

axios.defaults.baseURL = 'http://localhost:5000'

interface IinitialState {
  loading: boolean
  error: string
  products: Tproduct[]
  updatableProduct: Tproduct
}

const initialState: IinitialState = {
  loading: false,
  error: '',
  products: [],
  updatableProduct: {
    _id: '',
    name: '',
    price: 0,
    summary: ''
  }
}


const { reducer, actions } = createSlice({
  name: 'product',
  initialState,
  reducers: {
    requested: (state) => ({
      ...state,
      loading: true,
      error: ''
    }),
    failed: (state, action: PayloadAction<string>) => ({
      ...state,
      loading: false,
      error: action.payload
    }),

    getProducts: (state, action: PayloadAction<Tproduct[]>) => ({
      ...state,
      loading: false,
      products: action.payload
    }),
    addProduct: (state, action: PayloadAction<Tproduct>) => ({
      ...state,
      loading: false,
      products: [ action.payload, ...state.products ]
    }),
    getUpdatableProduct: (state, action: PayloadAction<Tproduct>) => ({
      ...state,
      loading: false,
      updatableProduct: action.payload
    }),
    updateProduct: (state, action: PayloadAction<Tproduct>) => ({
      ...state,
      loading: false,
      products: state.products.map( product => product._id === action.payload._id ? 
        { ...action.payload, ...product } : product)
    }),
    removeProduct: (state, action: PayloadAction<string>) => ({
      ...state,
      loading: false,
      products: state.products.filter( product => product._id !== action.payload)
    }),

  }
})
export default reducer











/**
 * GetProductsTpros will be the Retrun Properties from server API:
 *    status: 'success',
 *    length: products.length,
 *    products,
 */
type GetProductsProps = {
  products: Tproduct[]        
}

/**
 *  AddProductProps will be the props of exact copy ProductSchemaProps
 *    name: { type: String, ... }     => name: string,
 *    email: { type: String, ... }    => email: string,
 *    ...
 */
type AddProductProps = {
  product: Tproduct
}

export const getProducts = () => async (dispatch: AppDispatch) => {
  dispatch( actions.requested() )
  const { data: { products } } = await axios.get<GetProductsProps>('/api/products')
  dispatch(actions.getProducts(products))
}

export const addProduct = (data:IFields) => async (dispatch: AppDispatch) => {
  dispatch( actions.requested() )
  const { data: { product } } = await axios.post<AddProductProps>('/api/products', data)
  dispatch(actions.addProduct(product))
}


export const getUpdatableProduct = (product: Tproduct ) => async(dispatch: AppDispatch) => {
  dispatch(actions.getUpdatableProduct(product))
}
export const updateProduct = (productId: string, data:IFields) => async(dispatch: AppDispatch) => {
  dispatch( actions.requested() )
  const { data: { product } } = await axios.patch<AddProductProps>(`/api/products/${productId}`, data)
  dispatch(actions.updateProduct(product))
}
export const removeProduct = (productId: string) => async (dispatch: AppDispatch) => {
  dispatch( actions.requested() )
  const { data: { product } } = await axios.delete<AddProductProps>(`/api/products/${productId}`)
  dispatch(actions.removeProduct(product._id))
}