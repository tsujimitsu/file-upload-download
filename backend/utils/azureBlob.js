const listFiles = async tenantId => {
  try {
    //list = await blobServiceClient.listContainers()
    //console.log(list)
    // test
    //let i = 1
    //for await (const container of blobServiceClient.listContainers()) {
    //  console.log(`Container ${i++}: ${container.name}`)
    //}
  } catch (error) {
    console.log(error)
  }
}

const deleteFile = async () => {
  try {
    console.log('test')
  } catch (error) {
    console.log(error)
  }
}

const createPutUrl = async () => {
  try {
    console.log('test')
  } catch (error) {
    console.log(error)
  }
}

const createGetUrl = async () => {
  try {
    const startDate = new Date()
    startDate.setMinutes(startDate.getMinutes())
    const expiryDate = new Date(startDate)
    expiryDate.setMinutes(startDate.getMinutes() + 1)

    const sharedAccessPolicy = {
      AccessPolicy: {
        Permissions: azure.Constants.BlobConstants.SharedAccessPermissions.READ,
        Start: startDate.toISOString(),
        Expiry: expiryDate.toISOString()
      }
    }
    const container = 'test'
    const blobName = 'XXX'

    const sasToken = blobService.generateSharedAccessSignature(
      container,
      blobName,
      sharedAccessPolicy
    )
    blobService.getUrl(container, blobName, sasToken, true)
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
