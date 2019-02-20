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
.width-half {
  width: 50%;
  line-height: 20px;
  margin: 10px 0;
}

.prize {
  text-align: center;
  font-weight: 700;
  font-size: 2.2em;
  line-height: 32px;
  width: 100%;
  display: block;
  box-shadow: none !important;
  margin: 0 auto;
  text-shadow: 0 0 80px rgba(255, 255, 255, 0.5);
  background: url('/img/animated.png') repeat-y;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: #ffdf02b8;
  -webkit-animation: aitf 80s linear infinite;
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;
}

.text {
  font-size: 0.8em;
}

.prizes {
  display: -webkit-box;
  font-size: 0.5em;
}

@-webkit-keyframes aitf {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

@keyframes aitf {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style>
