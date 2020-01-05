<template>
  <div>
    <button @click="download">Download</button>
  </div>
</template>

<script>
import axios from 'axios'
import queryString from 'query-string'
import contentDisposition from 'content-disposition'
import { saveAs } from 'file-saver'
export default {
  name: 'filedownload',
  props: ['id'],
  components: {},
  mounted: async function() {},
  data() {
    return {}
  },
  methods: {
    download: async function() {
      const { url } = await this.getPreSignedUrl()

      axios
        .get(url, {
          responseType: 'blob'
        })
        .then(response => {
          const blob = new Blob([response.data], {
            type: response.data.type
          })

          // Download file from Web Browser
          const href = new URL(url)
          const parsed = queryString.parse(href.search)
          const fileName = contentDisposition.parse(
            parsed['response-content-disposition']
          ).parameters.filename
          saveAs(blob, fileName)
        })
        .catch(err => console.log(err))
    },
    getPreSignedUrl: async function() {
      return await axios
        .post('/api/v1/get-presigned-url', { key: this.id })
        .then(response => response.data)
        .catch(() => (this.list = 'test'))
    }
  }
}
</script>

<style></style>
