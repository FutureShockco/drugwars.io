<template>
  <div class="sidebar sidebar-right border-left border-sm-right pt-4 text-center">
    {{ timeToWait | ms }}
    <Prize/>
    <Heist/>
  </div>
</template>

<script>
export default {
  computed: {
    timeToWait() {
      const midnight = new Date().setUTCHours(24, 0, 0, 0);
      return midnight - this.$store.state.ui.timestamp;
    }
  },
}
</script>
