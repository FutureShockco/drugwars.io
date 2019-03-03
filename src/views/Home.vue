<template>
  <UiCenter class="vue-ui-modal pt-2 pb-7 home">
    <Icon name="logo" class="logo-large"/>
    <div class="mb-5">
      <p>Build your own empire</p>
      <p>Fight with your opponents</p>
      <p>Get rewarded with cryptocurrency</p>
    </div>
    <a class="button button-green button-large mb-4" :href="loginURL">
      Start
    </a>
    <div class="mb-4">
      New to Steem?
      <a href="https://account.steem.ninja/?ref=drugwars">
        Sign up now
      </a>
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
};
</script>

<style lang="less" scoped>
.home {
  p {
    font-size: 24px;
  }
}
</style>
