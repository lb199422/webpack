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
    <img :src="img" alt="" />
  </div>
</template>

<script setup lang="ts">
import img from './assets/images/img.jpg';
</script>
<style scoped lang="scss">
* {
  color: #333;
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
