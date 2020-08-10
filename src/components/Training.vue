<template>
  <div
    class="d-flex flex-lg-row flex-column text-center text-lg-left item"
    :class="{ progress: inProgress, 'not-enough': hasNotEnough }"
  >
    <div class="mr-3">
      <img class="preview" :src="`//img.drugwars.io/trainings/${training.id}.jpg`" />
    </div>
    <div class="level">{{ ownItem.lvl }}</div>
    <div class="item-content width-full mr-3 mb-4">
      <h5>{{ training.name }}</h5>
      <Cost
        :drugsCost="drugsCost"
        :weaponsCost="weaponsCost"
        :alcoholsCost="alcoholsCost"
        :quantity="1"
      />
      <div class="mb-2" v-html="training.desc"></div>
      <div v-if="training.feature" class="mb-2">
        <span class="text-orange">{{ training.feature }}</span>
      </div>
      <div v-for="unit in training_modificator[training.id]" :key="unit"  class="d-inline">
        <div v-if="unit==='all'">
            <div v-for="u in units" :key="u.id" class="d-inline">
                <img v-if="u.id && !u.npc" class="preview unit mini" :style="`background-image: url('//img.drugwars.io/cards/background/classic_unit${randomPickBkg}.png');`" width="50" :src="`//img.drugwars.io/units/${u.id}.png`">
            </div>
        </div>
        <div v-else-if="unit==='melee'">
            <div v-for="u in units" :key="u.id" class="d-inline">
                <img v-if="u.id && u.type ==='Melee' && !u.npc" class="preview unit mini" :style="`background-image: url('//img.drugwars.io/cards/background/classic_unit${randomPickBkg}.png');`" width="50" :src="`//img.drugwars.io/units/${u.id}.png`">
            </div>       
             </div>
            <div v-else-if="unit==='range'">
            <div v-for="u in units" :key="u.id" class="d-inline">
                <img v-if="u.id && u.type ==='Range' && !u.npc" class="preview unit mini" :style="`background-image: url('//img.drugwars.io/cards/background/classic_unit${randomPickBkg}.png');`" width="50" :src="`//img.drugwars.io/units/${u.id}.png`">
            </div>       
             </div>
             <div v-else class="d-inline">
              <div v-for="u in units" :key="u.id" class="d-inline" v-if="unit === u.id  && !u.npc">
                  <img  class="preview unit mini" :style="`background-image: url('//img.drugwars.io/cards/background/classic_unit${randomPickBkg}.png');`" width="50" :src="`//img.drugwars.io/units/${u.id}.png`">
              </div>   
             </div>
         
      </div>
    </div>

    <div></div>
    <div class="mx-auto">
      <div v-if="(training.id === 'routing' && ownItem.lvl > 209)">Max level reached</div>
      <CheckoutTraining
        v-else
        :id="training.id"
        :level="ownItem.lvl + 1"
        :coeff="training.coeff"
        :researchCenterLvl="ownResearchCenter.lvl"
        :inProgress="inProgress"
        :price="drugsCost / 80000"
        :notEnough="hasNotEnough"
      />
    </div>
  </div>
</template>

<script>
import { utils } from 'drugwars';
import { getBalances } from '@/helpers/utils';
import { units } from 'drugwars';

export default {
  props: ['training'],
  data() {
    return {
      training_modificator: {
        routing: ['all'],
        closecombat: ['melee'],
        firearms: ['range'],
        information: ['all'],
        sniping: ['sniper'],
        spiritwine: ['hobo'],
        coordination: ['all'],
        chemical: ['mercenary', 'knifer'],
        weapon: ['rowdy', 'sniper', 'hitman', 'biker'],
        fire: ['gunman', 'helicopter'],
        protection: ['all'],
        bomb: ['bazooka'],
        psychological: ['mercenary', 'knifer', 'big_mama', 'ninja'],
      },
      units,
    };
  },
  computed: {
    user() {
      return this.$store.state.game.user.user;
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
    hasNotEnough() {
      return (
        this.drugsCost > this.balances.drugs ||
        this.weaponsCost > this.balances.weapons ||
        this.alcoholsCost > this.balances.alcohols
      );
    },
    ownItem() {
      return (
        this.$store.state.game.user.trainings.find(b => b.training === this.training.id) || {
          lvl: 0,
        }
      );
    },
    ownResearchCenter() {
      return (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'research_center' &&
            b.base === this.$store.state.game.mainbase.base &&
            b.territory === this.$store.state.game.mainbase.territory,
        ) || {
          lvl: 0,
        }
      );
    },
    drugsCost() {
      return utils.calculateCostToUpgrade(this.training.drugs_cost, this.ownItem.lvl);
    },
    weaponsCost() {
      return utils.calculateCostToUpgrade(this.training.weapons_cost, this.ownItem.lvl);
    },
    alcoholsCost() {
      return utils.calculateCostToUpgrade(this.training.alcohols_cost, this.ownItem.lvl);
    },
    inProgress() {
      if (!this.ownItem) return false;
      if (this.ownItem.pending_update) {
        const pendingUpdate = new Date(this.ownItem.pending_update).getTime();
        const now = new Date().getTime();
        return pendingUpdate >= now;
      }
      const nextUpdate = new Date(this.ownItem.next_update).getTime();
      const now = new Date().getTime();
      return nextUpdate >= now;
    },
    randomPickBkg() {
      const rnd = Math.floor(Math.random() * Math.floor(process.env.VUE_APP_COMMON_RND_BKG)) + 1;
      return rnd;
    },
  },
};
</script>
