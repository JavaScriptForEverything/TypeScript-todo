import { connect, connection } from "mongoose";

const DATABASE: string = 'mongodb://localhost:27017/typescript'
export default () => {
  if( connection.readyState >= 1 ) return

  return connect(DATABASE).catch( err => console.log('database connection failed'))
}
