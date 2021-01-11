import mongoose from 'mongoose'
// 信箱驗證
import validator from 'validator'

const Schema = mongoose.Schema

const testResultSchema = new Schema({
  testData_id: {
    type: mongoose.ObjectID,
    ref: 'tests'
  },
  date: {
    type: Date,
    default: Date.now
  },
  scores: {
    type: Number,
    required: [true, '缺少測驗分數。']
  }
})

const userSchema = new Schema(
  {
    email: {
      type: String,
      require: [true, '請輸入信箱。'],
      unique: 'true',
      // 自訂驗證規則
      validate: {
        validator(value) {
          return validator.isEmail(value)
        },
        // 錯誤訊息
        message: '信箱格式錯誤'
      }
    },
    password: {
      type: String,
      // minlength: [6, '密碼必須 6 個字元以上。'],
      // maxlength: [30, '密碼必須 30 個字元以下。'],
      required: [true, '請輸入密碼。']
    },
    name: {
      type: String,
      minlength: [2, '暱稱必須 2 個字元以上。'],
      maxlength: [10, '暱稱必須 10 個字元以下。'],
      required: [true, '請輸入暱稱。']
    },
    avator: {
      type: String,
      required: [true, '請選擇代表角色。']
    },
    authority: {
      type: String,
      default: '使用者'
    },
    regDate: {
      type: Date,
      // `Date.now()` returns the current unix timestamp as a number
      default: Date.now
    },
    pesonalTestResults: {
      type: [testResultSchema]
    }
  },
  {
    versionKey: false
  }
)

// 建立 model
// mongoose.model(collaction名稱, Schema)
const users = mongoose.model('users', userSchema)

export default users
