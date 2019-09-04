<template>
    <div>
        <LeaderboardsTabs/>
        <div class="p-4 text-center mt-6" v-if="isLoading || users.length === 0">
            <Loading/>
        </div>
        <div class="mb-4" v-else>
            <Player v-for="user in users" :player="user" :key="user.username" />
        </div>
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
    client.requestAsync('get_lotteryboard', null).then(result => {
      this.users = result.players;
      this.isLoading = false;
    });
  },
};
</script>
