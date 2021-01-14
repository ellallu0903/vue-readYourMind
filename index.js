// 引用網頁伺服器套件
import express from 'express'
// 讓 express 可以讀取 Body 資料
import bodyParder from 'body-parser'
// MongoDB 操作套件
import mongoose from 'mongoose'
// env
import dotenv from 'dotenv'
// 將 session 存入 MongoDB
import connectMongo from 'connect-mongo'
// express 允許跨域請求
import cors from 'cors'
// MongoDB 操作套件 / 登入密鑰
import session from 'express-session'

// 引用檔案
import userRoutes from './routes/users.js'
import aboutRoutes from './routes/abouts.js'
import testRoutes from './routes/tests.js'
import knowledgeRoutes from './routes/knowledges.js'

dotenv.config()

// 連接資料庫 & 防止錯誤訊息
mongoose.connect(process.env.DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const app = express()

// 讓 express 可以讀取進來的 body，格式為 json
app.use(bodyParder.json())

// 跨域設定
app.use(
  cors({
    origin(origin, callback) {
      // 如果是 Postman 之類的後端, 則允許
      if (origin === undefined) {
        callback(null, true)
      } else {
        if (process.env.DEV === 'true') {
          // 如果是本機開發，接受所有請求
          callback(null, true)
        } else if (origin.includes('github')) {
          // 如果不是本機開發，但是是從 github 過來的請求，則允許
          callback(null, true)
        } else {
          // 如果不是本機開發，也不是從 github 過來的，就拒絕請求
          callback(new Error('Not allowed'), false)
        }
      }
    },
    // 因為要做登入，所以要允許接受認證資訊
    credentials: true
  })
)

// 下方為固定寫法
const MongoStore = connectMongo(session)

const sessionSettings = {
  // secret 可以隨便輸入
  secret: 'MyPresentaion123',
  // session 儲存位置
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  // 登入有效期，單位是毫秒 ms
  cookie: {
    // 60 分鐘
    maxAge: 1000 * 60 * 60
  },
  // 是否保存未被修改的 session
  saveUninitialized: false,
  // 是否每次請求重設過期時間
  // 有在動作的話，時間就會重新設定，不會隨意被登出
  rolling: true,
  // 是否強制將 session 存回 mongodb，即使它沒被修改
  resave: true
}

// 允許不同網域的驗證資訊
// 例如分別在 GitHub 和 Heroku 才能互通
if (process.env.DEV === 'false') {
  // 如果不是本機的開發環境，允許不同網域的認證
  sessionSettings.cokkie.sameSite = 'none'
  // 如果是不同網域的認證，一定要設定 secure
  sessionSettings.cokkie.secure = true
}

app.use(session(sessionSettings))

// 必須要設定這個，部署後端到 heroku 時才能正常登入，
// 不然後台在 Heroku 時無法登入
app.set('trust proxy', 1)

// 分別進到各自的路由
app.use('/users', userRoutes)
app.use('/abouts', aboutRoutes)
app.use('/tests', testRoutes)
app.use('/knowledges', knowledgeRoutes)

// bodyparser cors 之類的套件發生錯誤時的處理
// app.use((err, req, res, next) => {})
// err 發生的錯誤
// next 繼續到下一個 middleware，因為這是最後一個所以不需要
// _ 代表不使用 function 的參數
app.use((_, req, res, next) => {
  res.status(500).send({ success: false, message: '伺服器錯誤' })
})

// express 監聽指令 PORT 的請求
app.listen(process.env.PORT, () => {
  console.log('sever started')
})
