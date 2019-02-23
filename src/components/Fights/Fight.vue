<template>
  <div class="border-bottom pb-4 mb-4 columns">
    <div class="columns text-center">
      <div class="column col-5">
        <Avatar
          :size="80"
          :username="fight.username"
        />
        <div>{{ fight.username }}</div>
        <div class="mb-4" v-if="jsonStart">
          <p v-if="jsonStart.units" v-for="unit in jsonStart.units">
            <img width="40" :src="`/img/units/${unit.key}.png`"> x {{ unit.amount }}
          </p>
        </div>
      </div>
      <h2 class="column col-2">
        VS
      </h2>
      <div class="column col-5">
        <Avatar
          :size="80"
          :username="fight.target"
        />
        <div>{{ fight.target }}</div>
        <div class="mb-4" v-if="jsonEnd">
          <p v-if="jsonEnd.target_units" v-for="unit in jsonEnd.target_units">
            <img width="40" :src="`/img/units/${unit.key}.png`"> x {{ unit.amount }}
          </p>
        </div>
      </div>
    </div>
    <div>
      <div>{{ fight.is_done ? 'Fight ended' : 'Fight incoming' }}</div>
      <div>{{ fight.is_stable ? 'stable' : 'pending' }}</div>
      <div v-if="fight.result">
        <h3 v-if="fight.result === 1">
          {{ fight.username === username ? 'You won': 'You lost' }}
        </h3>
        <h3 v-if="fight.result === 2">
          Draw
        </h3>
        <h3 v-if="fight.result === 3">
          {{ fight.target === username ? 'You won': 'You lost' }}
        </h3>
      </div>
      <div>{{ fight.fight_key }}</div>
    </div>
  </div>
</template>

<script>
import { jsonParse } from '@/helpers/utils';

export default {
  props: ['fight'],
  computed: {
    username() {
      return this.$store.state.auth.username;
    },
    jsonStart() {
      return jsonParse(this.fight.json_start);
    },
    jsonEnd() {
      return jsonParse(this.fight.json_end);
    },
  },
};
</script>
