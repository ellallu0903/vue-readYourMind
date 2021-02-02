import tests from '../models/tests.js'

// tests 新增測驗
export const testAdd = async (req, res) => {
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
    if (
      req.body.title.length < 1 ||
      req.body.description.length < 1 ||
      req.body.question.length < 1 ||
      req.body.reference.length < 1 ||
      req.body.type.length < 1 ||
      req.body.type.scoringMethod < 1
    ) {
      res
        .status(400)
        .send({ success: false, message: '有內容未達 1 個字元以上。' })
    } else {
      const result = await tests.create({
        title: req.body.title,
        description: req.body.description,
        reference: req.body.reference,
        type: req.body.type,
        questions: [
          {
            question: req.body.question,
            options: [
              {
                option: req.body.option,
                optionScore: req.body.optionScore
              }
            ]
          }
        ],
        scoringMethod: req.body.scoringMethod
      })
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器發生錯誤。' })
    }
  }
}

// tests 測驗修改
export const testEdit = async (req, res) => {
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
    let result = await tests.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料。' })
    } else {
      result = await tests.findByIdAndUpdate(req.params.id, req.body, {
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

// tests 刪除測驗
export const testDelete = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入。' })
    return
  }

  try {
    // 把帶有 ID 的路由參數抓進來
    let result = await tests.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料。' })
    } else {
      result = await tests.findByIdAndDelete(req.params.id)
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

// tests 查詢所有測驗
export const testGetAll = async (req, res) => {
  try {
    const result = await tests.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤。' })
  }
}

// tests 查詢個別測驗
export const testGetOne = async (req, res) => {
  try {
    const result = await tests.findById(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤。' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤。' })
    }
  }
}

// tests 新增測驗題目
export const testQuestionAdd = async (req, res) => {
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
    let result = await tests.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料。' })
    } else if (req.body.questions.length < 1) {
      res
        .status(400)
        .send({ success: false, message: '題目至少 1 個字元以上。' })
    } else {
      result = await tests.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            questions: {
              question: req.body.questions.question,
              options: {
                option: req.body.questions.options.option,
                optionScore: req.body.questions.options.optionScore
              }
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

// tests 以測驗題目 ID 修改內容
export const testQuestionEdit = async (req, res) => {
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
    let result = await tests.findOneAndUpdate(
      {
        'questions._id': req.params.id
      },
      {
        $set: {
          'questions.$.question': req.body.question
        }
      },
      { new: true }
    )
    res.status(200).send({ success: true, message: '', result })
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料。' })
    } else {
      result = await tests.findByIdAndUpdate(req.params.id, req.body, {
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

// tests 以測驗題目 ID 刪除題目
export const testQuestionDelete = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入。' })
    return
  }

  try {
    // 把帶有 ID 的路由參數抓進來
    let result = await tests.findOneAndUpdate(
      {
        'questions._id': req.params.id
      },
      {
        $pull: {
          questions: {
            _id: req.params.id
          }
        }
      },
      { new: true }
    )
    res.status(200).send({ success: true, message: '', result })
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料。' })
    } else {
      result = await tests.findByIdAndUpdate(req.params.id, req.body, {
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

// tests 以題目 ID 新增選項
export const QuestionOptionAdd = async (req, res) => {
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
    // if (req.body.options.length < 1) {
    //   res
    //     .status(400)
    //     .send({ success: false, message: '選項至少 1 個字元以上。' })
    // } else {
    const result = await tests.findOneAndUpdate(
      {
        'questions._id': req.params.id
      },
      {
        $push: {
          'questions.$.options': {
            option: req.body.option,
            optionScore: req.body.optionScore
          }
        }
      },
      { new: true }
    )
    res.status(200).send({ success: true, message: '', result })
    // }
  } catch (error) {
    console.log(error)
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

// tests 以選項 ID 修改選項
export const QuestionOptionEdit = async (req, res) => {
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
    let result = await tests.findOneAndUpdate(
      {
        'questions.options._id': req.params.id
      },
      {
        $set: {
          'questions.$.options': {
            option: req.body.options.option,
            optionScore: req.body.options.optionScore
          }
        }
      },
      { new: true }
    )
    res.status(200).send({ success: true, message: '', result })
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料。' })
    } else {
      result = await tests.findByIdAndUpdate(req.params.id, req.body, {
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

// tests 以選項 ID 刪除選項
export const QuestionOptionDelete = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入。' })
    return
  }

  try {
    // 把帶有 ID 的路由參數抓進來
    let result = await tests.findOneAndUpdate(
      {
        'questions.options._id': req.params.id
      },
      {
        $pull: {
          'questions.$.options': {
            _id: req.params.id
          }
        }
      },
      { new: true }
    )
    res.status(200).send({ success: true, message: '', result })
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料。' })
    } else {
      result = await tests.findByIdAndUpdate(req.params.id, req.body, {
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
