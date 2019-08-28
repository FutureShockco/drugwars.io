<template>
  <div class="d-flex flex-lg-row flex-column text-center text-lg-left item">
    <div class="mr-3">
      <img class="preview" :src="`/img/missions/${item.img}.jpg`" />
    </div>
    <div class="level" v-if="item.type">{{ item.type }} - Difficulty : {{item.difficulty}}</div>
    <div class="item-content width-full mr-3 mb-4">
      <h5>{{ item.name }}</h5>
      <div class="mb-2" v-html="item.detail"></div>
      <div v-if="isLoading && !ownJob">
        <Loading />
      </div>
      <h5>Enemies</h5>
      <div class="text-green" v-if="ownJob && json && json.length < 1">MISSION ACCOMPLISHED</div>
      <div v-if="!timeToWait">
        <div
          class="column m-0 mr-2 p-0 col-2 text-center"
          v-for="unit in item.units"
          :unit="unit"
          :key="unit.id"
        >
          <div class="unitamount">{{unit.amount.mini}} - {{unit.amount.max}}</div>

          <img class="preview unit width-full" width="50" :src="`/img/units/${unit.id}.png`" />

          <div class="unitname">{{unit.id}}</div>
        </div>
      </div>

      <div v-else>
        <div
          class="column m-0 mr-2 p-0 col-2 text-center"
          v-for="unit in json"
          :unit="unit"
          :key="unit.key"
        >
          <div class="unitamount">{{unit.amount}}</div>

          <img class="preview unit width-full" width="50" :src="`/img/units/${unit.key}.png`" />

          <div class="unitname">{{unit.key}}</div>
        </div>
      </div>
    </div>

    <div class="mx-auto" v-if="item.rewards && !ownJob">
      <div class="columns m-2 p-2 text-center" v-for="reward in item.rewards" :key="reward.id">
        <h5>Rewards</h5>

        <div v-if="reward.drugs" class="column m-0 p-0 col-6 reward">
          <Icon name="drug" size="32" />

          <div>?</div>
        </div>

        <div v-if="reward.weapons" class="column m-0 p-0 col-6 reward">
          <Icon name="weapon" size="32" />

          <div>?</div>
        </div>

        <div v-if="reward.alcohol" class="column m-0 p-0 col-6 reward">
          <Icon name="alcohol" size="32" />

          <div>?</div>
        </div>

        <div v-if="reward.dwd" class="column mb-2 p-0 col-6 reward">
          <Icon name="dwd" size="32" />

          <div>?</div>
        </div>
      </div>

      <button
        :disabled="isLoading || inProgress || (item.type === 'gang' && !isBoss)"
        @click="handleSubmit"
        class="button btn-block button-green mb-2"
      >
        <i class="iconfont icon-target" />

        Start Job
      </button>
    </div>

    <div v-else>
      <div class="columns m-2 p-2 text-center">
        <div class="mb-2">
          <i class="iconfont icon-clock mr-2" />

          End in {{ timeToWait | ms }}
        </div>

        <h5>Rewards</h5>

        <div v-if="rewards.randomDrugs" class="column mb-3 p-0 col-6 reward">
          <Icon name="drug" size="32" />

          <div>{{rewards.randomDrugs | amount}}</div>
        </div>

        <div v-if="rewards.randomWeapons" class="column mb-3 p-0 col-6 reward">
          <Icon name="weapon" size="32" />

          <div>{{rewards.randomWeapons | amount}}</div>
        </div>

        <div v-if="rewards.randomAlcohol" class="column m-0 p-0 col-6 reward">
          <Icon name="alcohol" size="32" />

          <div>{{rewards.randomAlcohol | amount}}</div>
        </div>

        <div v-if="rewards.randomDWD" class="column mb-2 p-0 col-6 reward">
          <Icon name="dwd" size="32" />

          <div>{{rewards.randomDWD}}</div>
        </div>
      </div>

      <router-link
        v-if="timeToWait && restUnits > 0"
        :to="`/actions?type=attack&target=${ownJob.territory}&base=${ownJob.base}&target_type=npc`"
      >
        <button class="button btn-block button-red mb-2">
          <i class="iconfont icon-target" />

          Attack
        </button>
      </router-link>

      <button
        v-else-if="!timeToWait"
        :disabled="(item.type === 'gang' && !isBoss)"
        @click="handleSubmit"
        :class="{ progress: waitingConfirmation }"
        class="button btn-block button-green mb-2"
      >
        <i class="iconfont icon-target" />

        Start Job
      </button>

      <button
        v-else
        disabled
        :class="{ progress: waitingConfirmation }"
        class="button button-blue btn-block mb-2"
      >
        <i class="iconfont icon-clock" />

        Waiting
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { jsonParse } from '@/helpers/utils';

export default {
  props: ['item'],
  data() {
    return {
      isLoading: false,
      waitingConfirmation: false,
      user: this.$store.state.game.user.user,
    };
  },
  computed: {
    priceInSteem() {
      return (this.item.price / this.$store.state.game.prizeProps.steemprice).toFixed(3);
    },
    isBoss() {
      return this.user.role === 'boss' || this.user.role === 'capo';
    },
    timeToWait() {
      const job = this.$store.state.game.user.jobs.find(j => j.job === this.item.id);
      if (job) {
        const nextUpdate = new Date(job.date).getTime();
        const now = this.$store.state.ui.timestamp;
        const timeToWait = nextUpdate - now;
        return timeToWait > 0 ? timeToWait : 0;
      }
      return 0;
    },
    timePast() {
      const pendingUpdate = new Date(this.item.date).getTime();
      const now = new Date().getTime();
      return pendingUpdate >= now;
    },
    inProgress() {
      if (!this.item) return false;
      const pendingUpdate = new Date(this.item.date).getTime();
      const now = new Date().getTime();
      return pendingUpdate >= now;
    },
    ownJob() {
      return this.$store.state.game.user.jobs.find(j => j.job === this.item.id);
    },
    json() {
      return jsonParse(this.ownJob.json) || {};
    },
    rewards() {
      return jsonParse(this.ownJob.rewards) || {};
    },
    restUnits() {
      if (this.json) return this.json.length || [];
      return 0;
    },
  },
  methods: {
    ...mapActions(['init', 'send']),
    handleSubmit() {
      this.isLoading = true;
      this.waitingConfirmation = true;
      let payload = {};
      payload = {
        job: this.item.id,
        job_type: this.item.type,
        type: 'start-job',
      };
      this.send(payload)
        .then(() => {
          self.isLoading = false;
          self.waitingConfirmation = false;
        })
        .catch(e => {
          console.error('Failed', e);
          self.isLoading = false;
          self.waitingConfirmation = false;
        });
    },
  },
};
</script>

<style scoped lang="less">
@import '../vars.less';
.shopcard {
  background: -webkit-gradient(linear, left top, left bottom, from(#0e111496), to(#000000cc)),
    url(/img/fake-brick.png);
  background: linear-gradient(#0e111496, #000000cc), url(/img/fake-brick.png);
}

.icon {
  position: relative;
}

.production {
  display: inline-grid;
  color: #fbbd08;
}

.mini {
  width: 100%;
  height: auto;
}

.width {
  width: 100%;
}

.username {
  color: #fbbd08;
  top: 0px;
}

.reward {
  color: #fbbd08;
  font-size: 9px;
  position: relative;
  background: transparent;
  text-transform: uppercase;
  img {
    max-height: 32px;
    max-width: 32px;
  }
  .unitname {
    top: -2px;
  }
}

.unitname {
  color: #fbbd08;
  font-size: 9px;
  position: relative;
  top: -19px;
  width: 100%;
  background: black;
  text-transform: uppercase;
}

.unitamount {
  width: 100%;
  background: #000000;
  color: #fbbd07;
  font-size: 9px;
}

.detail {
  min-height: 44px;
}

.type {
  color: #fbbd08;
  top: 5px !important;
  font-size: 16px;
}
</style>
