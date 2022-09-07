import express, { Application } from 'express'
import morgan from 'morgan'
import { connection } from 'mongoose'
import database from './models/database'

import * as errorHandler from './controllers/errorController'
import productRouter from './routes/productRoute'

const app: Application = express()

app.use(express.json())   // body-barser by default added in exporesv5

// morgan show api logs, to indicate which route it hits 
app.use(morgan('dev'))

app.use('/api/products', productRouter)

app.use('*', errorHandler.routeNotFound)
app.use(errorHandler.globalErrorHandler)



const PORT: number = 5000;
app.listen(PORT, async() => {
  await database()
  console.log(`Server is running on port: ${PORT} on database: ${connection.host}`)
})
