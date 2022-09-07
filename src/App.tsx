import { useEffect, useState } from 'react'
import AddRemainder from './components/addRemainder'
import RemenderList from './components/rementerList'
import * as productReducer from './store/productReducer'
import { Remainder } from './types/remainder'


const App = () => {
  const [ remainders, setRemainders ] = useState<Remainder[]>([])
  console.log({ length: remainders.length })

  useEffect(() => {
    (async() => {
      const todos = await productReducer.getTodos()
      setRemainders(todos)
    })()
  }, [])


  // const listItemDeleteHandler = () => {
  const listItemDeleteHandler = (id: number) => () => {
    const filteredRemainders: Remainder[] = remainders.filter( item => item.id !== id )
    setRemainders(filteredRemainders)
  }

  const listAddHandler = async (title: string) => {
    // console.log({ title })
    const addRemainder = await productReducer.addTodo(title)
    setRemainders([ addRemainder, ...remainders ])
  }

  return (
    <div>
      <AddRemainder 
        onAddList={listAddHandler}
      />

      <br /> <br />
      <RemenderList 
        items={remainders} 
        onRemoveTodo={listItemDeleteHandler}
      />
    </div>
  )
}
export default App
