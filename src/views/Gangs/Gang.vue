<template>
  <div>
    <GangsTabs />
    <div class="p-4">
      <Loading v-if="isInit" />
      <div v-else>
        <h1>{{ gang.name || gang.gang }}</h1>
        <p>{{ gang.ticker }}</p>
        <div v-if="applies">
          <h3>Pending approval</h3>
          <div class="mb-4">
            <div
              :key="apply.username"
              v-for="apply in applies"
              class="py-3 border-bottom"
            >
              <Avatar :username="apply.username" size="40" class="mr-2" />
              {{ apply.username }} soldier {{ apply.message }}
              <button
                @click="handleApprove(apply.username)"
                class="button button-green float-right"
                :disabled="isLoading"
              >
                <span v-if="!isLoading">
                  Approve
                </span>
                <Loading v-else />
              </button>
            </div>
          </div>
        </div>
        <div>
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
        </div>
        <form class="form" @submit.prevent="handleSubmit">
          <h3>Apply as soldier</h3>
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
              Apply
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
      user: this.$store.state.game.user.user,
      applies: null,
    };
  },
  created() {
    this.isInit = true;
    const promises = [
      client.requestAsync('get_gang', this.id),
      client.requestAsync('get_gang_members', this.id),
    ];
    if (['boss', 'capo'].includes(this.user.role)) {
      promises.push(client.requestAsync('get_gang_applies', this.id));
    }
    Promise.all(promises).then(result => {
      [[this.gang], this.members, this.applies] = result;
      this.isInit = false;
    });
  },
  methods: {
    ...mapActions(['gangSoldierApply', 'gangApproveSoldier', 'notify']),
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
    handleApprove(soldier) {
      this.isLoading = true;

      const payload = {
        gang: this.id,
        soldier,
      };

      this.gangApproveSoldier(payload)
        .then(() => {
          this.isLoading = false;
          this.notify({
            type: 'success',
            message: `The soldier ${soldier} joined your gang`,
          });
        })
        .catch(e => {
          console.error('Failed to approve soldier', e);
          this.isLoading = false;
        });
    },
  },
};
</script>
