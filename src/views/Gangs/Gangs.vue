<template>
  <div>
    <GangsTabs />
    <div class="p-4">
      <Loading v-if="isLoading" />
      <div :key="gang.gang" v-for="gang in gangs" v-else>
        <h2>
          <router-link :to="`/gang/${gang.gang}`">
            {{ gang.name || gang.gang }}
          </router-link>
        </h2>
        <p>{{ gang.ticker }}</p>
        <p>Members: {{ gang.size | amount }}</p>
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
