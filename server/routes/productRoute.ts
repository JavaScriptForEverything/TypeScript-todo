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


