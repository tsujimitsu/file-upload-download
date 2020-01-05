<template>
  <div>
    <h2>list</h2>
    <table>
      <tbody>
        <tr>
          <th>Key</th>
          <th>LastModified</th>
          <th>Size</th>
          <th>StorageClass</th>
          <th>ETag</th>
          <th>Delete</th>
          <th>Download</th>
        </tr>
        <tr v-for="(item, key) in list" :key="key">
          <td>{{ item.Key }}</td>
          <td>{{ item.LastModified }}</td>
          <td>{{ item.Size }}</td>
          <td>{{ item.StorageClass }}</td>
          <td>{{ item.ETag }}</td>
          <td><FileDelete :id="item.Key" /></td>
          <td><FileDownload :id="item.Key" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import FileDownload from './FileDownload.vue'
import FileDelete from './FileDelete.vue'
export default {
  name: 'filelist',
  components: { FileDownload, FileDelete },
  mounted: async function() {
    const { tenantId } = this.$route.params
    console.log(tenantId)
    if (!tenantId) {
      alert('cannot get tenantId')
    }

    await axios
      .get(`/api/v1/list/${tenantId}`)
      .then(response => (this.list = response.data.msg.Contents))
      .catch(() => (this.list = 'test'))
  },
  data() {
    return {
      list: []
    }
  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
}

th,
td {
  border: solid 1px;
}
</style>
