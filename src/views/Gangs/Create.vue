<template>
  <div>
    <GangsTabs />
    <div class="p-4 text-center">
      <h2>Create your gang</h2>
      <Cost
        class="mx-auto"
        :drugsCost="gangCreationFee.drugs"
        :weaponsCost="gangCreationFee.weapons"
        :alcoholsCost="gangCreationFee.alcohols"
        :quantity="1"
      />
      <form v-if="hasEnough" class="form container-xxs" @submit.prevent="handleSubmit">
          <p>Id</p>
          <input
            class="input input-primary mb-2"
            v-model="gang"
            maxlength="16"
            placeholder="The id of your gang, example: 'frenchconnection'"
            v-lowercase
          />
          <p>Tag</p>
          <input
            class="input input-primary mb-4"
            v-model="ticker"
            maxlength="6"
            placeholder="The ticker of you gang, example: 'FRCON'"
            v-uppercase
          />
          <button
            class="button input-block button-large button-green mb-2"
            type="submit"
            :disabled="isLoading"
          >
            <Loading v-if="isLoading"/>
            <span v-else>Create</span>
          </button>
      </form>
      <p v-else>You need more resources to create your gang.</p>
    </div>
  </div>
</template>

<script>
import Promise from 'bluebird';
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
    balances() {
      let ocLvl = 0;
      if (this.$store.state.game.user.buildings.find(b => b.building === 'operation_center'))
        ocLvl = this.$store.state.game.user.buildings.find(b => b.building === 'operation_center')
          .lvl;
      return getBalances(this.$store.state.game.user.user, ocLvl, this.$store.state.ui.timestamp);
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
        gang: this.gang,
        ticker: this.ticker,
      };

      this.send({ type: 'gang-create', payload })
        .then(() => {
          Promise.delay(6000).then(() => {
            this.$router.push('/gangs');
            this.notify({
              type: 'success',
              message: 'Your gang is being created',
            });
          });
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
