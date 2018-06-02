<template>
  <div class='tinymce-container editor-container'>
    <textarea class='tinymce-textarea' :id="id"></textarea>
  </div>
</template>
<script>
  export default {
    name: 'Tinymce',
    props: {
      id: {type: String, default: 'tinymceEditor'},
      height: {type: Number, default: 300},
      width: {type: Number, default: null},
      value: {type: String, default: ''},
      data() {
        return {
          hasChange: false,
          hasInit: false
        }
      },
    },
    mounted() {
      const _this = this;
      tinymce.init({
        selector: `#${this.id}`,
        language: 'zh_CN',
        height: this.height,
        width: this.width,
        menubar: false,
        plugins: [
          'advlist autolink lists link image imagetools charmap print preview anchor textcolor',
          'searchreplace visualblocks code fullscreen textcolor colorpicker',
          'insertdatetime media table contextmenu paste code help'
        ],
        toolbar: [
          'insert | undo redo | table styleselect | bold italic backcolor forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | removeformat code'],
        // content_css: [
          // '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
          // '//www.tinymce.com/css/codepen.min.css'
        // ],
        images_upload_url: 'postAcceptor.php',
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true;
          editor.on('NodeChange Change KeyUp', () => {
            this.hasChange = true;
            this.$emit('input', editor.getContent({ format: 'raw' }));
          });
        },
        // 图片上传七牛
        images_upload_handler: (blobInfo, success, failure) => {
            let formData = new FormData();
            formData.append('file', blobInfo.blob());
            $.ajax({
              url: process.env.BASE_API+'/api/oss',
              type: "POST",
              processData: false,
              contentType: false,
              data: formData,
              success: (res) => {
                success(res.data);
              },error: (err) => {
                failure(222,err);
              }
            });
        },
      });
    },
    watch: {
      value(val) {
        if (!this.hasChange && this.hasInit) {
          this.$nextTick(() => tinymce.get(this.id).setContent(val))
        }
      }
    },
    destroyed() {
      tinymce.get(this.id).destroy();
    }
  }
</script>

<style scoped>
.tinymce-container {
  position: relative
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

</style>
