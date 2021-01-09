import express from 'express'
import { testAdd, testEdit, testDelete, testGetAll, testGetOne, testQuestionAdd, testQuestionEdit, testQuestionDelete } from '../controllers/tests.js'

// import { testAdd, testEdit, testDelete, testGetAll, testGetOne} from '../controllers/tests.js'

const router = express.Router()

router.post('/', testAdd)
router.patch('/:id', testEdit)
router.delete('/:id', testDelete)
// 查詢所有測驗
router.get('/', testGetAll)
// 查詢個別測驗
router.get('/:id', testGetOne)
// 新增題目
router.patch('/questions/:id', testQuestionAdd)
// 修改題目
router.patch('/questionsEdit/:id', testQuestionEdit)
// 刪除題目
router.delete('/questions/:id', testQuestionDelete)

export default router
