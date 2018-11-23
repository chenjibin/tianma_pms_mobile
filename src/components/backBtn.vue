<template>
<div id="back-btn">
  <mu-float-button icon="navigate_before" mini iconClass="icon-class" @click="_back"/>
</div>


</template>
<script>
export default {
  name: 'backBtn',
  methods: {
    _back() {
      this.$router.go(-1)
    }
  }
}

</script>

<style lang="less">
#back-btn {
  position: fixed;
  z-index: 1000;
  bottom: 20px;
  right: 20px;
  transition: all 0.3s;
  .icon-class {
    font-size: 36px;
  }
}
</style>
