const aws = require('aws-sdk')
const AWS_REGION = process.env.AWS_REGION || 'ap-northeast-1'
const S3_PRESIGNED_URL_EXPIRES = process.env.S3_PRESIGNED_URL_EXPIRES || 60
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME
const s3 = new aws.S3({ signatureVersion: 'v4', region: AWS_REGION })

if (!S3_BUCKET_NAME) {
  throw new Error('S3_BUCKET_NAME env variable is not set')
  exit
}

const listFiles = async tenantId => {
  try {
    const params = {
      Bucket: S3_BUCKET_NAME,
      Delimiter: '/',
      Prefix: `${tenantId}/`
    }
    return await s3.listObjectsV2(params).promise()
  } catch (error) {
    console.log(error)
  }
}

const deleteFile = async s3Key => {
  try {
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: s3Key
    }
    return await s3.deleteObject(params).promise()
  } catch (error) {
    console.log(error)
  }
}

const createPutUrl = async (fileName, tenantId) => {
  try {
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: `${tenantId}/${fileName}`,
      //ContentType: fileType,
      ContentType: 'binary/octet-stream',
      Expires: S3_PRESIGNED_URL_EXPIRES,
      ACL: 'private'
      //Metadata: { 'tag-test': '123' }
    }

    return await new Promise((resolve, reject) => {
      s3.getSignedUrl('putObject', params, (err, url) => {
        if (err) {
          reject(err)
        }
        resolve(url)
      })
    })
  } catch (error) {
    console.log(error)
  }
}

const createGetUrl = async (key, fileName) => {
  try {
    const params = {
      Bucket: S3_BUCKET_NAME,
      //Key: `${tenant}/${key}`,
      Key: key,
      Expires: S3_PRESIGNED_URL_EXPIRES,
      ResponseContentDisposition: `attachment; filename=${fileName}`
    }

    return await new Promise((resolve, reject) => {
      s3.getSignedUrl('getObject', params, function(err, url) {
        if (err) {
          reject(err)
        }
        resolve(url)
      })
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  listFiles,
  deleteFile,
  createPutUrl,
  createGetUrl
}
