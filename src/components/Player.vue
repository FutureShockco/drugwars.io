<template>
  <div class="mb-4 d-flex flex-row border-bottom item columns">
    <div class="column col-1 text-center">
      {{ rank }}
    </div>
    <div class="column col-2 text-center">
      <Avatar :size="60" :username="player.username"></Avatar>
      <div class="username">{{ player.username }}</div>
    </div>
    <div class="column col-3">
      <div>Level: {{ parseFloat(((Math.sqrt(625 + 100 * player.xp) - 25) / 50) + 1).toFixed(0) }}</div>
      <div>Attack : {{ player.weapon_production_rate * 60 * 60 * 24 | amount}}</div>
      <div>Defense : {{ player.weapon_production_rate * 60 * 60 * 24 | amount}}</div>
    </div>
    <div class="column col-3">
      <div>DRUGS: {{ player.drug_production_rate * 60 * 60 * 24 | amount}}</div>
      <div>WEAPONS: {{ player.weapon_production_rate * 60 * 60 * 24 | amount}}</div>
      <div>ALCOHOLS: {{ player.alcohol_production_rate * 60 * 60 * 24 | amount}}</div>
    </div>
    <div class="column col-3">
      <div>Wins: {{ player.wins }}</div>
      <div>Loses: {{ player.loses }}</div>
      <div>Rewards: {{ player.rewards }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['player', 'rank'],
};
</script>

<style scoped lang="less">
.width-quarter {
  width: 25%;
  text-align: center;
}

.username {
  margin-top: -10px;
  font-size: 18px;
}
.label-yellow {
  background: #fbbd08;
  padding: 0px 5px;
  margin-right: 5px;
  color: black;
}
</style>
