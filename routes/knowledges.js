import express from 'express'
import { knowledgeAdd, knowledgeEdit, knowledgeDelete, knowledgeSearch } from '../controllers/knowledges.js'

const router = express.Router()

router.post('/', knowledgeAdd)
router.patch('/:id', knowledgeEdit)
router.delete('/:id', knowledgeDelete)
router.get('/', knowledgeSearch)

export default router
