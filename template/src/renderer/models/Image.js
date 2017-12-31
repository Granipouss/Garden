import mongoose from 'mongoose'

const schema = mongoose.Schema({
  height: Number,
  width: Number,
  url: String
})

export default mongoose.model('Image', schema)
