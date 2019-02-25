<template> 
  <i :class="`iconfont icon-${this.name}`"/>
</template>

<script>
export default {
  props: ['name'],
};
</script>
