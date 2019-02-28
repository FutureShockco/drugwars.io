<template>
  <div class="py-3 px-4 d-flex flex-row border-bottom">
    <div>
      <div
        class="rank mr-3"
        v-text="rank"
      />
    </div>
    <Avatar
      class="mr-2"
      :size="40"
      :username="player.username"
    />
    <div class="username">{{ player.username }}</div>
    <div>
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
@import '../vars.less';

.username {
  margin-top: 6px;
  font-size: 20px;
  width: 150px;
}

.rank {
  margin: 8px 0;
}
</style>
