<template>
  <UiCenter>
    <div v-if="!isLoading && error">
      <h1>Oops!</h1>
      <h5>{{ error }}</h5>
    </div>
  </UiCenter>
</template>

<script>
export default {
  data() {
    return {
      accessToken: this.$route.query.access_token,
      error: null,
    };
  },
  created() {
    this.$store.dispatch('showLoading');
    this.$store
      .dispatch('login', this.accessToken)
      .then(() => {
        this.$store.dispatch('hideLoading');
        this.$router.push('/');
      })
      .catch(() => {
        this.$store.dispatch('hideLoading');
        this.error = 'Your access token is not valid';
      });
  },
};
</script>
