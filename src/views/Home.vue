<template>
  <div class="height-full">
    <Center>
      <span class="logo iconfont icon-beaker"/>
      <h4 class="m-0">drugwars</h4>
      <div class="mt-4 mb-7">
        <h1 class="mb-6">Get paid to rule your world!</h1>
        <a class="rounded-2 px-3 py-2 bg-primary text-white" :href="loginURL">
          Log in
        </a>
      </div>
      <Footer/>
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
