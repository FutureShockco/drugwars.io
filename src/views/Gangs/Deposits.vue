<template>

<div>
    <GangsTabs />
      <div
        v-for="item in items"
        :key="item.id">
        <div class="d-flex flex-lg-row flex-column text-center text-lg-left item columns">

        <div class="item-content width-full mr-3 mb-4">
            <h5>{{ item.name }}</h5>
          <div v-for="deposit in deposits" :key="deposit.username" class="column col-2">
              <div v-if="deposit.building === item.id">
                <Avatar 
                  class="mx-2"
                  :size="40"
                  :username="deposit.nickname"
                  :picture="deposit.picture"
                />
                <h5 class="text-left">
                  {{deposit.nickname}}
                </h5>
                   <div><Icon :size="18" name="drug"/> {{deposit.drugs | amount}} </div>
                   <div><Icon :size="18" name="weapon"/> {{deposit.weapons | amount}} </div>
                   <div> <Icon :size="18" name="alcohol"/> {{deposit.alcohol | amount}}</div>
              </div>
          </div>
        </div>
    </div>
    </div>
  </div>

  
</template>

<script>
import { buildings } from 'drugwars';
import Promise from 'bluebird';
import client from '@/helpers/client';
import { filter, pickBy } from 'lodash';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      items: filter(pickBy(buildings, b => b.type === 'gang'), item => item.id !== 'exchange'),
      isLoading: false,
      buildings: [],
      deposits: [],
      id: this.$route.params.id,
    };
  },
  created() {
    this.load_buildings();
    const promises = [client.requestAsync('get_gang_deposits', this.id)];
    Promise.all(promises).then(result => {
      this.deposits = result[0];
      this.isInit = false;
      this.isLoading = false;
    });
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
    depositPerBuilding() {},
  },
};
</script>
