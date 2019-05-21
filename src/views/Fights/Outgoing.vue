<template>
	<div>
		<FightsTabs/>
		<Paginate
			class="ml-6 mt-4 text-center width-full"
			:page-count="Math.ceil(sent/50)"
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
			<p v-if="!fights.length"><Loading/></p>
		</div>
		<Paginate
			class="ml-6 mb-4 mt-0 text-center width-full"
			:page-count="Math.ceil(sent/50)"
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
import client from '@/helpers/client';
import Paginate from 'vuejs-paginate';
import store from '@/store';

export default {
  components: {
    Paginate,
  },
  created() {
    store.dispatch('refresh_sent_fights');
  },
  data() {
    return {
      self: null,
      sent: this.$store.state.game.user.total_sent[0].total_sent || 0,
    };
  },
  computed: {
    fights() {
      return this.$store.state.game.sent_fights;
    },
  },
  methods: {
    ...mapActions(['init', 'notify']),
    load_fights(start) {
      const token = localStorage.getItem('access_token');
      let end = 50;
      const self = this;
      end = start * 50;
      start = end - 50; // eslint-disable-line no-param-reassign
      client
        .requestAsync('get_sent_fights', { token, start, end })
        .then(result => {
          self.fights = [];
          self.fights = result;
        })
        .catch(err => {
          console.log(err);
          console.error('Failed to get fights', err);
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
