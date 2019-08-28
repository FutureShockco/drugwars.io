<template>
    <div v-if="fight.type === 'transport'" class="border-bottom pb-4 mb-4 columns" :id="fight.transport_key.slice(0, 10)">
        <div class="columns text-center">
            <div class="column col-5">
                <div v-if="fight.transporter_nickname != user.nickname" :to="`/actions?type=attack?nickname=${fight.transporter_nickname}`">
                    <Avatar :size="60" :username="fight.transporter_nickname" :picture="fight.transporter_picture" />
                </div>
                <Avatar v-else :size="60" :username="fight.transporter_nickname" :picture="fight.transporter_picture" />
                <div class="username mb-4">{{ fight.transporter_nickname }}</div>
                <div v-if="fight.transporter_gang" class="username gang mt-4">{{fight.transporter_role}} OF {{ fight.transporter_gang }} [{{ fight.transporter_ticker}}]</div>
                <div v-if="json && json.transporter && json.transporter.value" v-html="json.transporter.value"></div>
            </div>
            <div class="column col-2">
                <h1 class="mt-0">TO</h1>
                <h5 class="mt-0" v-if="timeToWait">Delivery in
                    <div>{{ timeToWait | ms }}</div>
                </h5>
                <h5 class="mt-0" v-else-if="fight.is_done">Ended</h5>
                <h5 class="mt-0" v-else>Preparation</h5>
            </div>
            <div class="column col-5">
                <div v-if="fight.target_nickname != user.nickname" :to="`/actions?type=attack&nickname=${fight.target_nickname}`">
                    <Avatar :size="60" :username="fight.target_nickname" :picture="fight.target_picture" />
                </div>
                <Avatar v-else :size="60" :username="user.nickname" :picture="user.picture" />
                <div class="username mb-4">{{ fight.target_nickname }}</div>
                <div v-if="fight.target_ticker" class="username gang mt-4">{{fight.target_role}} of {{fight.target_gang}}[{{ fight.target_ticker }}]</div>
                <div v-if="details && json && json.target &&json.target.value" v-html="json.target.value"></div>
            </div>
        </div>
        <Troops class="text-center" v-if="json.transporter && json.transporter.units" :units="json.transporter.units" />
        <Troops class="text-center" v-if="json.attacker && json.attacker.units" :units="json.attacker.units" />
        <ul class="columns text-center list-style-none user-balances mb-4" v-if="json.resources">
            <li class="column col-3">
                <Icon name="drug" />
                <div class="text-green">
                    <h5>{{ json.resources.drugs | amount }}</h5>
                </div>
            </li>
            <li class="column col-3">
                <Icon name="weapon" />
                <div class="text-green">
                    <h5>{{ json.resources.weapons | amount }}</h5>
                </div>
            </li>
            <li class="column col-3">
                <Icon name="alcohol" />
                <div class="text-green">
                    <h5>{{ json.resources.alcohol | amount }} </h5>
                </div>
            </li>
        </ul>
        <div class="text-center mb-3 mt-3">
            <div v-if="fight.attacker_base">
                FROM Territory {{fight.attacker_territory}} : Location {{fight.attacker_base}} - TO : Territory {{fight.target_territory}} : Location {{fight.target_base}}
    
            </div>
            <span v-if="fight.transporter_base">
    						<router-link 	v-if="fight.target_nickname === user.nickname" :to="`/actions?type=attack&target=${fight.transporter_territory}&base=${fight.transporter_base}`">
    													Territory {{fight.transporter_territory}} : Location {{fight.attacker_base}}
    						</router-link>
    						<span v-else>
    									Territory {{fight.transporter_territory}} : Location {{fight.transporter_base}}
    						</span>
            <span>TO :  
    						</span>
            <router-link v-if="fight.target_nickname != user.nickname" :to="`/actions?type=attack&target=${fight.target_territory}&base=${fight.target_base}`">
                Territory {{fight.target_territory}} : Location {{fight.target_base}}
            </router-link>
            <span v-else>
    						Territory {{fight.target_territory}} : Location {{fight.target_base}}
    						</span>
            </span>
            <div>Start : {{start}} - End : {{end}}</div>
            <div v-if="fight.fight_key">
                Tx : {{fight.fight_key}} <span v-if="fight.steem_block">Steem block : {{fight.steem_block}}</span>
            </div>
            <div v-else-if="fight.transport_key">
                Tx: {{fight.transport_key}} <span v-if="fight.steem_block">Steem block: {{fight.steem_block}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { jsonParse } from '@/helpers/utils';

export default {
  props: ['fight'],
  data() {
    return {
      share: false,
      details: false,
    };
  },
  computed: {
    timeToWait() {
      const timeToWait = new Date(this.fight.end_date).getTime() - this.$store.state.ui.timestamp;
      return timeToWait > 0 ? timeToWait : 0;
    },
    start() {
      const start = new Date(this.fight.timestamp_start * 1000).toLocaleString();
      return start;
    },
    end() {
      const end = new Date(this.fight.end_date).toLocaleString();
      return end;
    },
    result() {
      let result;
      let isAuthor;
      if (this.fight.attacker_nickname !== this.user.nickname && !this.fight.target) {
        isAuthor = false;
      } else if (this.fight.target_nickname !== this.user.nickname) isAuthor = true;
      if (this.fight.result === 1) {
        result = isAuthor ? 'win' : 'lost';
      } else if (this.fight.result === 3) {
        result = !isAuthor ? 'win' : 'lost';
      } else if (this.fight.result === 2) {
        result = 'draw';
      }
      return result;
    },
    user() {
      return this.$store.state.game.user.user;
    },
    username() {
      return this.$store.state.auth.username;
    },
    json() {
      return jsonParse(this.fight.json) || {};
    },
  },
  methods: {
    showDetails() {
      this.details = true;
    },
    hideDetails() {
      this.details = false;
    },
  },
};
</script>

<style scoped type="less">
@import '../../vars.less';
p {
  overflow: hidden;
  max-width: 50%;
}

.logo {
  margin-top: 10px;
  width: 100%;
}

.result {
  font-size: 24px;
  padding: 5px;
  height: 40px;
  background-size: cover !important;
}

.gang {
  font-size: 18px;
}

.sharemessage {
  font-size: 12px;
}

div .minip {
  width: 28px !important;
  height: 28px !important;
}

img {
  width: 28px;
  height: 28px;
}

.message {
  max-width: 260px;
  margin: 0 auto;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
</style>
