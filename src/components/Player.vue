<template>
  <div class="py-3 px-4 m-1 columns text-center border-bottom">
    <div class="column col-4">
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
      <div class="column col-4">
      <h5 class="production">
        <span v-if="player.xp">
          Level : 
          {{ parseFloat(((Math.sqrt(625 + 100 * player.xp) - 25) / 50) + 1).toFixed(0) }}
        </span>
                  <router-link v-if="player.gang" :to="`/gang/${player.gang}`">
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
    <div v-else-if="player.amount" class="column col-4">
      <h5 class="production">
        <span class="mr-3">
          TOTAL REWARD : 
          <Icon name="future" size="22"/>
          {{ player.amount | amount}}
        </span>
      </h5>
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
  display: inline-grid;
  color: #fbbd08;
}
</style>
