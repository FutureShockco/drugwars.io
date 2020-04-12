<template>
    <div>
        <OverviewTabs/>
        <div class="p-4 text-center anim-fade-in">
          <h2>RENAME YOUR BASE</h2>
           <h4>Current name <div class="text-yellow">{{ownBase.custom}}</div></h4>
            <h5  v-if="ownBase.custom ==='primary'" class="text-red">You can not rename your primary base</h5>
            <form v-else class="form container-xxs" @submit.prevent="handleRename">
              <h6>New name </h6>
                <input class="input input-primary mb-2" v-model="base_name" type="text"/>
            <button
              :disabled="isLoading || waitingConfirmation || requireUpdate || inProgress || ownBase.custom ==='primary' ||!base_name"
              class="button btn-block button-green mb-2">
            Change name
            </button>
            </form>
            <h2>MOVE YOUR BASE TO ANOTHER SPOT</h2>
            <h5>Be carefull, everybody can recover your old location on the map. You will keep all your buildings and your units. You can not move if you have any fights which are still ongoing.</h5>
           <h4>Current coordinates <div class="text-yellow">{{ownBase.territory}} : {{ownBase.base}}</div></h4>
            <form class="form container-xxs" @submit.prevent="handleSubmit">
              <h6>Territory </h6>
                <input class="input input-primary mb-2" v-model="target_territory" type="number"/>
                    <h6>Location </h6>
                <input class="input input-primary mb-2" v-model="target_base" type="number"/>
              <h5>   {{ upgradeLabel }}</h5>
            <button
              :disabled="isLoading || waitingConfirmation || requireUpdate || notEnoughDWD || inProgress || !ownBase ||!target_base || !target_territory"
              class="button btn-block button-yellow mb-2">
            <img class="dwdicon" src="//img.drugwars.io/icons/dwd.png"/>
            <span v-if="dwdPrice"> ${{ dwdPrice | amount }} = </span>
              {{ price  }} DWD
            </button>
            </form>
            <h4 v-if="errorMessage" class="text-red">Please select a valid territory</h4>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { utils } from 'drugwars';
import { getBalances } from '@/helpers/utils';

export default {
  props: ['inProgress'],
  data() {
    return {
      isLoading: false,
      waitingConfirmation: false,
      target_territory: null,
      target_base: null,
      base_name: null,
      errorMessage: null,
    };
  },
  watch: {
    inProgress(val) {
      if (val) {
        this.waitingConfirmation = false;
      }
    },
  },
  computed: {
    ownBase() {
      return this.$store.state.game.mainbase;
    },
    updateTime() {
      return utils.calculateTimeToBuild(this.id, this.coeff, this.level, this.hqLevel);
    },
    price() {
      return 100;
    },

    dwdPrice() {
      const price = this.$store.state.game.prizeProps.seProps.lastPrice;
      return price * this.price * this.$store.state.game.prizeProps.steemprice;
    },
    notEnoughDWD() {
      return this.price > this.$store.state.game.user.user.dwd;
    },
    steemAccount() {
      if (this.$store.state.auth.account) return this.$store.state.auth.account;
      return false;
    },
    timeToWait() {
      const building = this.$store.state.game.user.buildings.find(
        b =>
          b.building === this.id &&
          b.territory === this.ownBase.territory &&
          b.base === this.ownBase.base,
      );
      if (building) {
        if (building.pending_update) {
          const nextUpdate = new Date(building.pending_update).getTime();
          const now = this.$store.state.ui.timestamp;
          const timeToWait = nextUpdate - now;
          return timeToWait > 0 ? timeToWait : 0;
        }

        const nextUpdate = new Date(building.next_update).getTime();
        const now = this.$store.state.ui.timestamp;
        const timeToWait = nextUpdate - now;
        return timeToWait > 0 ? timeToWait : 0;
      }
      return 0;
    },
    requireUpdate() {
      return this.level > this.hqLevel && this.id !== 'headquarters';
    },
    upgradeLabel() {
      let label = '';
      if (this.target_territory && this.target_base)
        label = `You are moving your base from ${this.ownBase.territory}:${this.ownBase.base} to ${
          this.target_territory
        }:${this.target_base}`;
      if (this.notEnough) label = 'Miss resources';
      if (this.inProgress) label = 'Upgrading';
      return label;
    },
    base() {
      return this.$store.state.game.mainbase;
    },
    HQ() {
      if (
        this.ownBase &&
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'headquarters' &&
            b.territory === this.ownBase.territory &&
            b.base === this.ownBase.base,
        )
      ) {
        return this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'headquarters' &&
            b.territory === this.ownBase.territory &&
            b.base === this.ownBase.base,
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
            b.territory === this.ownBase.territory &&
            b.base === this.ownBase.base,
        )
      )
        ocLvl = this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.ownBase.territory &&
            b.base === this.ownBase.base,
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
  },
  methods: {
    ...mapActions(['send', 'init']),
    handleSubmit() {
      const self = this;
      this.errorMessage = null;
      if (this.target_territory > 460) {
        this.errorMessage = `Please choose a name for your base`;
      }
      if (this.target_base > 225) {
        this.errorMessage = `Please choose a shorter name for your base`;
      }
      if (!this.errorMessage) {
        this.isLoading = true;
        const payload = {
          type: 'move-base',
          from_territory: Number(self.ownBase.territory),
          from_base: Number(self.ownBase.base),
          territory: Number(self.target_territory),
          base: Number(self.target_base),
        };
        this.send(payload)
          .then(() => {
            this.isLoading = false;
            this.init();
          })
          .catch(e => {
            this.notify({
              type: 'error',
              message:
                'Failed to move base please check that the location is empty and you dont have any fight going from or coming to your base',
            });
            console.error('Failed to move base', e);
            this.isLoading = false;
          });
      }
    },
    handleRename() {
      const self = this;
      this.errorMessage = null;
      if (this.base_name.length > 44) {
        this.errorMessage = `Please choose a name a shorter name for your base`;
      }
      if (!this.errorMessage) {
        this.isLoading = true;
        const payload = {
          type: 'rename-base',
          from_territory: Number(self.ownBase.territory),
          from_base: Number(self.ownBase.base),
          name: self.base_name,
        };
        this.send(payload)
          .then(() => {
            this.isLoading = false;
            this.init();
          })
          .catch(e => {
            this.notify({
              type: 'error',
              message: 'Failed to rename base please',
            });
            console.error('Failed to move base', e);
            this.isLoading = false;
          });
      }
    },
  },
};
</script>

<style scoped lang="less">
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
