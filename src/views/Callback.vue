<template>
  <Center>
    <VueLoadingIndicator v-if="isLoading" class="overlay fixed big transparent"/>
    <div v-if="!isLoading && error">
      <h1>Oops!</h1>
      <h5>{{ error }}</h5>
    </div>
  </Center>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      accessToken: this.$route.query.access_token,
      error: null,
    };
  },
  created() {
    this.isLoading = true;
    this.$store
      .dispatch('login', this.accessToken)
      .then(() => {
        this.isLoading = false;
        this.$router.push('/');
      })
      .catch(() => {
        this.isLoading = false;
        this.error = 'Your access token is not valid';
      });
  },
};
</script>
