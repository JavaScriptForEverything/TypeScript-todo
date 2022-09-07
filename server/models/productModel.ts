import { Schema, model } from 'mongoose'

type ProductSchemaProps = {
  name: string
  summary: string
  price?: number
}

const productSchema = new Schema<ProductSchemaProps>({
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

export default model<ProductSchemaProps>('Product', productSchema)