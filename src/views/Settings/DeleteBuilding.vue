<template>
    <div>
        <SettingsTabs/>
        <div class="p-4 text-center anim-fade-in">
            <h2>DELETE YOUR BUILDING</h2>
            <h5>Be carefull, you can not delete your primary building and nobody can recover a deleted building.</h5>
            <form class="form container-xxs" @submit.prevent="handleSubmit">
                <p>Write or copy paste your username : {{user.username}}</p>
                <input class="input input-primary mb-2" v-model="nickname" maxlength="32" :placeholder="user.username" v-lowercase />
                <button class="button input-block button-large button-red mb-2" type="submit" :disabled="isLoading || user.username !== nickname">   
                            <SmallLoading v-if="isLoading"/>    
                            <span v-else>Delete</span>   
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
      nickname: null,
      picture: null,
      alerts: [
        {
          id: 'alert',
          name: 'Attack',
          isActive: localStorage.getItem('attack_alert') || false,
        },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.state.game.user.user;
    },
    lastUpdate() {
      return new Date(
        Date.parse(this.$store.state.game.user.user.last_profile_update),
      ).toLocaleString();
    },
  },
  methods: {
    ...mapActions(['send', 'notify']),
    handleSubmit() {
      this.isLoading = true;
      if (this.nickname === this.user.username) {
        const payload = {
          type: 'delete-profile',
        };
        this.send(payload)
          .then(() => {
            this.isLoading = false;
            this.$auth.logOut();
            this.$router.push({ path: '/' });
          })
          .catch(e => {
            this.notify({ type: 'error', message: 'Failed to delete profile' });
            console.error('Failed to delete profile', e);
            this.isLoading = false;
          });
      }
    },
  },
};
</script>

<style scoped lang="less">
</style>
