<template>
	<div>
		<LeaderboardsTabs/>
		<Paginate
			class="ml-6 mt-4 text-center width-full"
			:page-count="Math.ceil(users.length/50)"
			:page-range="3"
			:margin-pages="2"
			:click-handler="load_leaders"
			:prev-text="'Prev'"
			:next-text="'Next'"
			:container-class="'pagination'"
			:page-class="'fight'"
		></Paginate>
		<div class="p-4">
      <Player  v-for="(user, key) in users"  :player="user"
        :key="user.username"
        :rank="key + 1">
      </Player>
			<p v-if="!fights || !fights.length"><Loading/></p>
		</div>
		<Paginate
			class="ml-6 mb-4 mt-0 text-center width-full"
			:page-count="Math.ceil(users.length/50)"
			:page-range="3"
			:margin-pages="2"
			:click-handler="load_leaders"
			:prev-text="'Prev'"
			:next-text="'Next'"
			:container-class="'pagination'"
			:page-class="'fight'"
		></Paginate>
	</div>
</template>

<script>
import client from '@/helpers/client';

export default {
  data() {
    return {
      isLoading: false,
      users: [],
    };
  },
  created() {
    this.isLoading = true;
    this.load_leaders();
  },
   methods: {
    load_leaders(start) {
      let end = 100;
      end = start * 100;
      start = end - 100; // eslint-disable-line no-param-reassign
      client.requestAsync('get_props', { start, end }).then(result => {
      this.users = result.players;
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
