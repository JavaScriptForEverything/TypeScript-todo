import React, { useEffect, useState } from 'react'
import * as productReducer from '../store/productReducer'
import { useAppDispatch, useAppSelector } from '../store/hoots'
import { IFields } from '../types/addProduct'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

type InputProps = {
  name: string
  type: string
  label: string
  rows?: number
}
const inputItems: InputProps[] = [
  { name: 'name',     type: 'text',     label: 'Title' },
  { name: 'summary',  type: 'text',     label: 'Summary', rows: 2 },
  { name: 'price',    type: 'number' ,  label: 'price'},
]


const AddProduct = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { loading, updatableProduct } = useAppSelector( state => state.product )

  const [ fields, setFields ] = useState<IFields>({
    name: '',
    summary: '',
    price: 0
  })
  const [ fieldsError, setFieldsError ] = useState<IFields>({
    name: '',
    summary: '',
    price: 0
  })

  useEffect(() => {
    setFields({
      name: updatableProduct.name,
      price: updatableProduct.price as number,
      summary: updatableProduct.summary
    })
  }, [updatableProduct])

  const changeHandler = (name: string) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [name]: evt.target.value })
  }

  const clearButtonHandler = () => {
    // 1. clear product = {} empty too
    dispatch(productReducer.getUpdatableProduct({ _id: '', name: '', price: 0, summary: '' } )) 

    // 2. clear form's input values
    setFields({ name: '', summary: '', price: 0 })

  }

  const submitHandler = (evt: React.FormEvent) => {
    evt.preventDefault()

    // just here but we will use it for validation later
    if(false) return setFieldsError(fields)

    if(updatableProduct) {
      dispatch(productReducer.updateProduct(updatableProduct._id, fields))
      dispatch(productReducer.getUpdatableProduct({ _id: '', name: '', price: 0, summary: '' } )) 
      setFields({ name: '', summary: '', price: 0 })

      return
    }     
    dispatch(productReducer.addProduct(fields))
    setFields({ name: '', summary: '', price: 0 })
  }

  return (
    <>
     <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

      {inputItems.map(({ name, label, type, rows }) => (
        <TextField 
          sx={{ my: 1 }}
          key={name}
          label={label}
          type={type}
          value={fields[name]}
          onChange={changeHandler(name)}

          error={!fields[name] || !!fieldsError[name]}
          helperText={fieldsError[name] ? fieldsError[name] : '' }

          multiline
          rows={rows ? rows : 1}
        />
      ))}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button 
            variant='outlined' 
            onClick={clearButtonHandler}
          >Clear</Button>

          <Button 
            type='submit' 
            variant='contained' 
          >
            { !!updatableProduct._id 
              // ? 'Update'
              ?  (loading ? 'Updating...' : 'Update')
              : 'Add' 
            }
            </Button>
        </Box>
     </form>
    </>
  )
}
export default AddProduct
