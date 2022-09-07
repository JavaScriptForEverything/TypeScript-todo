import express, { Application } from 'express'
import morgan from 'morgan'

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
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
