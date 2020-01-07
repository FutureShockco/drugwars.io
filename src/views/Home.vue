<template>
  <div>
    <UiCenter class="vue-ui-modal p-4 home">
      <Icon name="logo" class="logo-large mt-4 mb-3" />
      <div class="columns rel">
        <div class="column det col-4">
          <h5>Build your own virtual empire</h5>
          <img width="100%" class="rounded-2" :src="`//img.drugwars.io/home/home1.jpg`" />
        </div>
        <div class="column det col-4">
          <h5>Collect exclusive cards</h5>
          <img width="100%" class="rounded-2" :src="`//img.drugwars.io/home/home2.jpg`" />
        </div>
        <div class="column det col-4">
          <h5>Fight with your opponents</h5>
          <img width="100%" class="rounded-2" :src="`//img.drugwars.io/home/home3.jpg`" />
        </div>
      </div>
      <h4 class="ui white header">{{ 'message.login_message' | translate}}</h4>
      <div class="d-inline-grid">
        <div class="ui blue header big">CURRENT SERVER {{server_num}} : {{server}} </div>
        <div
          class="button button-green button-large mt-2 mb-4"
          @click="socialLogin"
        >{{ 'message.login' | translate}}</div>
      </div>
      <div class="mb-1">Powered by</div>
      <Icon name="steem-logo" size="32" class="mr-1" />
      <Icon name="dwd" size="32" class="mr-1" />

      <img src="https://s3.amazonaws.com/steem-engine/images/steem_engine_logo_32.png" />
    </UiCenter>
  </div>
</template>

<script>
import sc from '@/helpers/steemconnect';

export default {
  data() {
    return {
      loginURL: sc.getLoginURL(),
      isAuthenticated: false,
      profile: {},
      server_num:process.env.VUE_APP_SERVER,
      server : process.env.VUE_APP_SERVER_NAME
    };
  },
  created() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('auth');
    localStorage.removeItem('loggedIn');
  },
  methods: {
    socialLogin() {
      this.$auth.login();
    },
    logout() {
      this.$auth.logOut();
      this.$router.push({ path: '/' });
    },
    handleLoginEvent(data) {
      this.isAuthenticated = data.loggedIn;
      this.profile = data.profile;
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  margin-top: -15px;
}

.home {
  p {
    font-size: 24px;
  }
  // background-image: url('//img.drugwars.io/home/homecards.png')!important;
  // background-size: contain!important;
  // background-repeat: no-repeat!important;
  // background-position-y: 40px!important;
}

.bottomt {
  text-shadow: 0px 0px 5px black, 0px 0px 5px black, 3px 3px 5px black, -3px -3px 5px black;
}

.rounded-2 {
  border: 1px solid #eca301;
}

.white {
  color: white !important;
}

.rel {
  position: relative;
  // margin-top: 22%!important;
}

h4 {
  color: #fbbd08;
  font-size: 20px;
  text-shadow: 0px 0px 5px black, 0px 0px 5px black, 0px 0px 5px black, 0px 0px 5px black,
    3px 3px 5px black, -3px -3px 5px black;
  font-family: 'Bebas Neue', Helvetica, Arial, sans-serif;
}

h5 {
  color: #000000;
  font-size: 18px;
  top: 5px;
  text-shadow: 0px 0px 5px #fbbd08, 0px 0px 5px #fbbd08, 0px 0px 5px #fbbd08, 0px 0px 5px #fbbd08,
    3px 3px 5px #fbbd08, -3px -3px 5px #fbbd08;
  font-family: 'Bebas Neue', Helvetica, Arial, sans-serif;
  font-weight: 900;
  position: absolute;
  text-align: center;
  text-rendering: optimizeLegibility;
  text-transform: uppercase;
  overflow-wrap: break-word;
  white-space: pre-line;
  max-width: 27%;
}

.vue-ui-modal {
  position: initial;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10%;
  max-width: 600px;
  background: rgb(0, 0, 0);
  border-radius: 6px;
  border: 1px solid #fbbd08;
}
</style>
