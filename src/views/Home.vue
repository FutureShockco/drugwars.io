<template>
  <UiCenter class="anim-fade-in">
    <img
      src="/img/logo.png"
      class="width-full p-6"
    />
    <div class="mt-4 mb-7">
      <a class="btn btn-large btn-primary" :href="loginURL">
        Play now
      </a>
    </div>
    <div class="mb-4">
      <p>Build your own empire</p>
      <p>Fight with your opponents</p>
      <p>Get rewarded with cryptocurrency</p>
    </div>
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
