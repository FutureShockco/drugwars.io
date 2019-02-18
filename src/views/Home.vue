<template>
  <div class="height-full">
    <Center>
      <img src="/img/logo.png" class="width-full px-6">
      <img src="/img/hero.png" class="width-full px-2">
      <div class="mt-4 mb-7">
        <a class="rounded-2 px-3 py-2 bg-primary" :href="loginURL">
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
    </Center>
  </div>
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
