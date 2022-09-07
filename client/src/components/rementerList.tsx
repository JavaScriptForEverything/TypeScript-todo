import React from 'react'
import { Remainder } from '../types/remainder'


type RemainderListProps = {
  items: Remainder[]
  // onRemoveTodo: () => void
  onRemoveTodo: (id: number) => () => void
}

const RemenderList = ({ items, onRemoveTodo }: RemainderListProps) => {
  console.log(items[0])

  return (
    <>
     <ul>
      {items.map( item => (
        <li key={item.id}>
          {item.title}
          <button 
            style={{ marginLeft: 10 }}
            // onClick={onRemoveTodo}
            onClick={onRemoveTodo(item.id)}
          >Delete</button>
        </li>
      ))}
     </ul>
    </>
  )
}
export default RemenderList
