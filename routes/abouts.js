import express from 'express'
import { aboutAdd, aboutEdit, aboutDelete, aboutSearch } from '../controllers/abouts.js'

const router = express.Router()

router.post('/', aboutAdd)
router.patch('/:id', aboutEdit)
router.delete('/:id', aboutDelete)
router.get('/', aboutSearch)

export default router
