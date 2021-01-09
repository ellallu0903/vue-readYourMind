import abouts from '../models/abouts.js'

// abouts 新增步驟
export const aboutAdd = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入。' })
    return
  }

  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符。' })
    return
  }

  try {
    if (req.body.title.length < 1 || req.body.content.length < 1) {
      res.status(400).send({ success: false, message: '標題或內容必須 1 個字元以上。' })
    } else {
      await abouts.create({
        title: req.body.title,
        content: req.body.content
      })
      res.status(200).send({ success: true, message: '' })
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

// abouts 步驟修改
export const aboutEdit = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入。' })
    return
  }

  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符。' })
    return
  }

  try {
    // 把帶有 ID 的路由參數抓進來
    let result = await abouts.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料。' })
    } else {
      result = await abouts.findByIdAndUpdate(req.params.id, req.body, { new: true })
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

// abouts 步驟刪除
export const aboutDelete = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入。' })
    return
  }

  try {
    // 把帶有 ID 的路由參數抓進來
    let result = await abouts.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料。' })
    } else {
      result = await abouts.findByIdAndDelete(req.params.id)
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤。' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤。' })
    }
  }
}

// 查詢所有
export const aboutSearch = async (req, res) => {
  try {
    const result = await abouts.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤。' })
  }
}
