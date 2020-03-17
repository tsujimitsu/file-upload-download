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
      console.log(this.uploadFile);
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
      const amazDate = new Date()
        .toISOString()
        .replace(/[:\\-]|\.\d{3}/g, "")
        .substr(0, 17);

      let config = {
        headers: {
          //'Content-Type': 'multipart/form-data'
          //'Content-Type': fileType
          "Content-Type": "binary/octet-stream",
          //"X-Amz-Content-Sha256": "UNSIGNED-PAYLOAD",
          "X-Amz-Content-Sha256":
            "1359f2a7585ab9e91b4910b35a5b7eefa55ae4cad967b65960d06cb0f4b878dc",
          "X-Amz-Date": amazDate
          //"X-Amz-Content-Sha256":
          //  "1359f2a7585ab9e91b4910b35a5b7eefa55ae4cad967b65960d06cb0f4b878dc"
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
