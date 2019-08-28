<template>
    <div>
        <GangsTabs />
        <div class="anim-fade-in">
            <GangBuilding v-for="item in items" :building="item" :key="item.id" />
        </div>
    </div>
</template>

<script>
import { buildings } from 'drugwars';
import { filter, pickBy } from 'lodash';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      items: filter(pickBy(buildings, b => b.type === 'gang'), item => item.id !== 'exchange'),
      isLoading: false,
      buildings: [],
    };
  },
  created() {
    this.load_buildings();
  },
  methods: {
    ...mapActions(['init', 'notify', 'refresh_gang_buildings']),
    load_buildings() {
      this.isLoading = true;
      this.refresh_gang_buildings()
        .then(() => {
          this.isLoading = false;
        })
        .catch(e => {
          console.error('Failed', e);
          this.isLoading = false;
        });
    },
  },
};
</script>
