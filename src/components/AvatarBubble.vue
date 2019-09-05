<template>
    <div>
        <div class="avatar" :style="{
          'width': `${size}px`,
          'height': `${size}px`,
        }">
            <span class="avatar-img" :style="{
            'background-image': `url(${picture}`,'background-size':`contain!important`,
            'width': `${size}px`,
            'height': `${size}px`,
           }" />
            <span v-if="rank && rank <4" :class="'avatar-border' + rank" />
            <span v-else class="avatar-border" />
            <span class="rank py-1 px-2" v-if="rank">
          Rank: {{ rank }}
        </span>
                   <span class="prestige py-1 px-2" v-if="reputation">
          Prestige: {{ reputation }}
        </span>
                           <span class="prestige py-1 px-2" v-else>
          Prestige: 1000
        </span>
        </div>
    </div>
</template>

<script>
export default {
  props: ['username', 'size', 'xp', 'rank', 'picture','reputation'],
  data() {
    return {
      config: {
        options: [
          // {
          //     value: "Message"
          // },
          {
            value: 'Attack',
          },
          {
            value: 'Transport',
          },
        ],
        backgroundColor: 'green',
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.game.user.user;
    },
  },
};
</script>

<style scoped lang="less">
@import '../vars.less';
.avatar {
  position: relative;
  overflow: visible;
  .avatar-img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.4);
        background: rgb(15, 15, 15);
  }
  .level {
    display: inline-block;
    position: absolute;
    top: 60 !important;
    left: -40px;
    font-size: 10px;
  }
  
  .avatar-border {
    display: inline-block;
    position: absolute;
    top: -5%;
    left: -12%;
    bottom: -18%;
    right: -10%;
    background-image: url('/img/avatar-border-black.png');
    background-size: contain;
    background-repeat: no-repeat;
  }
  .avatar-border1 {
    display: inline-block;
    position: absolute;
    top: -5%;
    left: -12%;
    bottom: -18%;
    right: -10%;
    background-image: url('/img/avatar-border-gold.png');
    background-size: contain;
    background-repeat: no-repeat;
  }
  .avatar-border2 {
    display: inline-block;
    position: absolute;
    top: -5%;
    left: -12%;
    bottom: -18%;
    right: -10%;
    background-image: url('/img/avatar-border-silver.png');
    background-size: contain;
    background-repeat: no-repeat;
  }
  .avatar-border3 {
    display: inline-block;
    position: absolute;
    top: -5%;
    left: -12%;
    bottom: -18%;
    right: -10%;
    background-image: url('/img/avatar-border-copper.png');
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>
