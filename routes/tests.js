import express from 'express'
import {
  testAdd,
  testEdit,
  testDelete,
  testGetAll,
  testGetOne,
  testQuestionAdd,
  testQuestionEdit,
  testQuestionDelete,
  QuestionOptionAdd,
  QuestionOptionEdit,
  QuestionOptionDelete
} from '../controllers/tests.js'

const router = express.Router()

// 整個測驗 ----------------------------------
router.post('/', testAdd)
router.patch('/:id', testEdit)
router.delete('/:id', testDelete)
// 查詢所有測驗
router.get('/', testGetAll)
// 查詢個別測驗
router.get('/:id', testGetOne)
// 題目 -------------------------------------
// 新增題目
router.patch('/questions/:id', testQuestionAdd)
// 修改題目
router.patch('/questionsEdit/:id', testQuestionEdit)
// 刪除題目
router.delete('/questions/:id', testQuestionDelete)
// 選項 -------------------------------------
// 以題目 ID 新增選項
router.patch('/questions/options/:id', QuestionOptionAdd)
// 修改選項
router.patch('/questionsEdit/options/:id', QuestionOptionEdit)
// 刪除選項
router.delete('/questions/options/:id', QuestionOptionDelete)

export default router
