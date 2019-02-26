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
  width: 30px;
  height: 30px;
  margin: 5px 0;
  line-height: 26px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 50%;
  background-color: transparent;
  color: @primary-color;
  border: 1px solid @primary-color;
  display: block;
  text-align: center;
}
</style>
