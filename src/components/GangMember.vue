<template>
    <div>
        <router-link :to="`/actions?target=${member.nickname}`">
            <GangImage :image="member.picture" size="40" class="mr-2" /> {{ member.nickname }} {{ member.role }}
        </router-link>
        <button @click="handleKick(member.nickname)" class="button button-red float-right" :disabled="isLoading || member.nickname === user.nickname && isBoss" v-if="isBoss">
    			<span v-if="!isLoading">Kick {{member.role}}</span>
    			<SmallLoading v-else/>
    		</button>
        <button @click="handleSetBoss(member.nickname)" class="button button-green float-right mr-2" :disabled="isLoadingCapo " v-if="member.role === 'capo' && isBoss">
    			<span v-if="!isLoadingCapo">Give boss role</span>
    			<SmallLoading v-else/>
    		</button>
        <button @click="handleAddCapo(member.nickname)" class="button button-green float-right mr-2" :disabled="isLoadingCapo " v-if="member.role === 'soldier' && isBoss">
    			<span v-if="!isLoadingCapo">Promote to capo</span>
    			<SmallLoading v-else/>
    		</button>
        <button @click="handleLeave()" class="button button-red float-right mr-2" :disabled="isLoading || isBoss" v-if="member.nickname === user.nickname && !isBoss">
    			<span v-if="!isLoading">Leave gang</span>
    			<SmallLoading v-else/>
    		</button>
        <router-link :to="`/actions?type=transport&nickname=${member.nickname}`">
            <button class="button button-blue float-right mr-2" :disabled="isLoading" v-if="member.nickname !== user.nickname">
    			<span v-if="!isLoading">Transport</span>
    			<SmallLoading v-else/>
    		</button>
        </router-link>
    </div>
</template>


<script>
import { mapActions } from 'vuex';

export default {
  props: ['member', 'id'],
  data() {
    return {
      isLoading: false,
      isLoadingCapo: false,
      gang: null,
      user: this.$store.state.game.user.user,
    };
  },
  computed: {
    isBoss() {
      return this.user.role === 'boss' && this.user.gang === this.id;
    },
  },
  methods: {
    ...mapActions(['send', 'notify']),
    resetForm() {
      this.message = null;
    },
    handleKick(soldier) {
      this.isLoading = true;

      const payload = {
        gang: this.id,
        soldier,
        type: 'gang-kick-soldier',
      };
      this.send(payload)
        .then(() => {
          this.isLoading = false;
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to kick member' });
          console.error('Failed to kick member', e);
          this.isLoading = false;
        });
    },
    handleAddCapo(capo) {
      this.isLoadingCapo = true;
      const payload = {
        gang: this.id,
        capo,
        type: 'gang-add-capo',
      };

      this.send(payload)
        .then(() => {
          this.isLoadingCapo = false;
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to add capo' });
          console.error('Failed to add capo', e);
          this.isLoadingCapo = false;
        });
    },
    handleSetBoss(capo) {
      this.isLoadingCapo = true;
      const payload = {
        gang: this.id,
        capo,
        type: 'gang-set-boss',
      };

      this.send(payload)
        .then(() => {
          this.isLoadingCapo = false;
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to add capo' });
          console.error('Failed to add capo', e);
          this.isLoadingCapo = false;
        });
    },
    handleLeave() {
      this.isLoading = true;
      const payload = {
        gang: this.id,
        username: this.user.username,
        type: 'gang-leave',
      };
      this.send(payload)
        .then(() => {
          this.isLoading = false;
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to leave gang' });
          console.error('Failed to leave gang', e);
          this.isLoading = false;
        });
    },
  },
};
</script>
