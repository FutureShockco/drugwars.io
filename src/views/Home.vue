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
          <h5>Build up a gang with your mates</h5>
          <img width="100%" class="rounded-2" :src="`//img.drugwars.io/home/home2.jpg`" />
        </div>
        <div class="column det col-4">
          <h5>Fight with your opponents</h5>
          <img width="100%" class="rounded-2" :src="`//img.drugwars.io/home/home3.jpg`" />
        </div>
      </div>
      <h4 class="ui white header">{{ 'message.login_message' | translate}}</h4>
      <div class="d-inline-grid">
        <div class="ui blue header big">
          <div class="btn-orange mb-2" @click="isOpen = !isOpen">CHANGE SERVER</div>
          <div :class="{ isOpen }" class="dropdown">
            <button
              class="btn btn-yellow btn-sm rp mr-2 mb-2"
              v-for="server in servers"
              @click="chooseServer(server)"
              :key="server.number"
            >{{server.number }}: {{server.name }}
            <span v-if="server.number === 2">(Recommended)</span>
            </button>
          </div>
          SERVER {{server.number}} : {{server.name.toString().toUpperCase()}}
        </div>
                 <a
          class="button button-blue button-large mt-2 mb-4" :href="loginURL"

        >Steem login</a>
        <div
          class="button button-green button-large mb-4"
          @click="socialLogin"
        >Social login</div>

      </div>
      <div class="mb-1">Powered by</div>
      <Icon name="steem-logo" size="32" class="mr-1" />
      <Icon name="dwd" size="32" class="mr-1" />

      <img src="https://s3.amazonaws.com/steem-engine/images/steem_engine_logo_32.png" />
    </UiCenter>
  </div>
</template>

<script>
import sc from '@/helpers/steemlogin';
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      loginURL: sc.getLoginURL(),
      isAuthenticated: false,
      profile: {},
      isOpen: false,
      servers: [
        { api: process.env.VUE_APP_WS_API_URL_S1, name: 'Detroit', number: 1 },
        { api: process.env.VUE_APP_WS_API_URL_S2, name: 'Los Angeles', number: 2 },
      ],
    };
  },
  created() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('auth');
    localStorage.removeItem('loggedIn');
    if(!localStorage.getItem('logintype'))
    localStorage.setItem('logintype','steem')
  },
  computed: {
    server() {
      return this.$store.state.game.server;
    },
  },
  methods: {
    ...mapActions(['setServer']),
    socialLogin() {
      localStorage.setItem('logintype','social')
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
    chooseServer(value) {
      this.setServer(value);
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
.btn-orange {
  border-radius: 0.25em;
  box-shadow: 0px 3px 10px orangered;
  background-size: cover;
  font-weight: bold;

}
.btn-yellow {
  border-radius: 0.25em;
  background-color: #fbbd08;
  color: black;
  background-image: linear-gradient(160deg, #fbe308 0%, #ffbb00 74%);
  box-shadow: 0px 3px 10px #c59400;
  background-size: cover;
  font-weight: bold;
  &:hover {
    background-image: linear-gradient(160deg, #fbe308 0%, #ffbb00 20%, #ffc21b 80%);
    opacity: 1;
  }
  &:disabled {
    color: white;
  }
}

.btn-blue {
  border-radius: 0.25em;
  background-color: #0679fc;
  color: rgb(250, 250, 250);
  background-image: linear-gradient(-180deg, #0679fc 0%, #0361cc 90%);
  box-shadow: 0px 3px 10px #0361cc;
  background-size: cover;
  font-weight: bold;
  &:hover {
    background-image: linear-gradient(-180deg, #0374f4 0%, #035cc2 90%);
    opacity: 1;
  }
  &:disabled {
    color: white;
  }
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

.dropdown {
  left: 50%;
  transform: translatey(-30%) rotatex(90deg) scale(0);
  margin-top: 0.55em;
  transform-origin: 0 0;
  border-radius: 0.35em;
  display: none;
  opacity: 0;
  transition: all 200ms linear;

  &.isOpen {
    transform: translatey(0%);
    display: block;
    opacity: 1;
  }
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
