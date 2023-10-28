<template>
  <div>
    <span class="test"> webpack-ts 测试 </span>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#yibao-kaoshi"></use>
    </svg>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#yibao-gongneng"></use>
    </svg>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#yibao-gou"></use>
    </svg>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#yibao-lingdang3"></use>
    </svg>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#yibao-fire"></use>
    </svg>
    <div class="image-container">
      <img :src="img" alt="" class="image" />
    </div>
    <CommonForm />
  </div>
</template>

<script setup lang="ts">
import img from './assets/images/img.jpg';
import CommonForm from '@/components/CommonForm.vue';
</script>
<style lang="scss">
#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.image-container {
  width: 300px;
  height: 100px;
  .image {
    width: 100%;
    height: auto;
    display: block;
  }
}
html,
body {
  padding: 0;
  margin: 0;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: green;
  overflow: hidden;
  color: green;
}
.test {
  transform: translate(100px, 100px);
}
</style>
