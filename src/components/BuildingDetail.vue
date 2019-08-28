<template>
    <div>
        <div class="d-flex flex-lg-row text-center text-lg-left item">
            <div class="mr-3">
                <img class="preview" :src="`/img/buildings/${building.id}.jpg`">
            </div>
            <div class="level">{{ ownItem.lvl }}</div>
            <div class="item-content width-full">
                <h5>{{ building.name }}</h5>
                <div class="mb-2" v-html="building.desc"></div>
                <div v-if="building.feature" class="mb-2">
                    UNIQUE:
                    <span class="text-orange">{{ building.feature }}</span>
                </div>
            </div>
        </div>
        <div class="item-content width-full">
            <div v-for="level in nextLevels" :key="level" class="border-bottom mx-3">
                <h5 class="mb-0 mt-0">Level {{level}}</h5>
                <Cost :drugsCost="drugsCost(level)" :weaponsCost="weaponsCost(level)" :alcoholsCost="alcoholsCost(level)" :quantity="1" />
                <div v-if="building.production_type" class="mb-2">
                    <BuildingProduction :compactview="1" :production_type="building.production_type" :level="level" :coeff="building.coeff" :production_rate="building.production_rate" />
                </div>
                <div v-if="['drug_storage', 'weapon_storage', 'alcohol_storage'].includes(building.id)" class="mb-2">
                    <div v-if="level"><b>Capacity:</b> {{ (10000+(35000 * level * (Math.sqrt(250-level)) / 100) * level ) | amount }}</div>
                    <div v-if="level"><b>Safe:</b> {{ (10000+(35000 * level * (Math.sqrt(250-level)) / 100) * level ) /100*25 | amount }}</div>
                    <div v-else><b>Safe:</b> {{ 10000 /100*25 | amount }}</div>
                </div>
                <div v-if="['headquarters'].includes(building.id)" class="mb-2">
                    Coming Soon
                </div>
                <div v-if="['training_facility'].includes(building.id)" class="mb-2">
                    <div v-if="level"><b>Super Bouncer:</b> {{(0.84 * 200 - (0.84 * 240 * level) / 100) * (1 * 1000) | ms}}</div>
                    <div v-if="level"><b>Big Mama:</b> {{(4.72 * 200 - (4.72 * 240 * level) / 100) * (1 * 1000) | ms}}</div>
                    <div v-if="level"><b>Spy :</b> {{(0.65 * 200 - (0.65 * 240 * level) / 100) * (1 * 1000) | ms}}</div>
                    <div v-if="level"><b>Mercenary:</b> {{(8 * 200 - (8 * 240 * level) / 100) * (1 * 1000) | ms}}</div>
                </div>
            </div>
        </div>
    
    </div>
</template>

<script>
import { buildings, utils } from 'drugwars';
import { getBalances } from '@/helpers/utils';
import { pickBy } from 'lodash';

export default {
  data() {
    return {
      building: pickBy(buildings, b => b.id === this.$route.query.name)[this.$route.query.name],
    };
  },
  computed: {
    base() {
      return this.$store.state.game.mainbase;
    },
    nextLevels() {
      const levels = [];
      let item = this.ownItem.lvl;
      if (!item) item = 1;
      levels.push(item);
      for (let index = item; index < item + 20; index++) {
        levels.push(index + 1);
      }
      return levels;
    },
    training_facility() {
      return (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'training_facility' &&
            b.base === this.$store.state.game.mainbase.base &&
            b.territory === this.$store.state.game.mainbase.territory,
        ) || {
          lvl: 0,
        }
      );
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
        this.drugsCost > this.balances.drugs ||
        this.weaponsCost > this.balances.weapons ||
        this.alcoholsCost > this.balances.alcohols
      );
    },
    ownItem() {
      if (this.base)
        return (
          this.$store.state.game.user.buildings.find(
            b =>
              b.building === this.building.id &&
              b.base === this.$store.state.game.mainbase.base &&
              b.territory === this.$store.state.game.mainbase.territory,
          ) || {
            lvl: 0,
          }
        );
      return { lvl: 0 };
    },
    ownHq() {
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
            b.base === this.$store.state.game.mainbase.base &&
            b.territory === this.$store.state.game.mainbase.territory,
        );
      }

      return (
        this.$store.state.game.user.buildings.find(b => b.building === 'headquarters') || { lvl: 0 }
      );
    },
  },
  methods: {
    drugsCost(lvl) {
      return utils.calculateCostToUpgrade(this.building.drugs_cost, lvl);
    },
    weaponsCost(lvl) {
      return utils.calculateCostToUpgrade(this.building.weapons_cost, lvl);
    },
    alcoholsCost(lvl) {
      return utils.calculateCostToUpgrade(this.building.alcohols_cost, lvl);
    },
  },
};
</script>
