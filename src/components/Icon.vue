<template>
    <img :class="'icon'" :src="`/img/icons/${name}.png`" :width="size" :height="size" />
</template>

<script>
export default {
  props: ['name', 'size', 'shop'],
};
</script>
