<template>
    <div>
        <SettingsTabs/>
        <div class="p-4 text-center anim-fade-in">
            <h2>Your Steem account settings</h2>
            <h4>Attention : don't share your keys with any other player. <strong>DrugWars does not take any responsibility</strong> for lost accounts/wallets.</h4>
            <form class="form container-xxs">
                <div class="text-green">Steem Username <div> (use to login to your account)</div></div>
                <input class="input input-primary mb-2" :value="steem_account.steem_account" />
                <div class="text-blue">Posting Key <div> (use to post contents, will be asked for most of Steem Apps)</div></div>
                <input id="posting" @mouseenter="showKey('posting')" @mouseleave="hideKey('posting')" type="password" class="input input-primary mb-2" :value="steem_account.posting_key" />
                <div class="text-red">Active Key <div>(use to transfer funds, be carefull at use and don't let anyone else obtain it)</div></div> 
                <input id="private" @mouseenter="showKey('private')" @mouseleave="hideKey('private')" type="password" class="input input-primary mb-2" :value="steem_account.active_key" />
            </form>
                        (Mouse over to show keys)
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      pkey: '',
    };
  },
  computed: {
    steem_account() {
      return this.$store.state.game.user.steem_account;
    },
  },
  methods: {
    showKey(key) {
      const input = document.getElementById(key);
      input.type = 'text';
      console.log(input);
    },
    hideKey(key) {
      const input = document.getElementById(key);
      input.type = 'password';
    },
  },
};
</script>

<style scoped lang="less">
</style>
