<template>
    <div>
        <SettingsTabs/>
        <div class="p-4 text-center anim-fade-in">
            <h2>DELETE YOUR ACCOUNT</h2>
            <h5>Be carefull, this action is irreversible, DrugWars can not recover your account, your tokens and/or your wallets if you decide to delete your account.</h5>
            <form class="form container-xxs" @submit.prevent="handleSubmit">
                <p>Write or copy paste your username : {{user.username}}</p>
                <input class="input input-primary mb-2" v-model="nickname" maxlength="32" :placeholder="user.username" v-lowercase />
                <button class="button input-block button-large button-red mb-2" type="submit" :disabled="isLoading || user.username !== nickname">   
                            <SmallLoading v-if="isLoading"/>    
                            <span v-else>Delete</span>   
                          </button>
            </form>
                        <h2>CHANGE YOUR STEEM ACCOUNT</h2>
            <h5>Be carefull, this action is irreversible, DrugWars can not recover your new account, your tokens and/or your wallets if you decide to change your Steem account by misstake. </h5>
            <form class="form container-xxs" @submit.prevent="handleSubmit">
                <p>Write the new Steem username :</p>
                <input class="input input-primary mb-2" v-model="newaccountname" maxlength="32" :placeholder="user.username" v-lowercase />
                <p>Write or copy paste your actual username : {{user.username}}</p>
                 <input class="input input-primary mb-2" v-model="confirmnickname" maxlength="32" :placeholder="user.username" v-lowercase />
                <button class="button input-block button-large button-red mb-2" @click="handleAccountTransfer" :disabled="isLoading || confirmnickname !== user.username || newaccountname.length < 3"   >
                            <SmallLoading v-if="isLoading"/>    
                            <span v-else>Change</span>   
                          </button>
            </form>
            Reminder: All tokens on Steem Engine will stay on your old account.
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
      newaccountname: null,
      confirmnickname: null,
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
    handleAccountTransfer() {
      this.isLoading = true;
      if (
        this.confirmnickname === this.user.username &&
        this.newaccountname !== this.user.username
      ) {
        const payload = {
          type: 'transfer-account',
          newusername: this.newaccountname,
        };
        this.send(payload)
          .then(() => {
            this.isLoading = false;
            this.$auth.logOut();
            this.$router.push({ path: '/' });
          })
          .catch(e => {
            this.notify({ type: 'error', message: 'Failed to transfer account' });
            console.error('Failed to transfer account', e);
            this.isLoading = false;
          });
      }
    },
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
