<template>
  <div id="file-drop" @dragover.prevent @drop="handleDrop">
    <input type="file" ref="fileInput" @change="handleFileSelect" style="display: none" />
    <div>
      <div v-if="!file" @click="triggerFileInput" class="upload-area">
        <p>Drag your files here or click to select files</p>
      </div>
      <div v-else>
        <p>{{ file.name }}</p>
        <div class="progress">
          <div class="progress-bar" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
    </div>
    <button v-if="file" @click="uploadFile" class="submit-button">Upload</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      progress: 0,
    };
  },
  methods: {
    handleDrop(event) {
      event.preventDefault();
      this.file = event.dataTransfer.files[0];
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileSelect() {
      this.file = this.$refs.fileInput.files[0];
    },
    uploadFile() {
      if (!this.file) {
        return;
      }

      const formData = new FormData();
      formData.append('file', this.file);

      const uploadEndpoint = 'http://localhost:3000/upload';

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          this.progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        },
      };

      this.$axios.post(uploadEndpoint, formData, config)
        .then(() => {
          console.log('Upload complete!');
          this.file = null;
          this.progress = 0;
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    },
  },
};
</script>

<style scoped>
#file-drop {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}

.upload-area {
  cursor: pointer;
}

.progress {
  height: 20px;
  margin-top: 10px;
}

.progress-bar {
  height: 100%;
  background: #4caf50;
}

.submit-button {
  margin-top: 10px;
  background-color: #4caf50;
  color: white;
  padding: 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}
</style>