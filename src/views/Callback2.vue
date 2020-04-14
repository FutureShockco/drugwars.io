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
  methods: {
    ...mapActions(['showLoading', 'hideLoading', 'login']),
    handleLoginEvent(data) {
      if (!data.error) {
        this.$router.push(data.state.target || '/');
      }
    },
  },
  mounted() {
    console.log(this.$route.query.access_token)
    this.$nextTick(() => {
      if(localStorage.getItem('logintype')==='steem')
       this.login(this.accessToken)
      .then(() => {
        window.location = '/';
      })
      .catch(e => {
        console.error('Your access token is not valid', e);
      });
      else{
        this.$auth.setAccessToken();
        this.$auth.setIdToken();
        window.location.href = '/';
      }
    });
  },
  created() {
    if (!this.$auth.isAuthenticated() && localStorage.getItem('logintype') === 'social') this.$auth.handleAuthentication();
  },
};
</script>
