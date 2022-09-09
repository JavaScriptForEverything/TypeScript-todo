import { useEffect } from 'react'
import ProductList from './components/productList'
import AddProduct from './components/addProduct'
import * as productReducer from './store/productReducer'
import { useAppDispatch, useAppSelector } from './store/hoots'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch( productReducer.getProducts() )
  }, [dispatch ])


  return (
    <>
      <AddProduct />
      <ProductList />
    </>
  )
}
export default App
