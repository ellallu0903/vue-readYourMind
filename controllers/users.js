import md5 from 'md5'
import users from '../models/users.js'
// import util from 'util'

// 註冊 registered
export const registered = async (req, res) => {
  if (
    !req.headers['content-type'] ||
    !req.headers['content-type'].includes('application/json')
  ) {
    res.status(400).send({ success: false, message: '資料格式不符。' })
    return
  }

  try {
    if (req.body.password.length < 6) {
      res
        .status(400)
        .send({ success: false, message: '密碼必須 6 個字元以上。' })
    } else if (req.body.password.length > 30) {
      res
        .status(400)
        .send({ success: false, message: '密碼必須 30 個字元以下。' })
    } else {
      await users.create({
        email: req.body.email,
        password: md5(req.body.password),
        name: req.body.name,
        avator: req.body.avator,
        authority: req.body.authority,
        regDate: Date.now()
      })
      res.status(200).send({ success: true, message: '' })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'MongoError' && error.code === 11000) {
      res.status(400).send({ success: false, message: '信箱已被使用。' })
    } else {
      res.status(500).send({ success: false, message: '伺服器發生錯誤。' })
    }
  }
}

// 登入 log in
export const login = async (req, res) => {
  if (
    !req.headers['content-type'] ||
    !req.headers['content-type'].includes('application/json')
  ) {
    res.status(400).send({ success: false, message: '資料格式不符。' })
    return
  }

  try {
    const result = await users.findOne(
      {
        email: req.body.email,
        password: md5(req.body.password)
      },
      '-password'
    )

    if (result === null) {
      res.status(404).send({ success: false, message: '信箱或密碼錯誤。' })
    } else {
      // 將使用者資料記錄到 session
      req.session.user = result
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器發生錯誤。' })
    }
  }
}

// 登出 log out
export const logout = async (req, res) => {
  // 刪除 session
  req.session.destroy(error => {
    if (error) {
      res.status(500).send({ success: false, message: '伺服器發生錯誤。' })
    } else {
      res.clearCookie()
      res.status(200).send({ success: true, message: '' })
    }
  })
}

// 檢查是否在登入狀態 heartbeat
export const heartbeat = async (req, res) => {
  let isLogin = false
  if (req.session.user !== undefined) {
    isLogin = true
  }
  res.status(200).send(isLogin)
}

// 查詢所有使用者
export const getAllUser = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入。' })
    return
  }

  try {
    const result = await users.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤。' })
  }
}

// 修改使用者資料
export const userEditById = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入。' })
  }

  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '格式錯誤' })
  }

  try {
    // 如果有是改密碼，先加密
    if (req.body.password) {
      req.body.password = md5(req.body.password)
    }

    let result = await users.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料。' })
    } else {
      result = await users.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤。' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤。' })
    }
  }
}

// users 刪除帳號
export const userDelete = async (req, res) => {
  try {
    const result = await users.findByIdAndDelete(req.params.id)
    if (result !== null) {
      res.status(200).send({ success: true, message: '', result })
    } else {
      res.status(404).send({ success: false, message: '找不到資料。' })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤。' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤。' })
    }
  }
}

// 查詢使用者個人資料
export const getPersonal = async (req, res) => {
  try {
    const result = await users.findById(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤。' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤。' })
    }
  }
}

// 使用者新增測驗結果
export const addResult = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入。' })
    return
  }

  if (
    !req.headers['content-type'] ||
    !req.headers['content-type'].includes('application/json')
  ) {
    res.status(400).send({ success: false, message: '資料格式不符。' })
    return
  }
  try {
    // 把帶有 ID 的路由參數抓進來
    let result = await users.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料。' })
    } else {
      result = await users.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            pesonalTestResults: {
              testData_id: req.body.pesonalTestResults.testData_id,
              date: Date.now(),
              scores: req.body.pesonalTestResults.scores
            }
          }
        },
        { new: true }
      )
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤。' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤。' })
    }
  }
}

// 查詢使用者測驗結果
export const getAllResult = async (req, res) => {
  try {
    const result = await users
      .findById(req.params.id, 'pesonalTestResults')
      .populate('pesonalTestResults.testData_id')
    res.status(200).send({ success: true, message: '', result })
    // console.log(util.inspect(result, { depth: null }))
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤。' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤。' })
    }
  }
}

// const test = async () => {
//   try {
//     const result = await users
//       .findById('5ff7cb50582b1b39687c918c', 'pesonalTestResults')
//       .populate('pesonalTestResults.testData_id')
//     console.log(util.inspect(result, { depth: null }))
//   } catch (error) {
//     console.log(error)
//   }
// }

// test()
