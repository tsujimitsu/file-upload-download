<template>
  <div>
    <button @click="deleteFile">Delete</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'filedelete',
  props: ['id'],
  data() {
    return {}
  },
  methods: {
    deleteFile: async function() {
      const s3Key = this.id
      await axios
        .delete(`/api/v1/delete`, { data: { s3Key } })
        .then(() => alert('deleted'))
        .catch(() => (this.list = 'test'))
    }
  }
}
</script>

<style></style>
