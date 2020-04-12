<template>
  <div>
    <SettingsTabs />
    <h5 class="py-3 px-0 m-1 columns text-center border-bottom">
     <div   class="column col-2 px-0">Type</div>
      <div   class="column col-8 px-0">Payload</div>
      <div class="column col-2 px-0">Date</div>
    </h5>
    <div class="anim-fade-in" v-for="item in history" :key="item.id">
      <div class="py-3 m-0 columns text-center border-bottom">
        <div class="column col-2 px-0">{{item.type}}</div>
        <div style="overflow-wrap: break-word;" class="column col-8 px-0">{{item.payload}}</div>
        <div class="column col-2 px-0">{{new Date(item.date).toLocaleString()}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Promise from 'bluebird';
import client from '@/helpers/client';
import { orderBy } from 'lodash';

export default {
  data() {
    return {
      isLoading: false,
      history: [],
    };
  },
  created() {
    const self = this;
    const accessToken = localStorage.getItem('access_token');
    const promises = [client.requestAsync('get_user_history', { token: accessToken })];
    Promise.all(promises).then(result => {
      const [history] = result;
      history.forEach(element => {
        try {
          element.payload = JSON.parse(element.payload);
          element.type = element.payload.type;
          delete element.payload.username;
          delete element.payload.type;
        } catch (error) {}
        self.history.push(element);
      });
      this.isLoading = false;
    });
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
