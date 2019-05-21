<template>
	<div>
		<FightsTabs/>
		<Paginate
			class="ml-6 mt-4 text-center width-full"
			:page-count="Math.ceil(inc/50)"
			:page-range="3"
			:margin-pages="2"
			:click-handler="load_fights"
			:prev-text="'Prev'"
			:next-text="'Next'"
			:container-class="'pagination'"
			:page-class="'fight'"
		></Paginate>
		<div class="p-4">
			<FightsFight class="fight" v-for="fight in fights" :key="fight.fight_key" :fight="fight"/>
			<p v-if="!fights || !fights.length"><Loading/></p>
		</div>
		<Paginate
			class="ml-6 mb-4 mt-0 text-center width-full"
			:page-count="Math.ceil(inc/50)"
			:page-range="3"
			:margin-pages="2"
			:click-handler="load_fights"
			:prev-text="'Prev'"
			:next-text="'Next'"
			:container-class="'pagination'"
			:page-class="'fight'"
		></Paginate>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import Paginate from 'vuejs-paginate';
import client from '@/helpers/client';
import store from '@/store';

export default {
  components: {
    Paginate,
  },
  data() {
    return {
      inc: this.$store.state.game.user.total_received[0].total_received || 0,
    };
  },
  computed: {
    fights() {
      return this.$store.state.game.inc_fights;
    },
  },
  methods: {
    ...mapActions(['init', 'notify', 'refresh_inc_fights']),
    load_fights(start) {
      const token = localStorage.getItem('access_token');
      let end = 50;
      end = start * 50;
      start = end - 50; // eslint-disable-line no-param-reassign
      this.refresh_inc_fights({ start, end })
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
