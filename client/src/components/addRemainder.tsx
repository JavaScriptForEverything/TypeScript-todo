import React, { useState } from 'react'

type AddRemainderProps = {
  onAddList: (title: string) => void
}
const AddRemainder = ({ onAddList }: AddRemainderProps): JSX.Element => {
  const [ title, setTitle ] = useState('')

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value)
  }

  const submitHandler = (evt: React.FormEvent) => {
    evt.preventDefault()
    
    if(!title) return
    
    onAddList(title)
    setTitle('')

  }

  return (
    <>
      <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column' }}>
        <input 
          type='text' 
          value={title} 
          onChange={changeHandler} 
        />

        <button style={{ width: 200, margin: '16px 0'}}>Add</button>
      </form>
    </>
  )
}
export default AddRemainder
