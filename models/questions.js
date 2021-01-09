import mongoose from 'mongoose'

const Schema = mongoose.Schema

const questionSchema = new Schema(
  {
    title: {
      type: String,
      minlength: [1, '問題最少一個字以上。'],
      required: [true, '缺少問題。']
    },
    content: {
      type: String,
      minlength: [1, '回答最少一個字以上。'],
      required: [true, '缺少回答。']
    }
  },
  {
    versionKey: false
  }
)

const questions = mongoose.model('questions', questionSchema)

export default questions
