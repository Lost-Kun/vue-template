<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="less">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    position: relative;
    height: 100%;
    font-size: 15px;
    min-width: 1100px;
    overflow: hidden;
  }

  // update here when update icons
  @import url('//at.alicdn.com/t/font_554778_xnzzkzov0io1or.css');
</style>
