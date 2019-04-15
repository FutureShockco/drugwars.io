<template>
    <div>
        <SettingsTabs/>
        <div class="p-4 text-center">
            <h2>Change your settings</h2>
            <h5>Be carefull, you can not change your nickname more than one time per month</h5>
            <form class="form container-xxs" @submit.prevent="handleSubmit">
                <p>Nickname</p>
                <input class="input input-primary mb-2" v-model="nickname" maxlength="32" :placeholder="user.nickname" v-lowercase />
                <p>Profile picture</p>
                <input class="input input-primary mb-4" v-model="picture" type="url" :placeholder="user.picture" v-lowercase />
                <button class="button input-block button-large button-green mb-2" type="submit" :disabled="isLoading">   
                        <Loading v-if="isLoading"/>    
                        <span v-else>Edit</span>   
                      </button>
                <p>Can't edit nickname before : {{lastUpdate}}</p>    
            </form>    
        </div>   
    </div>
</template>

<script>
import Promise from 'bluebird';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      isLoading: false,
      nickname: null,
      picture: null,
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
      let nick = '';
      if (this.nickname) nick = this.nickname.trim().toLowerCase();
      else nick = '';
      if (!this.picture) this.picture = this.user.picture;
      const payload = {
        nickname: nick,
        picture: this.picture.trim().toLowerCase(),
      };
      this.send({ type: 'edit-profile', payload })
        .then(() => {
          Promise.delay(6000).then(() => {
            this.notify({
              type: 'success',
              message: 'You have edited your profile',
            });
            this.isLoading = false;
          });
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to edit profile' });
          console.error('Failed to edit profile', e);
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped lang="less">
</style>
