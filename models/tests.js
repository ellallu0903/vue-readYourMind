import mongoose from 'mongoose'

const Schema = mongoose.Schema

const testSchema = new Schema(
  {
    title: {
      type: String,
      minlength: [1, '標題最少一個字以上。'],
      required: [true, '缺少 測驗 標題。']
    },
    description: {
      type: String,
      minlength: [1, '描述最少一個字以上。'],
      required: [true, '缺少 測驗 描述。']
    },
    question: {
      type: String,
      minlength: [1, '題目最少一個字以上。'],
      required: [true, '缺少 測驗 題目。']
    },
    value: {
      type: Number,
      min: [0, '最小值為 0。'],
      max: [7, '最大值為 7。'],
      required: [true, '題目未選擇。']
    }
  },
  {
    versionKey: false
  }
)

const tests = mongoose.model('tests', testSchema)

export default tests
