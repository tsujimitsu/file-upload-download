const awsS3 = require('../utils/awsS3')
const azureBlob = require('../utils/azureBlob')

const listFiles = async (req, res) => {
  try {
    const tenantId = req.params.tenantId
    if (!tenantId) {
      throw new Error('Tenant ID is not set')
    }

    //
    // check access rights to s3 path(prefix)
    //

    let list
    if (true) {
      // AWS
      list = await awsS3.listFiles(tenantId)
    } else {
      // Azure
      list = await azureBlob.listFiles(tenantId)
    }

    return res.json({ msg: list })
  } catch (error) {
    return res.sendStatus(403, { error })
  }
}

const deleteFile = async (req, res) => {
  try {
    const { s3Key } = req.body
    if (!s3Key) {
      throw new Error('S3 Key is not set')
    }

    //
    // check access rights to s3 key
    //

    if (true) {
      // AWS
      await awsS3.deleteFile(s3Key)
    } else {
      // Azure
      await azureBlob.deleteFile()
    }
    return res.json({ msg: 'deleted' })
  } catch (error) {
    return res.sendStatus(403, { error })
  }
}

const createPutUrl = async (req, res) => {
  try {
    const { fileName } = req.body
    if (!fileName) {
      throw new Error('File name is not set')
    }

    const tenantId = req.params.tenantId
    if (!tenantId) {
      throw new Error('Tenant ID is not set')
    }

    let url
    if (true) {
      // AWS
      url = await awsS3.createPutUrl(fileName, tenantId)
    } else {
      // Azure
      url = await azureBlob.createPutUrl()
    }

    return res.json({ msg: url })
  } catch (error) {
    return res.sendStatus(403, { error })
  }
}

const createGetUrl = async (req, res) => {
  try {
    // 本来、keyはDBから取得する
    const { key } = req.body
    // 本来、fileNameはDBから取得する
    const fileName = key.split('/').slice(-1)[0]

    let url
    if (true) {
      // AWS
      url = await awsS3.createGetUrl(key, fileName)
    } else {
      // Azure
      url = await azureBlob.createGetUrl(key, fileName)
    }

    return res.json({ url })
  } catch (error) {
    console.log(error)
    return res.json({ error })
  }
}

module.exports = {
  listFiles,
  deleteFile,
  createPutUrl,
  createGetUrl
}
