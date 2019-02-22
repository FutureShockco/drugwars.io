<template>
  <div class="prize">
    <div class="text">Total Prize</div>
    ${{ parseFloat(total).toFixed(2) }}
    <div>
      <div class="prizes">
        <div class="width-half">
          <div>Daily</div>
          ${{ parseFloat(totalDaily).toFixed(2) }}
        </div>
        <div class="width-half">
          <div>Heist</div>
          ${{ parseFloat(totalHeist).toFixed(2) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    prizeProps() {
      return this.$store.state.game.prizeProps;
    },
    total() {
      const prizePops = this.$store.state.game.prizeProps;
      return (
        ((parseFloat(prizePops.balance) * prizePops.steemprice) / 100) *
        (prizePops.daily_percent + prizePops.heist_percent)
      );
    },
    totalDaily() {
      const prizePops = this.$store.state.game.prizeProps;
      return (
        ((parseFloat(prizePops.balance) * prizePops.steemprice) / 100) * prizePops.daily_percent
      );
    },
    totalHeist() {
      const prizePops = this.$store.state.game.prizeProps;
      return (
        ((parseFloat(prizePops.balance) * prizePops.steemprice) / 100) * prizePops.heist_percent
      );
    },
  },
  methods: {
    ...mapActions(['toggleSidebarVisibility']),
    toggleSidebar() {
      if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1011px)').matches) {
        this.toggleSidebarVisibility();
      }
    },
  },
};
</script>

<style scoped lang="less">
@import '../vars';

.width-half {
  width: 50%;
  line-height: 20px;
  margin: 10px 0;
}

.prize {
  font-family: @heading-font;
  text-align: center;
  font-weight: 700;
  font-size: 2.8em;
  line-height: 38px;
  width: 100%;
  display: block;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  margin: 0 auto;
  text-shadow: 0 0 80px rgba(255, 255, 255, 0.5);
  -webkit-background-clip: text;
  background-clip: revert;
  -webkit-text-fill-color: #dea500;
  -webkit-animation: aitf-data-v-d15d71dc 80s linear infinite;
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;
  background-size: 50px 50px;
  background-color: #dea500;
  background-image: linear-gradient(
    45deg,
    rgba(10, 10, 10, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    #f0ff0c 50%,
    rgb(251, 189, 8) 75%,
    #ffc00024 75%,
    #eff30085
  );
  background-image: -moz-linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
  background-image: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
  -webkit-background-clip: text;

  /* Animate Background Image */

  -webkit-text-fill-color: transparent;
  -webkit-animation: aitf 3s linear infinite;

  /* Activate hardware acceleration for smoother animations */

  -webkit-transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;
}

/* Animate Background Image */

@-webkit-keyframes aitf {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

::selection {
  background-color: black;
  color: #fff;
}

.text {
  font-size: 0.8em;
}

.prizes {
  display: -webkit-box;
  font-size: 0.5em;
}
</style>
