<template>
  <div>
    <GangsTabs />
    <div class="p-4">
      <Loading v-if="isLoading" />
      <div :key="item.gang" v-for="item in items" v-else>
        <h2>{{ item.name || item.gang }}</h2>
        <p>{{ item.ticker }}</p>
        <p>Members: {{ item.size | amount }}</p>
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
      items: [],
    };
  },
  created() {
    this.isLoading = true;
    client.requestAsync('get_gangs', null).then(result => {
      this.items = result;
      this.isLoading = false;
    });
  },
};
</script>
