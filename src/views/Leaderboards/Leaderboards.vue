<template>
    <div>
        <LeaderboardsTabs/>
        <div >
            <Player class="leaders" v-for="(user, key) in users" :player="user" :key="user.username"  :rank="key + currentRank + 1">
            </Player>
            <p v-if="!users || !users.length">
                <Loading/>
            </p>
        </div>
                <Paginate class="ml-6 mt-4 text-center width-full" :page-count="Math.ceil(count/50)" :page-range="3" :margin-pages="2" :click-handler="load_leaders" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'leaders'"></Paginate>
    </div>
</template>

<script>
import client from '@/helpers/client';
import Paginate from 'vuejs-paginate';

export default {
  components: {
    Paginate,
  },
  data() {
    return {
      isLoading: false,
      users: [],
      count: 0,
      currentRank: 0,
    };
  },
  created() {
    this.isLoading = true;
    this.load_leaders(1);
  },
  methods: {
    load_leaders(start) {
      this.users = [];
      this.currentRank = (start - 1) * 50;
      let end = 50;
      end = start * 50;
      start = end - 50; // eslint-disable-line no-param-reassign
      const params = { start, end };
      client.requestAsync('get_props', params).then(result => {
        this.users = result.players;
        this.count = result.count[0]['COUNT(*)'];
        this.isLoading = false;
      });
    },
  },
};
</script>


<style lang="less">
.pagination {
  margin-left: auto;
  margin-right: auto;
  display: -webkit-inline-box;
  list-style: none;
  a,
  span,
  em {
    background-color: #8080803b !important;
  }
}

li .disabled {
  background-color: #8080803b !important;
  color: #000000 !important;
  .pagination a {
    color: #000000 !important;
  }
}

.pagination a,
.pagination span,
.pagination em {
  background-color: #8080803b !important;
  color: #fbbd08;
  background: #1c1c1c !important;
  border: 1px solid #3e3e3e;
}

.pagination .gap,
.pagination .disabled,
.pagination .gap:hover,
.pagination .disabled:hover {
  color: #d1d5da;
  cursor: default;
  background-color: #8080803b !important;
}

.pagination a:hover,
.pagination a:focus,
.pagination span:hover,
.pagination span:focus,
.pagination em:hover,
.pagination em:focus {
  border: 1px solid #fbbd08;
}
</style>
