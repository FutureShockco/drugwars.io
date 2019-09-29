<template>
    <img :class="'icon'" :src="`//img.drugwars.io/icons/${name}.png`" :width="size" :height="size" />
</template>

<script>
export default {
  props: ['name', 'size', 'shop'],
};
</script>
