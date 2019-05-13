<template>
  <div class="spinner">
  </div>
</template>

<script>
export default {
  methods: {
    handleLoginEvent(data) {
      if (!data.error) {
        this.$router.push(data.state.target || "/");
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$auth.setAccessToken();
      this.$auth.setIdToken();
      window.location.href = '/';
    });
  },
  created() {
    if(!this.$auth.isAuthenticated())
    this.$auth.handleAuthentication();
  },
};
</script>

<style scoped>
.spinner {
  position: absolute;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: white;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>