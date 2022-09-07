import { RequestHandler } from 'express'

export const getProducts: RequestHandler = (req, res, next) => {
  // return next( new Error('Something is wrong') )

  res.status(200).json({
    status: 'success',
    products: []
  })
}



export const addProduct: RequestHandler = (req, res, next) => {
  res.status(201).json({
    status: 'success',
    product: req.body
  })
}