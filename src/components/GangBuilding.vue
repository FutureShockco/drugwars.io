<template>
    <div class="d-flex flex-lg-row flex-column text-center text-lg-left item" :class="{ progress: inProgress, 'not-enough': hasNotEnough }">
        <div class="mr-3">
            <img class="preview" :src="`/img/buildings/${building.id}.jpg`">
        </div>
        <div class="level">{{ ownItem.lvl }}</div>
        <div class="item-content width-full mr-3 mb-4">
            <h5>{{ building.name }}</h5>
            <div class="columns">
                <div class="column col-4 text-center" v-if="drugsCost && (building.id !=='exchange' || ownItem.lvl < 1) && (building.id !== 'embassy' || ownItem.lvl < 1)">
                    <ProgressBar :icon="'drug'" :color="'#00b31e'" :width="70" font-size="20" :pv="progressPercent(ownItem.drugs,drugsCost,drugs_amount)" :total="ownItem.drugs" :cost="drugsCost" :bold="12" :text-bg-color="'#1f1f1f'" :during="3" :border-color="'#ffc508'"
                        :bg-color="'#fbb034'" :text-color="'#ffffff'" />
                    <input type="number" v-model="drugs_amount" placeholder="amount" class="mt-5 input">
                </div>
                <div class="column col-4 text-center" v-if="weaponsCost && (building.id !=='exchange' || ownItem.lvl < 1) && (building.id !== 'embassy' || ownItem.lvl < 1)">
                    <ProgressBar :icon="'weapon'" :color="'#00b31e'" :width="70" font-size="20" :pv="progressPercent(ownItem.weapons,weaponsCost,weapons_amount)" :total="ownItem.weapons" :cost="weaponsCost" :bold="12" :text-bg-color="'#1f1f1f'" :during="3" :border-color="'#ffc508'"
                        :bg-color="'#fbb034'" :text-color="'#ffffff'" />
                    <input type="number" v-model="weapons_amount" placeholder="amount" class="mt-5 input">
                </div>
                <div class="column col-4 text-center" v-if="alcoholsCost && (building.id !=='exchange' || ownItem.lvl < 1) && (building.id !== 'embassy' || ownItem.lvl < 1)">
                    <ProgressBar :icon="'alcohol'" :color="'#00b31e'" :width="70" font-size="20" :pv="progressPercent(ownItem.alcohol,alcoholsCost,alcohol_amount)" :total="ownItem.alcohol" :cost="alcoholsCost" :bold="12" :text-bg-color="'#1f1f1f'" :during="3" :border-color="'#ffc508'"
                        :bg-color="'#fbb034'" :text-color="'#ffffff'" />
                    <input type="number" v-model="alcohol_amount" placeholder="amount" class="mt-5 input">
                </div>
                <div class="ml-5" v-if="dwdCost && (building.id !=='exchange' || ownItem.lvl < 1) && (building.id !== 'embassy' || ownItem.lvl < 1)">
                    <ProgressBar :icon="'dwd'" :color="'#00b31e'" :width="70" font-size="20" :pv="progressPercent(ownItem.dwd,dwdCost,dwd_amount)" :total="ownItem.dwd" :cost="dwdCost" :bold="12" :text-bg-color="'#1f1f1f'" :during="3" :border-color="'#ffc508'" :bg-color="'#fbb034'"
                        :text-color="'#ffffff'" />
                    <input type="number" v-model="dwd_amount" placeholder="amount" class="mt-5 input">
                </div>
            </div>
            <div class="mt-2 mb-2" v-html="building.desc"></div>
            <div v-if="building.feature" class="mb-2">
                UNIQUE:
                <span class="text-orange">{{ building.feature }}</span>
            </div>
        </div>
        <div class="mx-auto">
            <CheckoutGangBuilding :id="building.id" :level="ownItem.lvl + 1" :coeff="building.coeff" :hqLevel="ownHq.lvl" :inProgress="inProgress" :price="drugsCost / 10000" :notEnough="hasNotEnough" :notEnoughForUpgrade="hasNotEnoughForUpgrade" :drugs="drugs_amount"
                :weapons="weapons_amount" :alcohol="alcohol_amount" :dwd="dwd_amount" />
        </div>
    </div>
</template>

<script>
import { utils } from 'drugwars';
import { getBalances } from '@/helpers/utils';

export default {
  props: ['building'],
  data() {
    return {
      id: this.$route.params.id,
      isInit: false,
      isLoading: false,
      gang: null,
      members: null,
      message: null,
      applies: null,
      drugs_amount: 0,
      weapons_amount: 0,
      alcohol_amount: 0,
      dwd_amount: 0,
    };
  },
  computed: {
    user() {
      return this.$store.state.game.user.user;
    },
    isBoss() {
      return this.user.role === 'boss' && this.user.gang === this.id;
    },
    base() {
      return this.$store.state.game.mainbase;
    },
    HQ() {
      if (
        this.base &&
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'headquarters' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        )
      ) {
        return this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'headquarters' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        );
      }
      return this.$store.state.game.user.buildings.find(b => b.building === 'headquarters');
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
    hasNotEnough() {
      return (
        parseInt(this.drugs_amount) > this.balances.drugs ||
        parseInt(this.weapons_amount) > this.balances.weapons ||
        parseInt(this.alcohol_amount) > this.balances.alcohols ||
        parseInt(this.dwd_amount) > this.balances.dwd
      );
    },
    hasNotEnoughForUpgrade() {
      if (!this.ownItem.drugs) return true;
      return (
        this.drugsCost > this.ownItem.drugs ||
        this.weaponsCost > this.ownItem.weapons ||
        this.alcoholsCost > this.ownItem.alcohol ||
        this.dwdCost > this.ownItem.dwd
      );
    },
    ownItem() {
      return (
        this.$store.state.game.gang_buildings.find(b => b.building === this.building.id) || {
          lvl: 0,
        }
      );
    },
    ownHq() {
      return (
        this.$store.state.game.gang_buildings.find(b => b.building === 'gang_hq') || {
          lvl: 0,
        }
      );
    },
    drugsCost() {
      return utils.calculateCostToUpgrade(this.building.drugs_cost, this.ownItem.lvl) || 0;
    },
    weaponsCost() {
      return utils.calculateCostToUpgrade(this.building.weapons_cost, this.ownItem.lvl) || 0;
    },
    alcoholsCost() {
      return utils.calculateCostToUpgrade(this.building.alcohols_cost, this.ownItem.lvl) || 0;
    },
    dwdCost() {
      return utils.calculateCostToUpgrade(this.building.dwd_cost, this.ownItem.lvl) || 0;
    },
    inProgress() {
      if (!this.ownItem) return false;
      const pendingUpdate = new Date(this.ownItem.last_update).getTime();
      const now = new Date().getTime();
      return pendingUpdate >= now;
    },
  },
  methods: {
    progressPercent(total, cost, amount) {
      let progress;
      if (total && cost && amount) {
        this.up = true;
        progress = parseFloat(((total + parseInt(amount)) * 100) / cost).toFixed(2);
        return progress < 100 ? progress : 100;
      }
      if (total && cost) {
        this.up = false;
        progress = parseFloat((total * 100) / cost).toFixed(2);
        return progress < 100 ? progress : 100;
      }
      if (amount) {
        this.up = false;
        progress = parseFloat((parseInt(amount) * 100) / cost).toFixed(2);
        return progress < 100 ? progress : 100;
      }
      this.up = false;
      return 0;
    },
  },
};
</script>

<style scoped lang="less">
@import '../vars.less';
.input {
  width: 70px;
  font-family: 'Bebas Neue', Helvetica, Arial, sans-serif;
  font-weight: 500;
  letter-spacing: 1px;
  border-radius: 3px;
  border: none;
  font-size: 15px;
  line-height: 34px;
  height: 34px;
  padding: 0 8px;
  text-align: center;
}
</style>
