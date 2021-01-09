import express from 'express'
import { registered, login, logout, heartbeat, getAllUser, userEditById, userDelete, getPersonal } from '../controllers/users.js'

const router = express.Router()

router.post('/', registered)
router.post('/login', login)
router.patch('/:id', userEditById)
router.delete('/logout', logout)
router.delete('/:id', userDelete)
router.get('/heartbeat', heartbeat)
router.get('/', getAllUser)
router.get('/:id', getPersonal)

export default router
