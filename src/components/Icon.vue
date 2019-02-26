<template> 
  <img class="custom_icon" :src="`./img/icons/${name}.svg`"/>
</template>

<script>
export default {
  props: ['name'],
};
</script>

<style scoped lang="less">
.custom_icon {
  width: 20px;
  height: 20px;
  background: #ff8801;
  border-radius: 5px;
  padding: 1px;
  margin-right: 2px;
}
</style>
