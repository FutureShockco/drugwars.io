<template>
    <div>
        <GangsTabs />
        <div class="p-4">
            <Loading v-if="isInit" />
            <div v-else>
                <h1>{{ gang.name || gang.gang }}</h1>
                <form class="form" @submit.prevent="handleSubmit">
                    <input class="input input-block text-left mb-2" placeholder="Name" v-model="name" maxlength="32" />
                    <input class="input input-block text-left mb-2" placeholder="Image URL (optional)" v-model="image" type="url" />
                    <input class="input input-block text-left mb-2" placeholder="Website (optional)" v-model="website" type="url" />
                    <textarea type="text" class="input input-block text-left mb-2" placeholder="Description (optional)" v-model="about" maxlength="280"></textarea>
                    <button type="submit" class="button button-green btn-block mb-2" :disabled="isLoading">
                <span v-if="!isLoading">
                  Update
                </span>
                <SmallLoading v-else />
              </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import client from '@/helpers/client';

export default {
  data() {
    return {
      id: this.$route.params.id,
      isInit: false,
      isLoading: false,
      gang: null,
      name: null,
      image: null,
      website: null,
      about: null,
      user: this.$store.state.game.user.user,
    };
  },
  computed: {
    isBoss() {
      return this.user.role === 'boss' && this.user.gang === this.id;
    },
  },
  created() {
    this.isInit = true;
    client.requestAsync('get_gang', this.id).then(result => {
      [this.gang] = result;
      this.name = result[0].name;
      this.image = result[0].image;
      this.website = result[0].website;
      this.about = result[0].about;
      this.isInit = false;
    });
  },
  methods: {
    ...mapActions(['send', 'notify']),
    handleSubmit() {
      this.isLoading = true;

      const settings = {};
      if (this.name) settings.name = this.name;
      if (this.image) settings.image = this.image;
      if (this.website) settings.website = this.website;
      if (this.about) settings.about = this.about;

      const payload = { gang: this.id, settings, type: 'gang-update' };

      this.send(payload)
        .then(() => {
          this.isLoading = false;
          this.notify({
            type: 'success',
            message: `Settings successfully updated`,
          });
        })
        .catch(e => {
          console.error('Failed to update settings', e);
          this.isLoading = false;
        });
    },
  },
};
</script>
