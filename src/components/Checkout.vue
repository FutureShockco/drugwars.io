<template>
  <div class="checkout float-right ml-4 mr-3 pt-3">
    <div class="label-yellow mb-2">
      {{ inProgress ? timeToWait : buildingTime | ms }}
    </div>
    <button
      :disabled="isLoading || inProgress"
      @click="handleUpgradeBuilding()"
      class="btn btn-block btn-green btn-success mb-2"
    >
      {{ inProgress ? 'Upgrading' : 'Upgrade' }}
    </button>
    <Loading v-if="isLoading || inProgress"/>
    <span class="ml-3 instant">Instant upgrade</span>
    <button
      :disabled="isLoading"
      @click="handleRequestPayment()"
      class="btn btn-block btn-blue mb-2"
    >
      ${{ price | amount }}, {{ priceInSteem | amount }} STEEM
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { calculateTimeToBuild } from '@/helpers/utils';

export default {
  props: ['id', 'level', 'coeff', 'hqLevel', 'inProgress', 'price'],
  data() {
    return {
      isLoading: false,
      timeToWait: 0,
    };
  },
  computed: {
    buildingTime() {
      return calculateTimeToBuild(this.id, this.coeff, this.level, this.hqLevel);
    },
    priceInSteem() {
      return (this.price / this.$store.state.game.prizeProps.steemprice).toFixed(3);
    },
  },
  methods: {
    ...mapActions(['upgradeBuilding', 'requestPayment']),
    calculateTime() {
      const building = this.$store.state.game.user.buildings.find(b => b.building === this.id);
      if (building) {
        const nextUpdate = new Date(building.next_update).getTime();
        const now = new Date().getTime();
        const self = this;
        this.timeToWait = nextUpdate - now;
        setTimeout(self.calculateTime, 1000);
      }
    },
    handleUpgradeBuilding() {
      this.isLoading = true;
      this.upgradeBuilding({ id: this.id, level: this.level })
        .then(result => {
          console.log('Result', result);
          this.isLoading = false;
        })
        .catch(e => {
          console.error('Failed', e);
          this.isLoading = false;
        });
    },
    handleRequestPayment() {
      this.requestPayment({
        memo: `upgrade:${this.id}`,
        amount: `${this.priceInSteem} STEEM`,
      });
    },
  },
  mounted() {
    this.calculateTime();
  },
};
</script>

<style scoped lang="less">
.checkout {
  width: 240px;

  &.pending {
    opacity: 0.8;
  }
}

.btn-blue {
  border: none;
  line-height: 10px;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  text-decoration: none;
  background-image: -webkit-radial-gradient(
    ellipse farthest-corner at center 0px,
    #04609e -150%,
    #04609e 45%,
    #132fb9 85%
  );
  background-image: -o-radial-gradient(
    ellipse farthest-corner at center 0px,
    #04609e -150%,
    #04609e 45%,
    #132fb9 85%
  );
  background-image: -moz-radial-gradient(
    ellipse farthest-corner at center 0px,
    #04609e -150%,
    #04609e 45%,
    #132fb9 85%
  );
  background-image: radial-gradient(
    ellipse farthest-corner at center 0px,
    #04609e -150%,
    #04609e 45%,
    #132fb9 85%
  );
}

.btn-green {
  border: none;
  line-height: 10px;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  text-decoration: none;
  color: white;
  background-image: -webkit-radial-gradient(
    ellipse farthest-corner at center 0px,
    #097a14 -150%,
    #289f31 45%,
    #25ba2f 85%
  );
  background-image: -o-radial-gradient(
    ellipse farthest-corner at center 0px,
    #097a14 -150%,
    #289f31 45%,
    #25ba2f 85%
  );
  background-image: -moz-radial-gradient(
    ellipse farthest-corner at center 0px,
    #097a14 -150%,
    #289f31 45%,
    #25ba2f 85%
  );
  background-image: radial-gradient(
    ellipse farthest-corner at center 0px,
    #097a14 -150%,
    #289f31 45%,
    #25ba2f 85%
  );
}

.label-yellow {
  border-radius: 5px;
  color: black !important;
  pointer-events: none;
  font-weight: 700;
  text-align: center;
  line-height: 22px;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  text-decoration: none;
  background-image: -webkit-radial-gradient(
    ellipse farthest-corner at center 0px,
    #ffc400 -150%,
    #ffc400 45%,
    #ff8800 85%
  );
  background-image: -o-radial-gradient(
    ellipse farthest-corner at center 0px,
    #ffc400 -150%,
    #ffc400 45%,
    #ff8800 85%
  );
  background-image: -moz-radial-gradient(
    ellipse farthest-corner at center 0px,
    #ffc400 -150%,
    #ffc400 45%,
    #ff8800 85%
  );
  background-image: radial-gradient(
    ellipse farthest-corner at center 0px,
    #ffc400 -150%,
    #ffc400 45%,
    #ff8800 85%
  );
}

.instant {
  font-size: 12px;
  color: #0c4782;
  font-weight: bold;
}
</style>
