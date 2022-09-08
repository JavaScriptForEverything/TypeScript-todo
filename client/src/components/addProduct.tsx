import React, { useState } from 'react'
import { IFields } from '../types/addProduct'

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


interface AddProductProps {
  onAddProduct: (fields: IFields) => void
}

const AddProduct = ({ onAddProduct }: AddProductProps): JSX.Element => {
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

  const changeHandler = (name: string) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [name]: evt.target.value })
  }

  const submitHandler = (evt: React.FormEvent) => {
    evt.preventDefault()

    onAddProduct(fields)
    setFields({
      name: '',
      summary: '',
      price: 0
    })
    // console.log(fields)
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

      <Button
        type='submit'
        variant='contained'
      >Add</Button>
     </form>
    </>
  )
}
export default AddProduct
