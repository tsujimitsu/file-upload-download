<template>
  <div>
    <h1>File Upload/Download</h1>
    <FileUpload />
    <FileList />
  </div>
</template>

<script>
import FileList from './FileList.vue'
import FileUpload from './FileUpload.vue'
export default {
  name: 'home',
  components: { FileList, FileUpload }
}
</script>
