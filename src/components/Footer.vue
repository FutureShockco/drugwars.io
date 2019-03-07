<template>
  <footer class="footer">
    <ul class="columns mx-2 pb-2 list-style-none">
      <li class="column col-4">
        <router-link
          to="/about"
          class="d-block text-center"
        >
          <i class="iconfont icon-question"/>
        </router-link>
      </li>
      <li class="column col-4">
        <a
          target="_blank"
          href="https://discord.gg/Cs7Xy7G"
          class="d-block text-center"
        >
          <i class="iconfont icon-discord"/>
        </a>
      </li>
      <li class="column col-4">
        <a
          href="#"
          @click.prevent="logout"
          class="d-block text-center"
        >
          <i class="iconfont icon-sign-out"/>
        </a>
      </li>
    </ul>
    <div class="company">Made by <a href="https://github.com/FutureShockco" target="_blank"> FutureShock</a> </div>
  </footer>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: mapActions(['logout']),
};
</script>

<style scoped lang="less">
@import '../vars';

.footer {
  i {
    font-size: 22px;
  }

  ul {
    a {
      opacity: 0.4;
      color: @text-color;
      display: block;

      &:hover {
        opacity: 1;
      }
    }
  }
  .company {
    opacity: 0.5;
    text-align: center;
    padding: 15px;
  }
}
</style>
