<template>
  <div>
    <MissionsTabs/>
    <!-- <div class="p-4">
      <Quickstart/>
    </div> -->
    <div class="p-2 text-center">
    <h2>MISSIONS</h2>
    <div class="columns">
      <MissionCard
        v-for="item in missions"
        :item="item"
        :key="item.name"
      />
      </div>
    </div>
  </div>
</template>

<script>
import { missions } from 'drugwars';

export default {
  data() {
    return {
      missions,
    };
  },
  methods: {},
};
</script>

<style scoped lang="less">
</style>
