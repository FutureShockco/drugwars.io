<template>
  <div class="py-3 px-4 m-1 columns text-center border-bottom">
    <div class="column col-3">
        <router-link
      :to="`/fight?target=${player.nickname}`">
     <Avatar 
      class="mr-2"
      :size="60"
      :username="player.username"
      :rank="rank"
      :picture="player.picture"
    />
    <div class="username">
      {{ player.nickname }}
      <div class="gang-label" v-if="player.ticker">
        [{{ player.ticker }}]
      </div>
    </div>
    </router-link>
    </div>
      <div class="column col-3">
      <h5 class="production">
        <span v-if="player.xp">
          Level : 
          {{ parseFloat(((Math.sqrt(625 + 100 * player.xp) - 25) / 50) + 1).toFixed(0) }}
        </span>
                  <router-link v-if="player.gang" :to="`/gangs/gang/${player.gang}`">
              <span>
          {{player.role}} OF  {{player.gang}}    <div>
            [{{ player.ticker }}]</div>
        </span>
          </router-link>
     
      </h5>
      <div class="shield mb-2" v-if="shieldEnd">
        <Icon name="shield" size="36" class="text-gray"/>
        <div class="text-gray">{{ shieldEnd | ms }}</div>
      </div>
    </div>
    <div v-if="player.drug_production_rate" class="column col-4">
      <h5 class="production">
        <span class="mr-3">
          <Icon name="drug" size="22"/>
          {{ player.drug_production_rate * 60 * 60 * 24 | amount}} / day
        </span>
        <span class="mr-3">
          <Icon name="weapon" size="22"/>
          {{ player.weapon_production_rate * 60 * 60 * 24 | amount}} / day
        </span>
        <span class="mr-3">
          <Icon name="alcohol" size="22"/>
          {{ player.alcohol_production_rate * 60 * 60 * 24 | amount}} / day
        </span>
      </h5>
    </div>

    <div v-else-if="player.drugs" class="column col-4">
      <h5 class="production">
        <span class="mr-3">
          TOTAL DEPOSIT : 
          <Icon name="drug" size="22"/>
          {{ player.drugs | amount}}
        </span>
      </h5>
    </div>
    <div v-else-if="player && player.amount" class="column col-4">
      <h5 class="production">
        <span class="mr-3">
          TOTAL REWARD : 
          <Icon name="future" size="22"/>
          {{ player.amount | amount}}
        </span>
      </h5>
    </div>
    <div class="column col-2">
        <button v-if="ownSpy"
      :disabled="isLoading || waitingConfirmation || !ownSpy"
      @click="handleSubmit()"
      class="button btn-block button-red mb-2"
    >SPY</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import client from '@/helpers/client';

export default {
  props: ['player', 'rank'],
  data() {
    return {
      isLoading: false,
      waitingConfirmation: false,
    };
  },
  computed: {
    shieldEnd() {
      const diff = this.player.shield_end * 1000 - this.$store.state.ui.timestamp;
      return diff > 0 ? diff : 0;
    },
    ownSpy() {
      if (this.$store.state.game.user.units.find(u => u.unit === 'spy'))
        return (
          this.$store.state.game.user.units.find(u => u.unit === 'spy').amount || {
            amount: 0,
          }
        );
      return 0;
    },
  },
  methods: {
    ...mapActions(['startFight', 'init']),
    async handleSubmit() {
      this.isLoading = true;
      const payload = {
        target: this.player.nickname.toLowerCase(),
        units: [{ key: 'spy', amount: 1 }],
        type: 'fight',
      };
      if (this.message) {
        payload.message = this.message;
      }
      const isValid = await this.validateForm();
      if (isValid) {
        this.startFight(payload)
          .then(() => {
            this.isLoading = false;
          })
          .catch(e => {
            console.error('Failed to start a fight=', e);
            this.isLoading = false;
          });
      } else {
        this.isLoading = false;
      }
    },
    async validateForm() {
      this.errorMessage = null;
      const target = this.player.nickname.toLowerCase();

      if (!this.errorMessage)
        try {
          const user = await client.requestAsync('check_user', target);
          console.log(user);
          if (!user || !user[0].nickname) {
            this.errorMessage = `Player '${target}' does not exist`;
          }
          return !this.errorMessage;
        } catch (e) {
          this.errorMessage = `Player with nickname '${target}' doesn't exist`;
          console.error(`Player with nickname '${target}' doesn't exist`, e);
          return false;
        }
      if (this.errorMessage) {
        return false;
      }
      return !this.errorMessage;
    },
  },
};
</script>

<style scoped lang="less">
@import '../vars.less';

.rank {
  margin: 8px 0;
}

.production {
  display: inline-grid;
  color: #fbbd08;
}
</style>
