import mongoose from 'mongoose'

const Schema = mongoose.Schema

const optionShema = new Schema({
  option: {
    type: String
  },
  optionScore: {
    type: Number,
    default: 0
  }
})

const testQuestionSchema = new Schema({
  question: {
    type: String,
    minlength: [1, '題目最少一個字以上。']
  },
  options: {
    type: [optionShema]
  }
})

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
    reference: {
      type: String,
      minlength: [1, '來源最少一個字以上。'],
      required: [true, '缺少 測驗 來源。']
    },
    type: {
      type: String,
      minlength: [1, '分類最少一個字以上。'],
      required: [true, '缺少 測驗 分類。']
    },
    scoringMethod: {
      type: String,
      required: [true, '缺少 測驗計分方式。']
    },
    questions: {
      type: [testQuestionSchema],
      required: [true, '缺少 測驗 內容。']
    }
  },
  {
    versionKey: false
  }
)

const tests = mongoose.model('tests', testSchema)

export default tests
