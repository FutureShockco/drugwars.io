<template>
  <div>
    <JobsTabs/>
    <!-- <div class="p-4">
      <Quickstart/>
    </div> -->
    <div class="text-center">
    <div class="columns m-0">
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
