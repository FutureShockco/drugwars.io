<template>
  <div>
    <GangsTabs />
    <div class="p-4">
      <Loading v-if="isLoading" />
      <div :key="gang.gang" v-for="gang in gangs" v-else>
        <h2>
          <GangImage class="mr-2" size="40" v-if="gang.image" :image="gang.image" />
          <router-link :to="`/gangs/gang/${gang.gang}`">
            {{ gang.name || gang.gang }} [{{gang.ticker}}]
          </router-link>
        </h2>
        <p v-if="gang.about">{{ gang.about }}</p>
        <p>Members: {{ gang.size-1 | amount }}/100</p>
      </div>
    </div>
  </div>
</template>

<script>
import client from '@/helpers/client';

export default {
  data() {
    return {
      isLoading: false,
      gangs: [],
    };
  },
  created() {
    this.isLoading = true;
    client.requestAsync('get_gangs', null).then(result => {
      this.gangs = result;
      this.isLoading = false;
    });
  },
};
</script>
