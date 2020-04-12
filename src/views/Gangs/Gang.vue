<template>
  <div>
    <GangsTabs />
    <div class="p-4 text-center anim-fade-in">
      <Loading v-if="isInit" />
      <div v-else>
        <h1 class="mb-4">
          <GangImage class="mr-3" size="120" v-if="gang && gang.image" :image="gang.image" />
          <div v-if="gang & gang.name">{{ gang.name || gang.gang }}</div>
          <span>[{{ gang.ticker }}]</span>
        </h1>

        <p v-if="gang.website" class="mb-2">
          <a :href="gang.website" target="_blank">{{ gang.website | parseUrl }}</a>
        </p>
        <p v-if="gang.about" class="mb-4">{{ gang.about }}</p>
        <router-link
          v-if="isBoss"
          :to="`/gangs/gang/${gang.gang}/settings`"
          class="button button-blue d-inline-block mb-4"
        >Settings</router-link>
        <div
          v-if="user.gang === id && ['boss', 'capo'].includes(user.role) && applies && applies.length > 0"
        >
          <h3>Pending approval</h3>
          <div class="mb-4">
            <div
              :key="apply.username"
              v-for="apply in applies"
              class="py-3 border-bottom text-left"
            >
              <Avatar :username="apply.username" size="40" class="mr-2" />
              {{ apply.username }} soldier
              <button
                @click="handleReject(apply.username)"
                class="button button-red float-right"
                :disabled="isLoading"
                v-if="['boss', 'capo'].includes(user.role)"
              >
                <span v-if="!isLoading">Reject</span>
                <SmallLoading v-else />
              </button>
              <button
                @click="handleApprove(apply.username)"
                class="button button-green float-right mr-2"
                :disabled="isLoading"
              >
                <span v-if="!isLoading">Approve</span>
                <SmallLoading v-else />
              </button>
              <div class="p-2">{{ apply.message }}</div>
            </div>
          </div>
        </div>
        <div>
          <form
            class="form text-center"
            @submit.prevent="handleSubmit"
            v-if="user.gang !== id && gang.is_stable === 1"
          >
            <h3>Apply as soldier</h3>
            <textarea
              type="text"
              class="input input-block mb-2"
              placeholder="Message to the boss and capos (optional). They will know your real identity."
              v-model="message"
              maxlength="280"
            ></textarea>
            <button type="submit" class="button button-green btn-block mb-2" :disabled="isLoading">
              <span v-if="!isLoading">Apply</span>
              <SmallLoading v-else />
            </button>
          </form>
          <h3>Members</h3>

          <div v-if="isBoss || isCapo">
            <strong>Active:</strong>
            <span>
              Today
              <i :class="'iconfont icon-check text-green'"></i>
            </span>
            <span>
              This month
              <i :class="'iconfont icon-check text-orange'"></i>
            </span>
            <span>
              Unactive
              <i :class="'iconfont icon-check text-red'"></i>
            </span>
          </div>

          <div class="mb-4">
            <GangMember
              :key="member.nickname"
              v-for="member in members"
              :member="member"
              :id="id"
              class="py-3 border-bottom text-left"
            />
          </div>
        </div>
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
  computed: {
    isBoss() {
      return this.user.role === 'boss' && this.user.gang === this.id;
    },
    isCapo() {
      return this.user.role === 'capo' && this.user.gang === this.id;
    },
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
    ...mapActions(['send', 'notify']),
    resetForm() {
      this.message = null;
    },
    handleSubmit() {
      const self = this;
      this.isLoading = true;
      const payload = { gang: this.id, type: 'gang-soldier-apply' };
      if (this.message) payload.message = this.message;
      this.send(payload)
        .then(() => {
          self.isLoading = false;
          this.resetForm();
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to apply as soldier' });
          console.error('Failed to apply as soldier', e);
          this.isLoading = false;
        });
    },
    handleApprove(soldier) {
      const self = this;
      this.isLoading = true;
      const payload = {
        gang: this.id,
        soldier,
        type: 'gang-approve-soldier',
      };

      this.send(payload)
        .then(() => {
          setTimeout(() => {
            const promises = [
              client.requestAsync('get_gang', self.id),
              client.requestAsync('get_gang_members', self.id),
            ];
            if (['boss', 'capo'].includes(self.user.role)) {
              promises.push(client.requestAsync('get_gang_applies', self.id));
            }
            Promise.all(promises).then(result => {
              [[self.gang], self.members, self.applies] = result;
              self.isLoading = false;
            });
          }, 3000);
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to approve soldier' });
          console.error('Failed to approve soldier', e);
          this.isLoading = false;
        });
    },
    handleReject(soldier) {
      const self = this;

      this.isLoading = true;

      const payload = {
        gang: this.id,
        soldier,
        type: 'gang-reject-soldier',
      };

      this.send(payload)
        .then(() => {
          setTimeout(() => {
            const promises = [
              client.requestAsync('get_gang', self.id),
              client.requestAsync('get_gang_members', self.id),
            ];
            if (['boss', 'capo'].includes(self.user.role)) {
              promises.push(client.requestAsync('get_gang_applies', self.id));
            }
            Promise.all(promises).then(result => {
              [[self.gang], self.members, self.applies] = result;
              self.isLoading = false;
            });
          }, 3000);
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to reject candidate' });
          console.error('Failed to reject candidate', e);
          this.isLoading = false;
        });
    },
  },
};
</script>
