## Express with TypeScript

        . TypeScript
        . Express
        . Mongoose

###### Setup Express App

```
----------[ app.ts ]----------

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
app.listen(PORT, async() => console.log(`Server is running on port: ${PORT}`))



----------[ routes/productRoute.ts ]----------

import { Router } from 'express'
import * as productController from '../controllers/productController'

const router = Router()
export default router

router
  .route('/')
  .get(productController.getProducts)
  .post(productController.addProduct)

router
  .route('/:productId')
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct)


----------[ controllers/errorController.ts ]----------

import { ErrorRequestHandler, RequestHandler } from "express"

export const routeNotFound: RequestHandler = (req, res, next) => {
  res.status(400).json({
    status: 'error',
    message: `The route '${req.originalUrl}' not found.`
  })
}

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(400).json({
    status: 'failed',
    message: err.message,
    stack: err.stack
  })
}


----------[ controllers/productController.ts ]----------

import { RequestHandler } from 'express'

export const getProducts: RequestHandler = async (req, res, next) => {
  // return next( new Error('Something is wrong') )

  res.status(200).json({
    status: 'success',
    products: []
  })
}



export const addProduct: RequestHandler = async (req, res, next) => {

  res.status(201).json({
    status: 'success',
    product: req.body
  })
}


export const updateProduct: RequestHandler = async (req, res, next) => {
  const { productId } = req.params

  res.status(201).json({
    status: 'success',
    product: req.body
  })
}

export const deleteProduct: RequestHandler = async (req, res, next) => {
  const { productId } = req.params

  res.status(201).json({
    status: 'success',
    product: req.params
  })
}
```


###### Connect Mongoose With Express App

        . Get Products
        . Create Product
        . Update Product By productId
        . Delete Product By productId


```
----------[ models/database.ts ]----------

import { connect, connection } from "mongoose";

const DATABASE: string = 'mongodb://localhost:27017/typescript'
export default () => {
  if( connection.readyState >= 1 ) return

  return connect(DATABASE).catch( err => console.log('database connection failed'))
}


----------[ app.ts ]----------

...
import { connection } from 'mongoose'
import database from './models/database'

...
app.listen(PORT, async() => {
  await database()
  console.log(`Server is running on port: ${PORT} on database: ${connection.host}`)
})


----------[ models/productModel.ts ]----------

import { Schema, model } from 'mongoose'

type TProduct = {
  name: string
  summary: string
  price?: number
}

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  summary: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    default: 200
  },

}, {
  timestamps: true
})

export default model<TProduct>('Product', productSchema)
----------[ controllers/productController.ts ]----------

import { RequestHandler } from 'express'
import Product from '../models/productModel'

export const getProducts: RequestHandler = async (req, res, next) => {
  // return next( new Error('Something is wrong') )

  const products = await Product.find()

  res.status(200).json({
    status: 'success',
    length: products.length,
    products
  })
}



export const addProduct: RequestHandler = async (req, res, next) => {
  const product = await Product.create(req.body)

  res.status(201).json({
    status: 'success',
    product
  })
}


export const updateProduct: RequestHandler = async (req, res, next) => {
  const { productId } = req.params
  const product = await Product.findByIdAndUpdate(productId, req.body)

  res.status(201).json({
    status: 'success',
    product
  })
}

export const deleteProduct: RequestHandler = async (req, res, next) => {
  const { productId } = req.params
  const product = await Product.findByIdAndDelete(productId)

  res.status(201).json({
    status: 'success',
    product
  })
}
```