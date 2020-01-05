<template>
  <div>
    <div>
      <input @change="selectedFile" type="file" name="file" />
      <button @click="upload" type="submit">Upload</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "fileupload",
  components: {},
  mounted: async function() {},
  data() {
    return {
      uploadFile: null
    };
  },
  methods: {
    selectedFile: function(e) {
      // 選択された File の情報を保存しておく
      e.preventDefault();
      let files = e.target.files;
      this.uploadFile = files[0];
    },
    putPreSignedUrl: async function(fileName, fileType) {
      const { tenantId } = this.$route.params;

      if (!tenantId || !fileName || !fileType) {
        alert("cannot get tenantId or fileName or fileType");
      }

      return await axios
        .post(`/api/v1/put-presigned-url/${tenantId}`, { fileName, fileType })
        .then(response => response.data.msg)
        .catch(() => (this.list = "test"));
    },
    upload: async function() {
      if (!this.uploadFile) {
        alert("Please select file");
        return false;
      }

      const { name: fileName, type: fileType } = this.uploadFile;

      // Pre-Signed URL を取得する
      const presignedUrl = await this.putPreSignedUrl(fileName, fileType);

      // FormData を利用して File を POST する
      //let formData = new FormData()
      //formData.append(this.uploadFile.name, this.uploadFile)
      let config = {
        headers: {
          //'Content-Type': 'multipart/form-data'
          //'Content-Type': fileType
          "Content-Type": "binary/octet-stream"
        }
      };

      axios
        .put(presignedUrl, this.uploadFile, config)
        .then(response => {
          // response 処理
          console.log(response);
        })
        .catch(error => {
          // error 処理
          console.log(error);
        });
    }
  }
};
</script>

<style></style>
