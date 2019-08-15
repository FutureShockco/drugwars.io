<template>
  <div>
    <JobsTabs/>
    <!-- <div class="p-4">
      <Quickstart/>
    </div> -->
    <div class="text-center">
    <div class="columns m-0">
      <MissionCard
        v-for="item in items"
        :item="item"
        :key="item.name"
      />
      </div>
    </div>
  </div>
</template>

<script>
import { missions } from 'drugwars';
import { pickBy } from 'lodash';

export default {
  data() {
    return {
      items: pickBy(missions, b => b.type === 'gang'),
    };
  },
  methods: {},
};
</script>

<style scoped lang="less">
</style>
