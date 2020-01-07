<template>
    <div>
        <BootcampTabs/>
        <div class="p-4 text-center anim-fade-in">
          <h2>SET RALLY POINT</h2>
           <h6>Define a rally point so all your fresh recruited units will automatically join this base.</h6>
           <h4>Current rally point <div class="text-yellow">{{ownBase.territory}} : {{ownBase.base}}</div></h4>

          <h5
            class="text-yellow ddrop mt-0 mb-0"
            @click="isOpen = !isOpen, active = !active"
            :class="{ active }"
          >
            CHOOSE FROM YOUR BASES
            <svg viewBox="0 0 451.847 451.847" width="12">
              <path
                d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
		c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
		c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"
                fill="#fff"
              />
            </svg>
          </h5>
        <div :class="{ isOpen }" class="dropdown">
          <button
            class="btn btn-yellow btn-sm rp mr-2"
            v-for="base in allbase"  @click="setRallyPointCoordinates(base.territory,base.base)"
            v-if=" base.building ==='headquarters' && (ownBase.territory+''+ownBase.base !== base.territory+''+base.base)"
            :key="(base.territory+''+base.base)"
          > 
            {{base.custom }}</button>
          </div>
            <form class="form container-xxs" @submit.prevent="handleSubmit">
             
                
              <h5>   {{ upgradeLabel }}</h5>

            <button
              :disabled="isLoading || waitingConfirmation || requireUpdate || notEnoughDWD || inProgress || !ownBase ||!target_base || !target_territory"
              class="button btn-block button-yellow mb-2">
            COMING SOON
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
      isOpen: false,
      active: false
    }
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
    allbase(){
      return this.$store.state.game.user.buildings || null;
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
        label = `You are settings your rally point from ${this.ownBase.territory}:${this.ownBase.base} to ${this.target_territory}:${this.target_base}`;
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
        this.$store.state.ui.timestamp
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
    setRallyPointCoordinates(territory,base)
    {
        this.target_territory = territory;
        this.target_base = base;
        this.isOpen = !this.isOpen;
    }
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


.dropdown {
 left: 50%;
 transform: translatey(-30%) rotatex(90deg) scale(0);
 margin-top: 0.55em;
 transform-origin: 0 0;
 border-radius: 0.35em;
 display: none;
 opacity: 0;
 transition: all 200ms linear;

 &.isOpen {
  transform: translatey(0%);
  display: block;
  opacity: 1;
 }
}

.rp {
 padding: 5px;
 background: black;
 color: #ffc508;
 z-index: 999999;
 text-transform: uppercase;
}

.rp:hover {
 background: #ffc508;
 color: black;
 font-weight: bold;
}
</style>
