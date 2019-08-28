<template>
    <div>
        <ActionsTabs/>
        <div class="p-4">
            <ActionsFight v-if="fights.length > 0" v-for="fight in fights" :key="fight.fight_key" :fight="fight" />
            <p v-if="!fights.length">There isn't any fight here.</p>
        </div>
    </div>
</template>

<script>
import client from '@/helpers/client';

export default {
  data() {
    return {
      isLoading: false,
      fights: [],
    };
  },
  mounted() {
    this.isLoading = true;

    client
      .requestAsync('get_fights', null)
      .then(fights => {
        this.fights = fights;
        this.isLoading = false;
      })
      .catch(e => {
        console.error('Failed to get fights', e);
        this.isLoading = false;
      });
  },
};
</script>
