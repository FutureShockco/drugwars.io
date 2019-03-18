<template>
  <div>
    <GangsTabs />
    <div class="p-4">
      <h2 class="text-center">Create your gang</h2>
      <form class="form container-xxs" @submit.prevent="handleSubmit">
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
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      isLoading: false,
      gang: null,
      ticker: null,
    };
  },
  methods: {
    ...mapActions(['gangCreate']),
    resetForm() {
      this.gang = null;
      this.ticker = null;
    },
    handleSubmit() {
      this.isLoading = true;

      const payload = {
        gang: this.gang,
        ticker: this.ticker,
      };

      this.gangCreate(payload)
        .then(() => {
          this.isLoading = false;
          this.resetForm();
        })
        .catch(e => {
          console.error('Failed to create gang', e);
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped lang="less">
</style>
