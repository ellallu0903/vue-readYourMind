import mongoose from 'mongoose'

const Schema = mongoose.Schema

const aboutSchema = new Schema(
  {
    title: {
      type: String,
      minlength: [1, '標題最少一個字以上。'],
      required: [true, '缺少 About 標題。']
    },
    content: {
      type: String,
      minlength: [1, '內容最少一個字以上。'],
      required: [true, '缺少 About 內容。']
    }
  },
  {
    versionKey: false
  }
)

const abouts = mongoose.model('abouts', aboutSchema)

export default abouts
