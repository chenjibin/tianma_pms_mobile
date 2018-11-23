<template>
  <div id="my-test-page">
    <div class="btn-group">
      <mu-raised-button
      label="考试列表"
      class="btn-item"
      @click="_toPage('testList')"
      secondary fullWidth/>
      <mu-raised-button
      label="我的成绩"
      class="btn-item"
      @click="_toPage('testResultList')"
      secondary fullWidth/>
    </div>
  </div>
</template>

<style lang="less" scoped>
#my-test-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  .btn-group {
    width: 60%;
    .btn-item {
      margin-bottom: 20px;
    }
  }
}

</style>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    _toPage(name) {
      this.$router.push(name)
    }
  }
}
</script>
