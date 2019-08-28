<template>
    <div>
        <GangsTabs />
        <div class="p-4 text-center anim-fade-in">
            <h2>Create your gang</h2>
            <Cost class="mx-auto" :drugsCost="gangCreationFee.drugs" :weaponsCost="gangCreationFee.weapons" :alcoholsCost="gangCreationFee.alcohols" :quantity="1" />
            <form v-if="hasEnough" class="form container-xxs" @submit.prevent="handleSubmit">
                <p>Id</p>
                <input class="input input-primary mb-2" v-model="gang" maxlength="16" placeholder="The id of your gang, example: 'frenchconnection'" v-lowercase />
                <p>Tag</p>
                <input class="input input-primary mb-4" v-model="ticker" maxlength="6" placeholder="The ticker of you gang, example: 'FRCON'" v-uppercase />
                <button class="button input-block button-large button-green mb-2" type="submit" :disabled="isLoading">
                        <SmallLoading v-if="isLoading"/>
                        <span v-else>Create</span>
                      </button>
            </form>
            <p v-else>You need more resources to create your gang.</p>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { getBalances } from '@/helpers/utils';

const GANG_CREATION_FEE = {
  drugs: 250000,
  weapons: 250000,
  alcohols: 250000,
};

export default {
  data() {
    return {
      isLoading: false,
      gang: null,
      ticker: null,
      gangCreationFee: GANG_CREATION_FEE,
    };
  },
  computed: {
    user() {
      return this.$store.state.game.user.user;
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
    hasEnough() {
      return (
        this.balances.drugs > this.gangCreationFee.drugs &&
        this.balances.weapons > this.gangCreationFee.weapons &&
        this.balances.alcohols > this.gangCreationFee.alcohols
      );
    },
  },
  methods: {
    ...mapActions(['send', 'notify']),
    handleSubmit() {
      this.isLoading = true;

      const payload = {
        gang: this.gang.trim().toLowerCase(),
        ticker: this.ticker.toUpperCase(),
        type: 'gang-create',
        territory: Number(this.base.territory),
        base: Number(this.base.base),
      };

      this.send(payload)
        .then(() => {
          this.$router.push('/gangs');
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to create gang' });
          console.error('Failed to create gang', e);
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped lang="less">
</style>
