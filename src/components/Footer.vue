<template>
  <footer class="footer">
    <ul class="columns mx-2 pb-2">
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
}
</style>
