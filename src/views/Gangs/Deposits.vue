<template>
    <div>
        <GangsTabs />
        <div class="anim-fade-in" v-for="item in items" :key="item.id">
            <div class="d-flex flex-lg-row flex-column text-center text-lg-left item columns m-0">
                <div class="item-content width-full mb-4">
                    <h5 class="mt-0 pt-0">{{ item.name }}</h5>
                    <div v-for="(deposit, index) in deposits(item.id)" :key="deposit.username" class="column col-2  text-center">
                        <div v-if="deposit.building === item.id" class="deposit">
                            {{index+1}}
                            <Avatar class="mx-2" :size="40" :username="deposit.nickname" :picture="deposit.picture" />
                            <h5 class="text-center name mt-1 pt-1 ">
                                {{deposit.nickname}}
                            </h5>
                            <div class="special">
                                <Icon :size="18" name="dw" /> {{deposit.total | amount}} </div>
                            <div>
                                <Icon :size="18" name="drug" /> {{deposit.drugs | amount}} </div>
                            <div>
                                <Icon :size="18" name="weapon" /> {{deposit.weapons | amount}} </div>
                            <div class="mb-3">
                                <Icon :size="18" name="alcohol" /> {{deposit.alcohol | amount}}</div>
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
import { filter, pickBy, orderBy } from 'lodash';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      items: filter(pickBy(buildings, b => b.type === 'gang'), item => item.id !== 'exchange'),
      isLoading: false,
      buildings: [],
      alldeposits: [],
      id: this.$route.params.id,
    };
  },
  created() {
    this.load_buildings();
    const promises = [client.requestAsync('get_gang_deposits', this.id)];
    Promise.all(promises).then(result => {
      let depositers = [];
      [depositers] = result;
      depositers.forEach(user => {
        const total = user.drugs + user.weapons + user.alcohol;
        user.total = total; // eslint-disable-line no-param-reassign
        this.alldeposits.push(user);
      });
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
    deposits(id) {
      return filter(orderBy(this.alldeposits, 'total', 'desc'), item => item.building === id);
    },
  },
  computed: {},
};
</script>

<style lang="less" scoped>
.name {
  font-size: 14px !important;
}

.special {
  color: rgb(0, 173, 0);
  font-weight: 700;
}

.deposit {
  background: rgba(0, 0, 0, 0.699);
  border-radius: 5px;
}
</style>
