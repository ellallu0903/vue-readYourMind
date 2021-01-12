import express from 'express'
import {
  registered,
  login,
  logout,
  heartbeat,
  getAllUser,
  userEditById,
  userDelete,
  getPersonal,
  addResult,
  getAllResult
} from '../controllers/users.js'

const router = express.Router()

router.post('/', registered)
router.post('/login', login)
router.patch('/:id', userEditById)
router.delete('/logout', logout)
router.delete('/:id', userDelete)
router.get('/heartbeat', heartbeat)
router.get('/', getAllUser)
router.get('/:id', getPersonal)
// 新增測驗結果
router.patch('/result/:id', addResult)
// 查詢測驗結果
router.get('/result/:id', getAllResult)

export default router
