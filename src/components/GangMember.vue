   <template>
  <div>
              <router-link
                :to="`/fight?target=${member.nickname}`">
                  <GangImage :image="member.picture" size="40" class="mr-2" />
                  {{ member.nickname }} {{ member.role }}
              </router-link>
              <button
                @click="handleKick(member.nickname)"
                class="button button-red float-right"
                :disabled="isLoading "
                v-if="isBoss && member.role === 'soldier' || member.role === 'capo'"
              >
                <span v-if="!isLoading">
                  Kick {{member.role}}
                </span>
                <Loading v-else />
              </button>
              <button
                @click="handleAddCapo(member.nickname)"
                class="button button-green float-right"
                :disabled="isLoading"
                v-if="member.role === 'soldier' && isBoss">
                <span v-if="!isLoading">
                  Promote to capo
                </span>
                <Loading v-else />
              </button>
              </div>
</template>


<script>
import { mapActions } from 'vuex';

export default {
  props: ['member', 'id'],
  data() {
    return {
      isLoading: false,
      gang: null,
      user: this.$store.state.game.user.user,
    };
  },
  computed: {
    isBoss() {
      return this.user.role === 'boss' && this.user.gang === this.id;
    },
  },
  methods: {
    ...mapActions(['send', 'notify']),
    resetForm() {
      this.message = null;
    },
    handleKick(soldier) {
      this.isLoading = true;

      const payload = {
        gang: this.id,
        soldier,
        type: 'gang-kick-soldier',
      };

      this.send(payload)
        .then(() => {
          this.isLoading = false;
          this.notify({
            type: 'success',
            message: `The member ${soldier} has been kicked`,
          });
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to kick member' });
          console.error('Failed to kick member', e);
          this.isLoading = false;
        });
    },
    handleAddCapo(capo) {
      this.isLoading = true;

      const payload = {
        gang: this.id,
        capo,
        type: 'gang-add-capo',
      };

      this.send(payload)
        .then(() => {
          this.isLoading = false;
          this.notify({
            type: 'success',
            message: `The soldier ${capo} has been promoted to capo`,
          });
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to add capo' });
          console.error('Failed to add capo', e);
          this.isLoading = false;
        });
    },
  },
};
</script>
