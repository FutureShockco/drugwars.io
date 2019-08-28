<template>
    <div class="position-fixed left-0 bottom-0 p-4">
        <div class="flash anim-scale-in mt-2 p-2" v-for="(item, key) in items" :class="`flash-${item.type}`" :key="key" v-if="timestamp < item.timestamp + 10">
            {{ item.message }}
        </div>
    </div>
</template>

<script>
export default {
  computed: {
    items() {
      return this.$store.state.ui.notifications;
    },
    timestamp() {
      return parseInt(this.$store.state.ui.timestamp / 1000);
    },
  },
};
</script>
