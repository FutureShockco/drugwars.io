<template>
    <div>
        <ActionsTabs/>
        <Paginate class="ml-6 mt-4 text-center width-full" :page-count="Math.ceil(sent/26)" :page-range="3" :margin-pages="2" :click-handler="load_fights" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'fight'"></Paginate>
        <div class="p-4">
            <div class="fight" v-for="fight in fights" :key="fight.fight_key">
                <ActionsStation v-if="fight.type === 'station'" :fight="fight" />
            </div>
            <p v-if="!fights || !fights.length">
                <Loading/>
            </p>
        </div>
        <Paginate class="ml-6 mb-4 mt-0 text-center width-full" :page-count="Math.ceil(sent/26)" :page-range="3" :margin-pages="2" :click-handler="load_fights" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'fight'"></Paginate>
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
  data() {
    return {
      sent: this.$store.state.game.user.total_sent[0].total_sent || 0,
    };
  },
  computed: {
    fights() {
      const fights = [];
      if (this.$store.state.game.sent_fights)
        this.$store.state.game.sent_fights.forEach(element => {
          fights.push(element);
        });
      if (this.$store.state.game.inc_fights)
        this.$store.state.game.inc_fights.forEach(element => {
          if (fights.find(item => item.fight_key === element.fight_key)) {
          } else fights.push(element);
        });
      return orderBy(fights, 'end_date', 'desc');
    },
  },
  updated() {
    this.refresh_count();
  },
  methods: {
    ...mapActions([
      'init',
      'notify',
      'refresh_sent_fights',
      'refresh_inc_fights',
      'refresh_sent_station_count',
    ]),
    load_fights(start) {
      let end = 13;
      end = start * 13;
      start = end - 13; // eslint-disable-line no-param-reassign
      this.refresh_sent_fights({ start, end })
        .then(() => {
          this.refresh_inc_fights({ start, end })
            .then(() => {
              this.isLoading = false;
            })
            .catch(e => {
              console.error('Failed', e);
              this.isLoading = false;
            });
        })
        .catch(e => {
          console.error('Failed', e);
          this.isLoading = false;
        });
    },
    refresh_count() {
      this.refresh_sent_station_count()
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
