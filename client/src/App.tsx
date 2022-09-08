import { useEffect, useState } from 'react'
import ProductList from './components/productList'
import AddProduct from './components/addProduct'
import * as productReducer from './store/productReducer'
import { Tproduct } from './types/product'
import { IFields } from './types/addProduct'

const App = () => {
  const [ products, setProducts ] = useState<Tproduct[]>([])

  useEffect(() => {
    (async () => {
      const getProducts = await productReducer.getProducts()
      setProducts(getProducts)
    })()
  }, [])


  const addProductHandler = async (fields: IFields) => {
    const product = await productReducer.addProduct(fields)
    setProducts([ product, ...products ])
    
  }

  const productDeleteHandler = (productId: string) => async() => {
    const product = await productReducer.removeProduct(productId)
    if(!product) return

    const filteredProducts = products.filter(item => item._id !== productId )
    setProducts(filteredProducts)
  }


  return (
    <>
      <AddProduct 
        onAddProduct={addProductHandler}
      />
      <ProductList 
        products={products} 
        onClickDeleteProduct={productDeleteHandler}
      />

      
    </>
  )
}
export default App
