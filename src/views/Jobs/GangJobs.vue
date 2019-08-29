<template>
  <div>
    <JobsTabs />
    <div class="text-center anim-fade-in">
      <div class="columns m-0" v-for="item in items" :key="item.id">
        <MissionCardGang :item="item" />
        <div class="columns m-0" v-for="job in ownJobs" :key="job.id+job.base">
          <div v-if="job.job === item.id">
            <div class="columns m-0" v-for="fight in fights" :key="fight.fight_key">
              <div
                v-if="job.territory === fight.target_territory && job.base === fight.target_base"
              ><JobsFight :fight="fight" :job="item"/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { missions } from 'drugwars';
import { pickBy } from 'lodash';
import client from '@/helpers/client';

export default {
  data() {
    return {
      items: pickBy(missions, b => b.type === 'gang'),
      isLoading: false,
      user: this.$store.state.game.user.user,
      fights: null,
      ownJobs: this.$store.state.game.user.gangjobs,
    };
  },
  created() {
    this.isLoading = true;
    this.load_jobs();
  },
  computed: {},
  methods: {
    load_jobs() {
      client.requestAsync('get_sent_gang_fights_npc', this.user.gang).then(result => {
        this.fights = result;
        this.isLoading = false;
      });
    },
  },
};
</script>

<style scoped lang="less">
</style>
