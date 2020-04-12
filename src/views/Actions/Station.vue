<template>
    <div>
        <ActionsTabs/>
       <div class="p-4 pb-0">Troops stationned in the same other base will all come back together at the first cancel and goes to the base from where you cancelled them.</div>
        <Paginate class="ml-6 mt-4 text-center width-full" :page-count="Math.ceil(sent/25)" :page-range="3" :margin-pages="2" :click-handler="load_fights" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'fight'"></Paginate>
        <div class="p-4">
            <div class="fight" v-for="fight in fights" :key="fight.fight_key">
                <ActionsStation v-if="fight.type === 'station'" :fight="fight" />
            </div>
            <p v-if="!fights || !fights.length">
                <Loading/>
            </p>
        </div>
        <Paginate class="ml-6 mb-4 mt-0 text-center width-full" :page-count="Math.ceil(sent/25)" :page-range="3" :margin-pages="2" :click-handler="load_fights" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'fight'"></Paginate>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import Paginate from 'vuejs-paginate';
import { orderBy } from 'lodash';

export default {
  components: {
    Paginate,
  },
  created() {
    this.load_fights(1);
  },
  computed: {
    fights() {
      const fights = [];
      if (this.$store.state.game.stations)
        this.$store.state.game.stations.forEach(element => {
          fights.push(element);
        });
      return orderBy(fights, 'end_date', 'desc');
    },
    sent() {
      if (this.$store.state.game.stations) return this.$store.state.game.stations.length;
      return 0;
    },
  },
  updated() {
    this.refresh_count();
  },
  methods: {
    ...mapActions(['refresh_stations', 'refresh_station_count']),
    load_fights(start) {
      let end = 25;
      end = start * 25;
      start = end - 25; // eslint-disable-line no-param-reassign
      this.refresh_stations({ start, end })
        .then(() => {
          this.isLoading = false;
        })
        .catch(e => {
          console.error('Failed', e);
          this.isLoading = false;
        });
    },
    refresh_count() {
      this.refresh_station_count()
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
