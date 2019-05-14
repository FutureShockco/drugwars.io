<template>
  <UiCenter class="vue-ui-modal pt-2 pb-4 home">
    <Icon name="logo" class="logo-large mt-4"/>
    <div class="title mb-2">
      <h4>GET PAID TO RULE YOUR WORLD</h4>
    </div>
    <div class="mb-2 columns">
       <div class="ui blue header big px-6">DrugWars is a free to play massively multiplayer strategy and simulation game based on Steem & Obyte blockchain where players can get rewarded with cryptocurrencies.</div>
      <div class="column col-4">
      <h5>Build your own empire</h5>
                  <img width="140px" class="rounded-2" :src="`/img/home/home1.jpg`">
      </div>
        <div class="column col-4">
        <h5>Collect exclusive cards</h5>
                          <img width="140px" class="rounded-2" :src="`/img/home/home2.jpg`">

      </div>
      <div class="column col-4">
        <h5>Fight with your opponents</h5>
                          <img width="140px" class="rounded-2" :src="`/img/home/home3.jpg`">

      </div>
    </div>

    <div class="d-inline-grid">
             <div class="ui blue header big">Join the early access now for Free. </div>

    <div class="button button-green button-large mb-4" @click="socialLogin">
      Social Login
    </div>
    <div class="button button-green button-large mb-4" @click="login">
      Steem Login
    </div>

    </div>
    <div class="mb-4">
      Want to buy a steem account to obtain more advantage?
      <a href="https://account.steem.ninja/?ref=drugwars">
        Click here
      </a>
    </div>
  </UiCenter>
</template>

<script>
import sc from '@/helpers/steemconnect';
import request from "request";

export default {
  data() {
    return {
      loginURL: sc.getLoginURL(),
      isAuthenticated: false,
      profile: {},
    };
  },
  created(){
    localStorage.removeItem('social_access_token');
    localStorage.removeItem('drugwars_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('auth');
    localStorage.removeItem('loggedIn');
  },
  methods: {
    login() {
      sc.login({}, (err, token) => {
        localStorage.setItem('drugwars_token', token);
        window.location = '/';
      });
    },
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

.title{
  margin-top: -15px;
}

.home {
  p {
    font-size: 24px;
  }
}

.rounded-2{
      border: 1px solid #eca301;
}

h4{
    color: #fbbd08;
  font-size: 20px;
  text-shadow: 0px 0px 5px #0f1365,0px 0px 5px #0f1365;
      font-family: Bebas Neue, Helvetica, Arial, sans-serif;
    font-weight: 900;

}

h5{
    color: #fbbd08;
    font-size: 16px;
    border-radius: 4px;
    top: 90px;
    text-shadow: 0px 0px 5px black, 0px 0px 5px black, 3px 3px 5px black, -3px -3px 5px black;
    height: 0px;
    font-family: Bebas Neue, Helvetica, Arial, sans-serif;
    font-weight: 900;
    position: relative;
    text-align: center;
    text-rendering: optimizeLegibility;
    text-transform: uppercase;
    -webkit-transform: translate(-50%, -50%) skew(-24deg) rotate(-10deg);
    transform: translate(-50%, -50%) skew(-24deg) rotate(-10deg);
    width: 128px;
    left: 95px;
}

.vue-ui-modal{
  position: initial;
  margin-left: auto;
  margin-right: auto;
  margin-top:10%;
  max-width: 600px;
  background: rgb(0, 0, 0);
  border-radius: 6px;
    border: 1px solid #fbbd08;

}
</style>
