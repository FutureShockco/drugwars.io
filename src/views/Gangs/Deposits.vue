<template>
  <div>
    <GangsTabs />

    <div class="anim-fade-in" v-for="item in items" :key="item.id" v-if="item.name !== 'Embassy'">
      <div class="item width-full mb-0 pb-0 text-center">
        <h5
          class="mt-0 pt-0"
        >{{ item.name }} - total: {{totalPerBuilding(item.id) | amount}} - Average: {{averagePerBuilding(item.id) | amount}}</h5>
      </div>
      <div class="item mt-0 pt-0">
        <div class="row width-full">
          <div class="row columns text-center">
            <h5 class="name column col-1 p-0 m-0">Rank</h5>
            <h5 class="name column col-3 p-0 m-0">Players</h5>
            <h5 class="name column col-2 p-0 m-0">Drugs</h5>
            <h5 class="name column col-2 p-0 m-0">Weapons</h5>
            <h5 class="name column col-2 p-0 m-0">Alcohol</h5>
            <h5 class="name column col-2 p-0 m-0">Total</h5>
          </div>

          <div
            v-for="(deposit, index) in deposits(item.id)"
            :key="deposit.username"
            class="text-center"
          >
            <div v-if="deposit.building === item.id" class="deposit columns">
              <h5 class="name column col-1 p-0 m-0">{{index+1}}</h5>
              <h5 class="name column col-3 p-0 m-0 text-blue">{{deposit.nickname}}</h5>
              <h5
                :class="{ 'text-green': Number(averageDrugsPerBuilding(item.id)) < deposit.drugs }"
                class="name column col-2 p-0 m-0"
              >{{deposit.drugs | amount}} ({{averageDrugs(item.id,deposit.drugs)}}%)</h5>
              <h5
                :class="{ 'text-green': Number(averageWeaponsPerBuilding(item.id)) < deposit.weapons }"
                class="name column col-2 p-0 m-0"
              >{{deposit.weapons | amount}} ({{averageWeapons(item.id,deposit.weapons)}}%)</h5>
              <h5
                :class="{ 'text-green': Number(averageAlcoholPerBuilding(item.id)) < deposit.alcohol }"
                class="name column col-2 p-0 m-0"
              >{{deposit.alcohol | amount}} ({{averageAlcohol(item.id,deposit.alcohol)}}%)</h5>
              <h5
                :class="{ 'text-green': Number(averagePerBuilding(item.id)) < deposit.total }"
                class="name column col-2 p-0 m-0"
              >{{deposit.total | amount}} ({{averageTotal(item.id,deposit.total)}}%)</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { buildings } from 'drugwars';
import Promise from 'bluebird';
import client from '@/helpers/client';
import { filter, pickBy, orderBy } from 'lodash';
import { mapActions } from 'vuex';

export default {
 data() {
  return {
   items: filter(pickBy(buildings, b => b.type === 'gang'), item => item.id !== 'exchange'),
   isLoading: false,
   buildings: [],
   alldeposits: [],
   id: this.$route.params.id,
   buildingDeposits: {},
  };
 },
 created() {
  this.load_buildings();
  const promises = [client.requestAsync('get_gang_deposits', this.id)];
  Promise.all(promises).then(result => {
   let depositers = [];
   [depositers] = result;
   depositers.forEach(user => {
    const total = user.drugs + user.weapons + user.alcohol;
    user.total = total; // eslint-disable-line no-param-reassign
    this.alldeposits.push(user);
    if (this.buildingDeposits[user.building]) {
     this.buildingDeposits[user.building].drugs += user.drugs;
     this.buildingDeposits[user.building].weapons += user.weapons;
     this.buildingDeposits[user.building].alcohol += user.alcohol;
     this.buildingDeposits[user.building].total += user.drugs + user.weapons + user.alcohol;
     this.buildingDeposits[user.building].member += 1;
    } else {
     this.buildingDeposits[user.building] = {};
     this.buildingDeposits[user.building].drugs = user.drugs;
     this.buildingDeposits[user.building].weapons = user.weapons;
     this.buildingDeposits[user.building].alcohol = user.alcohol;
     this.buildingDeposits[user.building].total = user.drugs + user.weapons + user.alcohol;
     this.buildingDeposits[user.building].member = 1;
    }
   });
   this.isInit = false;
   this.isLoading = false;
  });
 },
 methods: {
  ...mapActions(['init', 'notify', 'refresh_gang_buildings']),
  load_buildings() {
   this.isLoading = true;
   this.refresh_gang_buildings()
    .then(() => {
     this.isLoading = false;
    })
    .catch(e => {
     console.error('Failed', e);
     this.isLoading = false;
    });
  },
  averageDrugs(id, value) {
   if (this.buildingDeposits[id] && this.buildingDeposits[id].drugs)
    return parseFloat((value / this.buildingDeposits[id].drugs) * 100).toFixed(2);
  },
  averageWeapons(id, value) {
   if (this.buildingDeposits[id] && this.buildingDeposits[id].weapons)
    return parseFloat((value / this.buildingDeposits[id].weapons) * 100).toFixed(2);
  },
  averageAlcohol(id, value) {
   if (this.buildingDeposits[id] && this.buildingDeposits[id].alcohol)
    return parseFloat((value / this.buildingDeposits[id].alcohol) * 100).toFixed(2);
  },
  averageTotal(id, value) {
   if (this.buildingDeposits[id] && this.buildingDeposits[id].total)
    return parseFloat((value / this.buildingDeposits[id].total) * 100).toFixed(2);
  },
  averageDrugsPerBuilding(id) {
   if (this.buildingDeposits[id] && this.buildingDeposits[id].total)
    return this.buildingDeposits[id].total / this.alldeposits.length;
  },
  averageWeaponsPerBuilding(id) {
   if (this.buildingDeposits[id] && this.buildingDeposits[id].total)
    return this.buildingDeposits[id].total / this.alldeposits.length;
  },
  averageAlcoholPerBuilding(id) {
   if (this.buildingDeposits[id] && this.buildingDeposits[id].total)
    return this.buildingDeposits[id].total / this.alldeposits.length;
  },
  averagePerBuilding(id) {
   if (this.buildingDeposits[id] && this.buildingDeposits[id].total)
    return this.buildingDeposits[id].total / this.alldeposits.length;
  },
  totalPerBuilding(id) {
   if (this.buildingDeposits[id] && this.buildingDeposits[id].total)
    return this.buildingDeposits[id].total;
  },
  deposits(id) {
   return filter(orderBy(this.alldeposits, 'total', 'desc'), item => item.building === id);
  },
 },
 computed: {},
};
</script>

<style lang="less" scoped>
.name {
 font-size: 14px !important;
}

.special {
 color: rgb(0, 173, 0);
 font-weight: 700;
}

.deposit {
 background: rgba(0, 0, 0, 0.699);
 border-radius: 5px;
}

.buildingname {
 height: 50px;
 overflow: hidden;
}
</style>
