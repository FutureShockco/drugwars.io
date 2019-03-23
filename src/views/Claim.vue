<template>
  <div>
    <Header title="Claim token" />
    <div class="p-4 text-center">
      <div v-if="user.future > 0">
        <p class="mb-4">You are eligible to claim <b>{{ user.future }} FUTURE</b> tokens.</p>
        <form class="form mx-auto" @submit.prevent="handleSubmit">
          <input
            class="input input-primary mb-2"
            v-model="amount"
            :disabled="isLoading"
            maxlength="10"
            placeholder="Amount to claim ei. 1000"
          />
          <button :disabled="isLoading" type="submit" class="button input-block button-large button-green">
            <span v-if="!isLoading">
              Claim
            </span>
            <Loading v-else />
          </button>
        </form>
      </div>
      <div v-else>
        <p class="mb-4">You don't have any token to claim.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import client from '@/helpers/client';

export default {
  data() {
    return {
      isLoading: false,
      amount: 0,
    };
  },
  computed: {
    user() {
      return this.$store.state.game.user.user;
    },
  },
  methods: {
    ...mapActions(['init', 'notify']),
    resetForm() {
      this.amount = 0;
    },
    handleSubmit() {
      this.isLoading = true;
      const payload = { FUTURE: parseInt(this.amount, 10) };
      client.request('claim_reward', payload, (err, result) => {
        if (err) {
          this.notify({ type: 'error', message: err });
          console.error('Failed to claim reward', err);
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.notify({
            type: 'success',
            message: `You successfully claimed ${this.amount} FUTURE tokens`,
          });
          console.log('Claim success, the unit id is', result);
          this.resetForm();
          this.init();
        }
      });
    },
  },
};
</script>
