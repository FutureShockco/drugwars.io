<template>
	<div>
		<LeaderboardsTabs/>
		<Paginate
			class="ml-6 mt-4 text-center width-full"
			:page-count="Math.ceil(inc/25)"
			:page-range="3"
			:margin-pages="2"
			:click-handler="load_fights"
			:prev-text="'Prev'"
			:next-text="'Next'"
			:container-class="'pagination'"
			:page-class="'fight'"
		></Paginate>
		<div class="p-4">
      <div class="fight"   v-for="(user, key) in users"  :player="user"
        :key="user.username"
        :rank="key + 1">
        	<ActionsFight v-if="fight.type === 'fight'" :fight="fight"/>
          <ActionsTransport v-if="fight.type === 'transport'" :fight="fight"/>
      </div>
			<p v-if="!fights || !fights.length"><Loading/></p>
		</div>
		<Paginate
			class="ml-6 mb-4 mt-0 text-center width-full"
			:page-count="Math.ceil(inc/25)"
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
      let end = 25;
      end = start * 25;
      start = end - 25; // eslint-disable-line no-param-reassign
      client.requestAsync('get_props', { start, end }).then(result => {
      this.users = result.players;
      this.isLoading = false;
    });
    },
  },
};
</script>
