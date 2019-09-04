<template>
    <div class="py-3  px-0 m-1 columns text-center border-bottom">
        <div class="column col-3 px-0">
            <Avatar class="mx-2" :size="60" :username="player.nickname" :rank="rank" :picture="player.picture" :reputation="player.reputation" :xp="player.xp" />
            <div class="username" :class="{ 'text-blue' : player.gang === user.gang }">
                {{ player.nickname }}
                <div class="gang-label" v-if="player.ticker">
                    [{{ player.ticker }}]
                </div>
            </div>
        </div>
        <div class="column px-0 col-3">
            <h5 class="production mt-0">
                <router-link v-if="player.gang" :to="`/gangs/gang/${player.gang}`">
                    <span>
              {{player.role}} OF {{player.gang}}    
              <div>[{{ player.ticker }}]</div>
            </span>
                </router-link>
                <div class="text-green"> Wins :{{ player.wins }}</div>
                <div class="text-red"> Loses :{{ player.loses }}</div>
            </h5>
            <div class="shield mb-2" v-if="shieldEnd">
                <Icon name="shield" size="36" class="text-gray" />
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
        <div v-else-if="player.drugs" class="column col-3">
            <h5 class="production">
                <span class="mr-3">
              DEPOSIT : 
               <div>
              <Icon name="drug" size="22"/>
              {{ player.drugs | amount}}
              </div>
            </span>
            </h5>
        </div>
        <div v-else-if="player && player.amount" class="column col-6">
            <h5 class="production float-right">
                <span class="mr-3">
              REWARDS : 
              <div>
              {{ player.amount }}
              <Icon name="dwd" size="22"/>
              </div>
            </span>
            </h5>
        </div>
        <div v-else-if="player && player.ticket" class="column col-6">
            <h5 class="production float-right">
                <span class="mr-3">
              TICKET : 
              <div>
              {{ player.ticket }}
              </div>
            </span>
            </h5>
        </div>
        <div class="column  col-2">
            <h5 class="production">
                <span class="mr-3" v-if="player && rank && !player.amount">
               BONUS :
              <div>
              {{ Math.round(10/rank) | amount}}
              <Icon name="dwd" size="22"/>
              </div>
            </span>
            </h5>
        </div>
        <!-- <div class="column  col-2">
            <button v-if="ownSpy"
          :disabled="isLoading || waitingConfirmation || !ownSpy"
          @click="handleSubmit()"
          class="button btn-block button-red mb-2"
        >SPY</button>
        </div> -->
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import client from '@/helpers/client';

export default {
  props: ['player', 'rank','reputation'],
  data() {
    return {
      isLoading: false,
      waitingConfirmation: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.game.user.user;
    },
    shieldEnd() {
      const diff = this.player.shield_end * 1000 - this.$store.state.ui.timestamp;
      return diff > 0 ? diff : 0;
    },
    ownSpy() {
      if (
        this.$store.state.game.user.units.find(
          u =>
            u.unit === 'spy' &&
            u.base === this.$store.state.game.mainbase.base &&
            u.territory === this.$store.state.game.mainbase.territory,
        )
      )
        return (
          this.$store.state.game.user.units.find(
            u =>
              u.unit === 'spy' &&
              u.base === this.$store.state.game.mainbase.base &&
              u.territory === this.$store.state.game.mainbase.territory,
          ).amount || {
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

.icon {
  margin-bottom: -5px;
}

.production {
  display: inline-grid;
  color: #fbbd08;
}
</style>
