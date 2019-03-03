<template>
  <div class="py-3 px-4 text-center border-bottom">
    <Avatar
      class="mr-2"
      :size="60"
      :username="player.username"
      :rank="rank"
    />
    <div class="username">{{ player.username }}</div>
    <div>
      <div class="production mb-2">
        <span class="mr-3">
          <Icon name="drugs" size="22"/>
          {{ player.drug_production_rate * 60 * 60 * 24 | amount}} / day
        </span>
        <span class="mr-3">
          <Icon name="weapons" size="22"/>
          {{ player.weapon_production_rate * 60 * 60 * 24 | amount}} / day
        </span>
        <span class="mr-3">
          <Icon name="alcohols" size="22"/>
          {{ player.alcohol_production_rate * 60 * 60 * 24 | amount}} / day
        </span>
      </div>
      <div class="shield mb-2" v-if="shieldEnd">
        <Icon name="shield1" size="26" class="text-gray"/>
        <div class="text-gray">{{ shieldEnd | ms }}</div>
      </div>
      <router-link
        class="button button-red button-primary mb-2"
        :to="`/fight?target=${player.username}`"
        v-else
      >
        Attack
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['player', 'rank'],
  computed: {
    shieldEnd() {
      const diff = this.player.shield_end * 1000 - this.$store.state.ui.timestamp;
      return diff > 0 ? diff : 0;
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
  font-size: 20px;
}
</style>
