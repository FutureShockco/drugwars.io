<template>
  <div class="border-bottom pb-4 mb-4 columns">
    <div class="columns text-center">
      <div class="column col-5">
        <Avatar :size="80" :username="fight.username"/>
        <div class="username mb-4">{{ fight.username }}</div>
        <div class="mb-4" v-if="json.attacker">
          <FightsUnits
            v-if="json.attacker.units"
            :units="json.attacker.units"
          />
        </div>
      </div>
      <div class="column col-2">
        {{ timeToWait | ms }}
        <div class="mt-4" v-if="result">
          <div class="username bg-green result" v-if="result === 'win'">
            Win
          </div>
          <div class="username result" v-if="result === 'draw'">
            Draw
          </div>
          <div class="username bg-red result" v-if="result === 'lost'">
            Lost
          </div>
        </div>
        <h1 class="mt-3" v-else>VS</h1>
      </div>
      <div class="column col-5">
        <Avatar :size="80" :username="fight.target"/>
        <div class="username mb-4">{{ fight.target }}</div>
        <div class="mb-4" v-if="json.target">
          <FightsUnits
            v-if="json.target.target_units"
            :units="json.target.target_units"
          />
          <FightsStolenResources
            v-if="json.target.stolen_resources"
            :stolenResources="json.target.stolen_resources"
          />
        </div>
      </div>
    </div>
    <div>
      <span class="mr-2">{{ fight.is_done ? 'Fight ended' : 'Fight incoming' }}</span>
      <span class="mr-2">{{ fight.is_stable ? 'stable' : 'pending' }}</span>
      <span class="mr-2">#{{ fight.fight_key }}</span>
    </div>
  </div>
</template>

<script>
import { jsonParse } from '@/helpers/utils';
import StolenResources from "./StolenResources";

export default {
  components: {StolenResources},
  props: ['fight'],
  computed: {
    timeToWait() {
      return (this.$store.state.ui.timestamp/ 1000) - this.fight.timestamp_end;
    },
    result() {
      let result;
      const isAuthor = this.fight.username === this.username;
      if (this.fight.result === 1) {
        result = isAuthor ? 'win' : 'lost';
      } else if (this.fight.result === 3) {
        result = !isAuthor ? 'win' : 'lost';
      } else if (this.fight.result === 2) {
        result = 'draw';
      }
      return result;
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

.result {
  font-size: 36px;
  padding: 0;
  color: black;
  background-color: #414141;
  box-shadow: none !important;
}
</style>
