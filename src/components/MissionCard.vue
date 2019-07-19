<template>
    <div class="d-flex flex-lg-row flex-column text-center text-lg-left item">
        <div class="mr-3">
            <img class="preview" :src="`/img/missions/${item.img}.jpg`">
        </div>
        <div class="level">{{ item.type }} - Difficulty : {{item.difficulty}}</div>
        <div class="item-content width-full mr-3 mb-4">
            <h5> {{ item.name }}</h5>
            <!-- <Cost :drugsCost="drugsCost" :weaponsCost="weaponsCost" :alcoholsCost="alcoholsCost" :quantity="1" /> -->
            <div class="mb-2" v-html="item.detail"></div>
              <h5>Enemies</h5>
                <div class="column m-0 mr-2 p-0 col-2 text-center" v-for="unit in item.units" :unit="unit" :key="unit.id">
                    <div class="unitamount"> {{unit.amount.mini}} - {{unit.amount.max}}</div>
                    <img class="mini" :src="`/img/units/${unit.id}.jpg`">
                    <div class="unitname">{{unit.id}}</div>
                </div>
                </div>
                    <div class="mx-auto" v-if="item.rewards">
                <h5>Rewards (in work)</h5>
                <div class="columns m-2 p-2 text-center" v-for="reward in item.rewards" :reward="reward" :key="reward.id">
                    <div v-if="reward.drugs" class="column m-0 p-0 col-6 reward">
                        <Icon name="drug" size="32" />
                        <div>Min:{{reward.drugs.min}} Max:{{reward.drugs.max}}</div>
                    </div>
                    <div v-if="reward.weapons" class="column m-0 p-0 col-6 reward">
                        <Icon name="weapon" size="32" />
                        <div>Min:{{reward.weapons.min}} Max:{{reward.weapons.max}}</div>
                    </div>
                       <div v-if="reward.alcohol" class="column m-0 p-0 col-6 reward">
                        <Icon name="alcohol" size="32" />
                        <div>Min:{{reward.alcohol.min}} Max:{{reward.alcohol.max}}</div>
                    </div>
                     <div v-if="reward.future" class="column m-0 p-0 col-6 reward">
                        <Icon name="future" size="32" />
                        <div>Min:{{reward.future.min}} Max:{{reward.future.max}}</div>
                    </div>
                    <div class="column m-0 p-0 col-6 reward" v-for="unit in reward.units" :unit="unit" :key="unit.id">
                          <div class="unitamount"> {{unit.min}} - {{unit.max}}</div>
                    <img class="mini" :src="`/img/units/${unit.type}.jpg`">
                    <div class="unitname">{{unit.type}}</div>
                    </div>
                </div>

            </div>
        <!-- <div class="mx-auto">
            <Checkout :id="building.id" :level="ownItem.lvl + 1" :coeff="building.coeff" :hqLevel="ownHq.lvl" :inProgress="inProgress" :price="drugsCost / 10000" :notEnough="hasNotEnough" />
        </div> -->
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['item'],
  computed: {
    priceInSteem() {
      return (this.item.price / this.$store.state.game.prizeProps.steemprice).toFixed(3);
    },
  },
  methods: {
    ...mapActions(['requestPayment']),
    handleRequestPayment() {
      this.requestPayment({
        memo: `shop:${this.item.ref},amount:${this.item.quantity}`,
        amount: `${this.priceInSteem} STEEM`,
      });
    },
  },
};
</script>

<style scoped lang="less">
@import '../vars.less';
.shopcard {
  background: -webkit-gradient(linear, left top, left bottom, from(#0e111496), to(#000000cc)),
    url(/img/fake-brick.png);
  background: linear-gradient(#0e111496, #000000cc), url(/img/fake-brick.png);
}

.icon {
  position: relative;
}

.production {
  display: inline-grid;
  color: #fbbd08;
}

.mini {
  width: 100%;
  height: auto;
}

.username {
  color: #fbbd08;
  top: 0px;
}

.reward {
  color: #fbbd08;
  font-size: 9px;
  position: relative;
  background: transparent;
  text-transform: uppercase;
  img {
    max-height: 32px;
    max-width: 32px;
  }
  .unitname {
    top: -2px;
  }
}

.unitname {
  color: #fbbd08;
  font-size: 9px;
  position: relative;
  top: -19px;
  width: 100%;
  background: black;
  text-transform: uppercase;
}

.unitamount {
  width: 100%;
  background: #000000;
  color: #fbbd07;
  font-size: 9px;
}

.detail {
  min-height: 44px;
}

.type {
  color: #fbbd08;
  top: 5px !important;
  font-size: 16px;
}
</style>
