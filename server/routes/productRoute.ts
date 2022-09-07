import { Router } from 'express'
import * as productController from '../controllers/productController'

const router = Router()
export default router

router.get('/', productController.getProducts)
router.post('/', productController.addProduct)


