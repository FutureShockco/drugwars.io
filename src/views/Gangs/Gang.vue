<template>
  <div>
    <GangsTabs />
    <div class="p-4">
      <Loading v-if="isInit" />
      <div v-else>
        <h1>{{ gang.name || gang.gang }}</h1>
        <p>{{ gang.ticker }}</p>
        <h3>Members</h3>
        <div class="mb-4">
          <div
            :key="member.username"
            v-for="member in members"
            class="py-3 border-bottom"
          >
            <Avatar :username="member.username" size="40" class="mr-2" />
            {{ member.username }} {{ member.role }}
          </div>
        </div>
        <form class="form" @submit.prevent="handleSubmit">
          <textarea
            type="text"
            class="input input-block text-left mb-2"
            placeholder="Message to the boss and capos (optional)"
            v-model="message"
            maxlength="280"
          ></textarea>
          <button
            type="submit"
            class="button button-green btn-block mb-2"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">
              Apply as soldier
            </span>
            <Loading v-else />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Promise from 'bluebird';
import client from '@/helpers/client';

export default {
  data() {
    return {
      id: this.$route.params.id,
      isInit: false,
      isLoading: false,
      gang: null,
      members: null,
      message: null,
    };
  },
  created() {
    this.isInit = true;
    Promise.all([
      client.requestAsync('get_gang', this.id),
      client.requestAsync('get_gang_members', this.id),
    ]).then(result => {
      [[this.gang], this.members] = result;
      this.isInit = false;
    });
  },
  methods: {
    ...mapActions(['gangSoldierApply', 'notify']),
    resetForm() {
      this.message = null;
    },
    handleSubmit() {
      this.isLoading = true;

      const payload = { gang: this.id };
      if (this.message) payload.message = this.message;

      this.gangSoldierApply(payload)
        .then(() => {
          this.isLoading = false;
          this.notify({
            type: 'success',
            message: 'Your candidature has been successfully sent',
          });
          this.resetForm();
        })
        .catch(e => {
          console.error('Failed to apply as soldier', e);
          this.isLoading = false;
        });
    },
  },
};
</script>
