<template>
  <div class="mb-4 d-flex flex-row border-bottom item columns">
    <div class="column col-1 text-center">
      <span class="rank">
        {{ rank }}
      </span>
    </div>
    <div class="column col-2 text-center">
      <Avatar
        :size="60"
        :username="player.username"
        :xp="player.xp"
      />
      <div class="username">{{ player.username }}</div>
    </div>
    <div class="column">
      <div>
        <b>Production:</b>
        <Icon name="drugs"/> {{ player.drug_production_rate * 60 * 60 * 24 | amount}}
        <Icon name="weapons"/> {{ player.weapon_production_rate * 60 * 60 * 24 | amount}}
        <Icon name="alcohols"/> {{ player.alcohol_production_rate * 60 * 60 * 24 | amount}}
      </div>
      <div>Wins: {{ player.wins }}, Loses: {{ player.loses }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['player', 'rank'],
};
</script>

<style scoped lang="less">
.username {
  margin-top: -10px;
  font-size: 18px;
}

.rank {
  width: 30px;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 50%;
  background-color: white;
  color: black;
  display: block;
  text-align: center;
}
</style>
