<template>
    <div>
        <OverviewTabs />
        <h5 class="py-3  px-0 m-1 columns text-center border-bottom">
                    <div class="column col-4 px-0">
                        Amount
                    </div>
                     <div class="column col-4 px-0">
                      From
                    </div>
                    <div class="column col-4 px-0">
                     Date
                    </div>
                 </h5>
        <div class="anim-fade-in" v-for="item in history" :key="item.id">
          
               <div class="py-3  m-0 columns text-center border-bottom">
                    <div class="column col-4 px-0">
                        {{item.amount}}
                    </div>
                     <div class="column col-4 px-0">
                        {{item.type}}
                    </div>
                    <div class="column col-4 px-0">
                        {{item.date}}
                    </div>
                 </div>
        </div>
    </div>
</template>

<script>
import Promise from 'bluebird';
import client from '@/helpers/client';

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
    const promises = [client.requestAsync('get_user_reward_history', { token: accessToken })];
    Promise.all(promises).then(result => {
      const [history] = result;
      history.forEach(element => {
        const entry = element;
        entry.dateb = parseInt(
          entry.date.split('-')[1] +
            entry.date.split('-')[0] +
            entry.date.split('-')[2].replace('-', ''),
        );
        self.history.push(entry);
      });

      self.history = self.history.sort((a, b) => b.dateb - a.dateb);
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
