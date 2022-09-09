import { useAppDispatch, useAppSelector } from '../store/hoots'
import * as productReducer from '../store/productReducer'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'


const ProductList = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { products } = useAppSelector( state => state.product )

  const productDeleteHandler = (productId: string) => () => {
    dispatch(productReducer.removeProduct(productId))
  }
  const productUpdateHandler = (productId: string) => () => {
    const productFound = products.find( product => product._id === productId)
    if(productFound) dispatch(productReducer.getUpdatableProduct( productFound )) 
  }

  return (
    <>
      <List>
        {products.map(product => (
          <ListItem key={product._id} >
            <ListItemText primary={product.name} secondary={product.summary} />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemText sx={{ mr: 4 }}>{product.price}</ListItemText>
              <IconButton onClick={productUpdateHandler(product._id)}><EditIcon /></IconButton>
              <IconButton onClick={productDeleteHandler(product._id)}><DeleteIcon /></IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </>
  )
}
export default ProductList
