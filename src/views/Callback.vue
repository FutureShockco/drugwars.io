<template>
  <Splash/>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      accessToken: this.$route.query.access_token,
      error: null,
    };
  },
  methods: mapActions(['showLoading', 'hideLoading', 'login']),
  created() {
    this.showLoading();
    this.login(this.accessToken)
      .then(() => {
        localStorage.setItem('drugwars_token', this.accessToken);
        localStorage.setItem('auth', 'sc');
        window.location = '/';
      })
      .catch(e => {
        console.error('Your access token is not valid', e);
      });
  },
};
</script>
