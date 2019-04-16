<template>
    <div class="border-bottom pb-4 mb-4 columns" :id="fight.fight_key.slice(0, 10)">
        <div class="columns text-center">
            <div class="column col-4">
                <router-link v-if="fight.attacker_nickname != user.nickname" :to="`/fight?target=${fight.attacker_nickname}`">
                    <Avatar :size="80" :username="fight.attacker_nickname" :picture="fight.attacker_picture" />
                </router-link>
                <Avatar v-else :size="80" :username="fight.attacker_nickname" :picture="fight.attacker_picture" />
                <div class="username mb-4">{{ fight.attacker_nickname }}</div>
                <div v-if="fight.attacker_gang" class="username gang mt-4">{{fight.attacker_role}} OF {{ fight.attacker_gang }} [{{ fight.attacker_ticker}}]</div>
                <div v-if="details && json && json.attacker && json.attacker.value" v-html="json.attacker.value"></div>
            </div>
            <div class="column col-4">
                <div class="mt-2" v-if="result">
                    <div class="button button-green result" v-if="result === 'win'">
                        Win
                    </div>
                    <div class="button result" v-if="result === 'draw'">
                        Draw
                    </div>
                    <div class="button button-red result" v-if="result === 'lost'">
                        Lost
                    </div>
                    <FightsLoot class="mt-2" v-if="json.target.loot" :result="result" :stolenResources="json.target.loot" />
                </div>
                <h1 class="mt-0" v-else>VS</h1>
                <h5 class="mt-0" v-if="timeToWait && fight.is_stable">
                    Start in {{ timeToWait | ms }}
                </h5>
                <h5 class="mt-0" v-else-if="fight.is_stable">
                    Ended
                </h5>
                <h5 class="mt-0" v-else>
                    Preparation
                </h5>
                <Icon v-if="share" class="logo" name="logo" />
                <h4 v-if="share">JOIN US!</h4>
            </div>
            <div class="column col-4">
                <router-link v-if="fight.target_nickname != user.nickname" :to="`/fight?target=${fight.target_nickname}`">
                    <Avatar :size="80" :username="fight.target_nickname" :picture="fight.target_picture" />
                </router-link>
                <Avatar v-else :size="80" :username="user.nickname" :picture="user.picture" />
                <div class="username mb-4">{{ fight.target_nickname }}</div>
                <div v-if="fight.target_ticker" class="username gang mt-4">{{fight.target_role}} of {{fight.target_gang}}[{{ fight.target_ticker }}]</div>
                <div v-if="details && json && json.target &&json.target.value" v-html="json.target.value"></div>
            </div>
        </div>
        <div>
            <div v-if="details || fight.is_done === 0" class="columns text-center">
                <div class="column col-6">
                    <div class="mb-4" v-if="json.attacker">
                        <Army v-if="json.attacker.units" :units="json.attacker.units" :withDead="true" />
                    </div>
                    <div v-if="fight.json.amount && username != user.nickname">{{fight.json.amount}} Unit(s)</div>
                    <p class="message mb-4">{{ fight.message }}</p>
                </div>
                <div class="column col-6">
                    <div class="mb-4" v-if="json.target">
                        <Troops v-if="json.target.detail && json.target.detail.units" :units="json.target.detail.units" />
                        <Army v-else-if="json.target.units" :units="json.target.units" :withDead="true" />
                    </div>
                </div>
            </div>
            <div v-if="details || fight.is_done === 0" class="text-center">
                <span v-if="!fight.is_stable" class="mr-2">(Waiting for confirmation)</span>
                <div v-if="fight.is_stable">
                    Start : {{start}} - End : {{end}}
                </div>
            </div>
            <div v-if="details" class="text-center">
                <FightsDetail v-if="json && json.target && fight.target_nickname != user.nickname && json.target.detail" :detail="json.target.detail" />
                <Share v-if="!timeToWait" :fight="this.fight" :fight_key="this.fight.fight_key" />
                <div class="sharemessage" v-if="!timeToWait">Share your victory on our forum and obtain a chance to get rewarded.</div>
            </div>
            <div v-if="fight.is_done!=0">
                <div v-if="!details" class="text-center">
                    <button class="button button-blue" @click="show_details()"> Show details</button>
                </div>
                <div v-else class="text-center">
                    <button class="button button-blue" @click="hide_details()"> Hide details</button>
                </div>
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
    show_details() {
      this.details = true;
    },
    hide_details() {
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
  font-size: 28px;
  padding: 10px;
  height: 50px;
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
