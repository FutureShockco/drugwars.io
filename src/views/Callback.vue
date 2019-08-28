<template>
    <Splash/>
</template>

<script>
export default {
  data() {
    return {
      accessToken: this.$route.query.access_token,
      error: null,
    };
  },
  methods: {
    handleLoginEvent(data) {
      if (!data.error) {
        this.$router.push(data.state.target || '/');
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
    if (!this.$auth.isAuthenticated()) this.$auth.handleAuthentication();
  },
};
</script>
