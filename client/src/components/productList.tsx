import React, { useEffect, useState } from 'react'
import { Tproduct } from '../types/product'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'

import DeleteIcon from '@mui/icons-material/Delete'

type ProductListProps = {
  products: Tproduct[]
  onClickDeleteProduct: (productId: string) => () => void
}

const ProductList = ({ products, onClickDeleteProduct }: ProductListProps): JSX.Element => {

  return (
    <>
      <List>
        {products.map(product => (
          <ListItem key={product._id} >
            <ListItemText primary={product.name} secondary={product.summary} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ListItemText>{product.price}</ListItemText>
              <IconButton onClick={onClickDeleteProduct(product._id)}><DeleteIcon /></IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </>
  )
}
export default ProductList
