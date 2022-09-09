import { Tproduct } from '../types/product'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

type ProductListProps = {
  products: Tproduct[]
  onClickDeleteProduct: (productId: string) => () => void
  onClickEditProduct: (productId: string) => () => void
}

const ProductList = ( props: ProductListProps): JSX.Element => {
  const {
    products,
    onClickDeleteProduct,
    onClickEditProduct
  } = props

  return (
    <>
      <List>
        {products.map(product => (
          <ListItem key={product._id} >
            <ListItemText primary={product.name} secondary={product.summary} />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemText sx={{ mr: 4 }}>{product.price}</ListItemText>
              <IconButton onClick={onClickEditProduct(product._id)}><EditIcon /></IconButton>
              <IconButton onClick={onClickDeleteProduct(product._id)}><DeleteIcon /></IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </>
  )
}
export default ProductList
