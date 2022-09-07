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



