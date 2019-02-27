<template> 
  <i
    :class="`iconfont icon-${name}`"
    :style="size && { fontSize: `${size}px` }"
  />
</template>

<script>
export default {
  props: ['name', 'size'],
};
</script>
