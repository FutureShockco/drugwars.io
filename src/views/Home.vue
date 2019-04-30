<template>
  <UiCenter class="vue-ui-modal pt-2 pb-7 home">
    <Icon name="logo" class="logo-large"/>
    <div class="mb-5">
      <p>Build your own empire</p>
      <p>Fight with your opponents</p>
      <p>Get rewarded with cryptocurrency</p>
    </div>
    <a class="button button-green button-large mb-4" @click="login">
      Start
    </a>
    <div class="mb-4">
         <router-link
              to="/signup"
              class="py-1 px-4 d-block"
              @click.native="toggleSidebar"
            >
            No Account? Sign up now!
            </router-link>
    </div>
  </UiCenter>
</template>

<script>
import sc from '@/helpers/steemconnect';

export default {
  data() {
    return {
      loginURL: sc.getLoginURL(),
    };
  },
  methods: {
    login() {
      sc.login({}, (err, token) => {
        localStorage.setItem('drugwars_token', token);
        window.location = '/';
      });
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  p {
    font-size: 24px;
  }
}
</style>
