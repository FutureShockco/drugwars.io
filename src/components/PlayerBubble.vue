<template>
  <div :id="'bubble'+player.nickname" :class="player.nickname" class="bubble px-0 m-1 text-center ">
    <Avatar 
      class="mx-2"
      :size="60"
      :username="player.nickname"
      :rank="rank"
      :picture="player.picture"
      :xp="player.xp"
    />
    <div class="username" :class="{ 'text-blue' : player.gang === user.gang }">
      {{ player.nickname }}
      <div class="gang-label" v-if="player.ticker">
        [{{ player.ticker }}]
      </div>
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
.username{
  max-width: 100px;
  text-overflow: ellipsis;
  
}

.bubble{
  position: absolute;
}

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
