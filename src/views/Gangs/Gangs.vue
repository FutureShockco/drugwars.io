<template>
    <div>
        <GangsTabs />
        <div class="p-4">
            <Loading v-if="isLoading" />
            <div :key="gang.gang" v-for="gang in gangs" v-else>
                <h2>
                    <GangImage class="mr-2" size="40" v-if="gang.image" :image="gang.image" />
                    <router-link :to="`/gangs/gang/${gang.gang}`">
                        {{ gang.name || gang.gang }} [{{gang.ticker}}] <span v-if="gang.lvl">{{gang.lvl}}</span>
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
import { orderBy } from 'lodash';

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
      const gangs = result;
      const all = [];
      gangs.forEach(element => {
        if (element.lvl === null) {
          element.lvl = 0; // eslint-disable-line no-param-reassign
        }
        all.push(element);
      });
      this.gangs = orderBy(all, 'lvl', 'desc');
      this.isLoading = false;
    });
  },
};
</script>
