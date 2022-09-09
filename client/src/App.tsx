import { useEffect, useState } from 'react'
import ProductList from './components/productList'
import AddProduct from './components/addProduct'
import * as productReducer from './store/productReducer'
import { Tproduct } from './types/product'
import { IFields } from './types/addProduct'

const App = () => {
  const [ products, setProducts ] = useState<Tproduct[]>([])
  const [ product, setProduct ] = useState<Tproduct>({
    _id: '',
    name: '',
    price: 0,
    summary: ''
  })

  useEffect(() => {
    (async () => {
      const getProducts = await productReducer.getProducts()
      setProducts(getProducts)
    })()
  }, [product])


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


  const productEditHandler = (productId: string) => () => {
    const foundProduct = products.find( product => product._id === productId)
    if(foundProduct) setProduct(foundProduct)
  }
  const updateProductSubmitHandler = async (fields: IFields) => {
    const updatedProduct = await productReducer.updateProduct(product._id, fields)
    const updatedProducts = products.map(item => item._id === updatedProduct._id ? { ...item, updatedProduct } : item )
    setProducts(updatedProducts)

  }

  return (
    <>
      <AddProduct 
        onAddProduct={addProductHandler}
        updateProductData={product}
        clearProductData={setProduct}
        updateProductSubmitHandler={updateProductSubmitHandler}
      />
      <ProductList 
        products={products} 
        onClickDeleteProduct={productDeleteHandler}
        onClickEditProduct={productEditHandler}
      />

      
    </>
  )
}
export default App
