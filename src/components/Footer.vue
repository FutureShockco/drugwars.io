<template>
  <footer class="footer">
    <ul class="columns mx-2 pb-2 list-style-none">
      <li class="column col-3">
          <a @click.prevent="audio.isPlaying ? pause(audio) : play(audio)" v-for="audio in audios" :key="audio.id">
             <i v-if="audio.isPlaying" class="iconfont icon-mute"></i>
             <i v-else class="iconfont icon-unmute"></i>
          </a>
      </li>
      <li class="column col-3">
        <router-link
          to="/about"
          class="d-block text-center"
        >
          <i class="iconfont icon-question"/>
        </router-link>
      </li>
      <li class="column col-3">
        <a
          target="_blank"
          href="https://discord.me/drugwars"
          class="d-block text-center"
        >
          <i class="iconfont icon-discord"/>
        </a>
      </li>
      <li class="column col-3">
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
  data() {
    return {
      audios: [
        {
          id: 'drugwars',
          name: 'DrugWars',
          file: new Audio('./audio/audio.mp3'),
          isPlaying: false,
        },
      ],
    };
  },
  methods: {
    ...mapActions(['logout']),
    play(audio) {
      audio.isPlaying = true; // eslint-disable-line no-param-reassign
      audio.loop = true; // eslint-disable-line no-param-reassign
      audio.file.play();
    },
    pause(audio) {
      audio.isPlaying = false; // eslint-disable-line no-param-reassign
      audio.file.pause();
    },
  },
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
