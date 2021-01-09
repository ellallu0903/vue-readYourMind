import mongoose from 'mongoose'

const Schema = mongoose.Schema

const knowledgeSchema = new Schema(
  {
    title: {
      type: String,
      minlength: [1, '標題最少一個字以上。'],
      required: [true, '缺少 Knowledge 標題。']
    },
    content: {
      type: String,
      minlength: [1, '內容最少一個字以上。'],
      required: [true, '缺少 Knowledge 內容。']
    }
  },
  {
    versionKey: false
  }
)

const knowledges = mongoose.model('knowledges', knowledgeSchema)

export default knowledges
