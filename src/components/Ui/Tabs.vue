<template>
  <ul class="tabs">
    <slot></slot>
  </ul>
</template>

<style scoped lang="less">
@import '../../vars';

.tabs {
  overflow: hidden;
  margin: 0 12px;
}
</style>
