const express = require('express')
const router = express.Router()

const {
  listFiles,
  deleteFile,
  createPutUrl,
  createGetUrl
} = require('../controllers/fileController')

router.get('/list/:tenantId', listFiles)

router.delete('/delete', deleteFile)

router.post('/put-presigned-url/:tenantId', createPutUrl)

router.post('/get-presigned-url', createGetUrl)

module.exports = router
