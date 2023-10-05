<template>
  <div>
    <span class="test"> webpack-ts 测试 </span>
    <img :src="img" alt="" />
  </div>
</template>

<script setup lang="ts">
import img from './assets/images/img.jpg';
</script>
<style scoped lang="scss">
* {
  color: red;
}
.test {
  transform: translate(100px, 100px);
}
</style>
