<template>
  <div>
    <div class="d-flex flex-lg-row text-center text-lg-left item">
      <div class="mr-3">
        <img class="preview" :src="`//img.drugwars.io/buildings/${building.id}.jpg`" />
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
        <Cost
          :drugsCost="drugsCost(level)"
          :weaponsCost="weaponsCost(level)"
          :alcoholsCost="alcoholsCost(level)"
          :quantity="1"
        />
        <div v-if="building.production_type" class="mb-2">
          <BuildingProduction
            :compactview="1"
            :production_type="building.production_type"
            :level="level"
            :coeff="building.coeff"
            :production_rate="building.production_rate"
          />
        </div>
        <div
          v-if="['drug_storage', 'weapon_storage', 'alcohol_storage'].includes(building.id)"
          class="mb-2"
        >
          <div v-if="level">
            <b>Storage:</b>
            {{ 10000+ (18000 * level * (Math.sqrt(level) / 100)) * level | amount }}
          </div>
          <div v-if="level">
            <b>Safe:</b>
            {{ ( 10000+(18000 * level * (Math.sqrt(level)) / 100) * level ) /100*20 | amount }}
          </div>
          <div v-else>
            <b>Safe:</b>
            {{ 10000 /100*25 | amount }}
          </div>
        </div>
        <div v-if="['headquarters'].includes(building.id)" class="mb-2">
          <div class="columns">
            <div class="column col-1">
              <div v-if="level">
                <b>Lvl 10</b>
              </div>
              <div v-if="level">
                <b>Lvl 20</b>
              </div>
              <div v-if="level">
                <b>Lvl 50</b>
              </div>
              <div v-if="level">
                <b>Lvl 100</b>
              </div>
            </div>
            <div class="column col-1">
              Building
              Timer
            </div>
            <div class="column col-2">
              <div v-if="level">
                <b>Training Fac.</b>
                {{updateTime('training_facility',level,10) | ms}}
              </div>
              <div v-if="level">
                <b>Training Fac.</b>
                {{updateTime('training_facility',level,20) | ms}}
              </div>
              <div v-if="level">
                <b>Training Fac.</b>
                {{updateTime('training_facility',level,50) | ms}}
              </div>
              <div v-if="level">
                <b>Training Fac.</b>
                {{updateTime('training_facility',level,100) | ms}}
              </div>
            </div>
            <div class="column col-2">
              <div v-if="level">
                <b>Crack House</b>
                {{updateTime('crackhouse',level,10) | ms}}
              </div>
              <div v-if="level">
                <b>Crack House</b>
                {{updateTime('crackhouse',level,20) | ms}}
              </div>
              <div v-if="level">
                <b>Crack House</b>
                {{updateTime('crackhouse',level,50) | ms}}
              </div>
              <div v-if="level">
                <b>Crack House</b>
                {{updateTime('crackhouse',level,100) | ms}}
              </div>
            </div>
            <div class="column col-2">
              <div v-if="level">
                <b>Pharma. Lab</b>
                {{updateTime('pharma_lab',level,10) | ms}}
              </div>
              <div v-if="level">
                <b>Pharma. Lab</b>
                {{updateTime('pharma_lab',level,20) | ms}}
              </div>
              <div v-if="level">
                <b>Pharma. Lab</b>
                {{updateTime('pharma_lab',level,50) | ms}}
              </div>
              <div v-if="level">
                <b>Pharma. Lab</b>
                {{updateTime('pharma_lab',level,100) | ms}}
              </div>
            </div>
            <div class="column col-2">
              <div v-if="level">
                <b>Research C.</b>
                {{updateTime('research_center',level,10) | ms}}
              </div>
              <div v-if="level">
                <b>Research C.</b>
                {{updateTime('research_center',level,20) | ms}}
              </div>
              <div v-if="level">
                <b>Research C.</b>
                {{updateTime('research_center',level,50) | ms}}
              </div>
              <div v-if="level">
                <b>Research C.</b>
                {{updateTime('research_center',level,100) | ms}}
              </div>
            </div>
            <div class="column col-2">
              <div v-if="level">
                <b>Drug Storage</b>
                {{updateTime('drug_storage',level,10) | ms}}
              </div>
              <div v-if="level">
                <b>Drug Storage</b>
                {{updateTime('drug_storage',level,20) | ms}}
              </div>
              <div v-if="level">
                <b>Drug Storage</b>
                {{updateTime('drug_storage',level,50) | ms}}
              </div>
              <div v-if="level">
                <b>Drug Storage</b>
                {{updateTime('drug_storage',level,100) | ms}}
              </div>
            </div>
          </div>
        </div>
        <div v-if="['training_facility'].includes(building.id)" class="mb-2">
          <div v-if="level">
            <b>Super Bouncer:</b>
            {{(0.84 * 1500/ (level)) * ( 1000) | ms}}
          </div>
          <div v-if="level">
            <b>Big Mama:</b>
            {{(4.72 * 1500/ level ) * (1000) | ms}}
          </div>
          <div v-if="level">
            <b>Spy :</b>
            {{(0.65 * 1500/ level ) * (1000) | ms}}
          </div>
          <div v-if="level">
            <b>Mercenary:</b>
            {{(8 * 1500/ level)* (1000) | ms}}
          </div>
        </div>

        <div v-if="['strategic_center'].includes(building.id)" class="mb-2">
          <div v-if="level">
            <b>Solo Job1:</b>
              {{new Date((((1*10) * 620000)) - (level *30000*1)) | ms }}
          </div>
          <div v-if="level">
            <b>Solo Job5:</b>
               {{new Date((((5*10) * 620000)) - (level *30000*5)) | ms }}
          </div>
          <div v-if="level">
            <b>Solo Job10:</b>
              {{new Date((((10*10) * 620000)) - (level *30000*10)) | ms }}
          </div>
        </div>
        <div v-if="['operation_center'].includes(building.id)" class="mb-2">
          <div v-if="level">
            <b>Drug Bonus</b>
            +{{drugBonus(level) ||amount}} per day
          </div>
          <div v-if="level">
            <b>Weapon Bonus</b>
            +{{weaponBonus(level) ||amount}} per day
          </div>
          <div v-if="level">
            <b>Alcohol Bonus</b>
            +{{alcoholBonus(level) ||amount}} per day
          </div>
        </div>
        <div v-if="['research_center'].includes(building.id)" class="mb-2">
          <div v-if="level">
            <b>Routing</b>
            {{updateTimeTrainings('routing',level,10) | ms}}
          </div>
          <div v-if="level">
            <b>Close Combat</b>
            {{updateTimeTrainings('closecombat',level,20) | ms}}
          </div>
          <div v-if="level">
            <b>FireArms</b>
            {{updateTimeTrainings('firearms',level,50) | ms}}
          </div>
          <div v-if="level">
            <b>Protection</b>
            {{updateTimeTrainings('protection',level,100) | ms}}
          </div>
          <div v-if="level">
            <b>Psychological Training</b>
            {{updateTimeTrainings('psychological',level,100) | ms}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { buildings, utils, trainings } from 'drugwars';
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
      for (let index = item; index < item + 20; index += 1) {
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
    updateTime(id, level, blevel) {
      return utils.calculateTimeToBuild(id, buildings[id].coeff, blevel, level);
    },
    updateTimeTrainings(id, level, blevel) {
      return utils.calculateTimeToBuild(id, trainings[id].coeff, blevel, level);
    },
    drugBonus(lvl) {
      const oc = lvl;
      const labLvl = 0;
      return parseFloat(this.HQ.drug_production_rate * 60 * 60 * 24 * oc * 0.005).toFixed(2);
    },
    weaponBonus(lvl) {
      const oc = lvl;
      return parseFloat(this.HQ.weapon_production_rate * 60 * 60 * 24 * oc * 0.005).toFixed(2);
    },
    alcoholBonus(lvl) {
      const oc = lvl;
      return parseFloat(this.HQ.alcohol_production_rate * 60 * 60 * 24 * oc * 0.005).toFixed(2);
    },
  },
};
</script>
