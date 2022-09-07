import React, { useState } from 'react'

const HookComponent = () => {
  const [ name, setName ] = useState('')
  console.log({ name })

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value)
  }

  return (
    <>
     <input  
        value={name}
        onChange={changeHandler}
     />
    </>
  )
}
export default HookComponent
