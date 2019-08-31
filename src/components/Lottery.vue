<template>
    <div class="pt-2 my-4 lottery">
        <h4>Lottery</h4>
        <img width="150px" :src="`/img/lottery.jpg`">
        <div class="lottery-text text-center">
        <div class="pt-2">TICKETS: {{myTickets}}</div>
        <div class="text-green">Last winner : {{ lastWinner.nickname || 'government'}}</div>
        <div class="text-yellow">Amount : {{ lastWinner.amount }} </div>
        </div>
        <form @submit.prevent="handleSubmit" class="mb-2">
               <input class="input form-control input-block mb-2" v-model="amount" type="number" min="1">
              <button
                :disabled="isLoading  || notEnoughDWD || !base"
                type="submit" 
                class="button btn-block button-yellow mb-2">
              <img class="dwdicon" src="/img/icons/dwd.png"/>
              <span> ${{ dwdPrice | amount }} = </span>
                {{ priceInDWD  }} DWD
              </button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { getBalances } from '@/helpers/utils';
import Promise from 'bluebird';

export default {
  data() {
    return {
      isLoading: false,
      amount: 1,
    };
  },
  computed: {
    prizeProps() {
      return this.$store.state.game.prizeProps;
    },
    user() {
      return this.$store.state.game.user.user;
    },
    base() {
      return this.$store.state.game.mainbase;
    },
    priceInSteem() {
      return (this.priceInDWD * this.$store.state.game.prizeProps.steemprice).toFixed(3);
    },
    priceInDWD() {
      return (this.amount * 0.001).toFixed(3);
    },
    dwdPrice() {
      const price = this.$store.state.game.prizeProps.seProps.lastPrice || 0;
      return (price * this.priceInDWD) * this.$store.state.game.prizeProps.steemprice;
    },
    notEnoughDWD() {
      return this.priceInDWD > this.$store.state.game.user.user.dwd;
    },
    steemAccount() {
      if (this.$store.state.auth.account) return this.$store.state.auth.account;
      return false;
    },
    myTickets(){
      if(this.$store.state.game.user.lottery && this.$store.state.game.user.lottery[0])
      {
       return this.$store.state.game.user.lottery[0].ticket;

      }
      else return 0
    },
    lastWinner(){
      return  this.$store.state.game.prizeProps.lotterywinner[0]
    },
    balances() {
      let ocLvl = 0;
      if (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        )
      )
        ocLvl = this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        ).lvl;
      let labLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'scientific_lab'))
        labLvl = this.$store.state.game.gang_buildings.find(b => b.building === 'scientific_lab')
          .lvl;
      let weaponLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'weapon_center'))
        weaponLvl = this.$store.state.game.gang_buildings.find(b => b.building === 'weapon_center')
          .lvl;
      let distilleryLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'distillery_school'))
        distilleryLvl = this.$store.state.game.gang_buildings.find(
          b => b.building === 'distillery_school',
        ).lvl;
      return getBalances(
        this.HQ,
        ocLvl,
        labLvl,
        weaponLvl,
        distilleryLvl,
        this.$store.state.ui.timestamp,
      );
    },
    ownHeistReward() {
      const percent = (100 / this.prizeProps.heist_pool) * this.totalVest;
      const amount = parseFloat((this.totalHeistDWD / 100) * percent).toFixed(3);
      return {
        amount,
        percent,
      };
    },
  },
  methods: {
    ...mapActions(['send','init']),
    handleSubmit() {
      if (Number(this.amount) > 0) {
        this.isLoading = true;
        const payload = {
          amount: Math.round(Number(this.amount)),
          type:'dw-lottery'
        };
        this.send(payload)
          .then(() => {
            Promise.delay(3000).then(() => {
              this.init();
              this.isLoading = false;
              this.amount = 0;
            });
          })
          .catch(e => {
            console.error('Failed to buy ticket', e);
            this.isLoading = false;
          });
      }
    },
  },
};
</script>

<style scoped lang="less">
h4 {
  text-transform: uppercase;
  transform: translate(-50%, -50%) skew(-24deg) rotate(-10deg);
  top: 120px;
  width: fit-content;
  left: 50%;
  font-size: 26px;
  margin: 0;
  line-height: 0px;
  position: relative;
  text-rendering: optimizeLegibility;
  font-weight: 900;
  color: #db2828;
  text-shadow: 1px 4px 6px #000, 0 0 0 #0b0b0b, 1px 4px 6px #101010;
  white-space: nowrap;
}

.lottery{
  position: relative;
}

.lottery-text{
  color: white;
  text-transform: uppercase;
  font-weight: 700;
  padding: 3px 25px;
  font-size: 11px;
  position: absolute;
  top:20px;
  display: block!important;
}

.checkout {
  text-align: center;
  width: 180px;
}

.dwdicon {
  width: 22px;
  left: 0px;
  position: relative;
  float: left;
  top: 5px;
}
</style>
