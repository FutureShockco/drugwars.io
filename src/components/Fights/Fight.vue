<template>
  <div class="border-bottom pb-4 mb-4 columns" :id="fight.fight_key.slice(0, 10)">
    <div class="columns text-center">
       <div class="column col-4">
            <router-link v-if="username != fight.username"
                :to="`/fight?target=${fight.username}`">
                      <Avatar 
          :size="80"
          :username="fight.username"
          :picture = "fight.user_picture"
        />
          <div v-if="share" class="username mt-12 mb-4" >{{ fight.username }}</div>
          <div v-else class="username mb-4" >{{ fight.username }}</div>
          <div v-if="fight.user_gang" class="username mt-4" >{{ fight.user_gang }}</div>
        </router-link>
        <div v-else>
                      <Avatar 
          :size="80"
          :username="fight.username"
          :picture = "fight.user_picture"
        />          
        <div v-if="share" class="username mt-12 mb-4" >{{ fight.username }}</div>
          <div v-else class="username mb-4" >{{ fight.username }}</div>
          <div v-if="fight.user_gang" class="username mt-4" >{{ fight.user_gang }}</div>
        </div>
      </div>
      <div class="column col-4">
        <div class="mt-4" v-if="result">
          <div class="button button-green result" v-if="result === 'win'">
            Win
          </div>
          <div class="button result" v-if="result === 'draw'">
            Draw
          </div>
          <div class="button button-red result" v-if="result === 'lost'">
            Lost
          </div>
            <FightsLoot class="mt-2"
            v-if="json.target.loot"
            :stolenResources="json.target.loot"
          />
        </div>
        <h1 class="mt-3" v-else>VS</h1>
        <span class="mt-3" v-if="timeToWait && fight.is_stable">
          Start in {{ timeToWait | ms }}
        </span>
         <span class="mt-3" v-else-if="fight.is_stable">
           Ended
         </span>
          <span class="mt-3" v-else>
           Preparation
         </span>
         <Icon v-if="share" class="logo" name="logo"/>
         <h4 v-if="share">JOIN US!</h4>
      </div>
       <div class="column col-4">
        <router-link v-if="username != fight.target"
                :to="`/fight?target=${fight.target}`">
                      <Avatar 
          :size="80"
          :username="fight.target"
          :picture = "fight.target_picture"
        />          <div v-if="share" class="username mt-12 mb-4" >{{ fight.target }}</div>
          <div v-else class="username mb-4" >{{ fight.target }}</div>
          <div v-if="fight.target_gang" class="username mt-4" >{{ fight.target_gang }}</div>
        </router-link>
        <div v-else>
                      <Avatar 
          :size="80"
          :username="fight.target"
          :picture = "fight.target_picture"
        />              <div v-if="share" class="username mt-12 mb-4" >{{ fight.target }}</div>
          <div v-else class="username mb-4" >{{ fight.target }}</div>
          <div v-if="fight.target_gang" class="username mt-4" >{{ fight.target_gang }}</div>
        </div>
      </div>
    </div>
    <div  >
    <div class="columns text-center">
      <div class="column col-6">
        <div class="mb-4" v-if="json.attacker">
          <Army
            v-if="json.attacker.units"
            :units="json.attacker.units"
            :withDead="true"
          />
        </div>
        <div v-if="fight.json.amount && username != nickname">{{fight.json.amount}} Unit(s)</div>
        <p class="message mb-4">{{ fight.message }}</p>
      </div>
      <div class="column col-6">
        <div class="mb-4" v-if="json.target">
          <Army
            v-if="json.target.units"
            :units="json.target.units"
            :withDead="true"
          />
        </div>
            <FightsDetail
            v-if="json.targetDetail"
            :detail="json.targetDetail"
          />
      </div>
    </div>
    <div class="text-center">
      <span v-if="!fight.is_stable" class="mr-2">
        (Waiting for confirmation)
      </span>
      <div v-if="fight.is_stable">
        Start :  {{start}} - End : {{end}}
      </div>
       <Share v-if="!timeToWait && fight.result === 1" :fight="this.fight" :fight_key="this.fight.fight_key"/> 
       <div class="sharemessage" v-if="!timeToWait && fight.result === 1">Share your victory on our forum and obtain a chance to get rewarded.</div>
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
      const isAuthor = this.fight.username === this.nickname;
      if (this.fight.result === 1) {
        result = isAuthor ? 'win' : 'lost';
      } else if (this.fight.result === 3) {
        result = !isAuthor ? 'win' : 'lost';
      } else if (this.fight.result === 2) {
        result = 'draw';
      }
      return result;
    },
    nickname() {
      return this.$store.state.game.user.user.nickname;
    },
    username() {
      return this.$store.state.auth.username;
    },
    json() {
      return jsonParse(this.fight.json);
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
  font-size: 36px;
  padding: 10px;
  height: 50px;
  background-size: cover !important;
}
.sharemessage {
  font-size: 12px;
}

.message {
  max-width: 260px;
  margin: 0 auto;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
</style>
