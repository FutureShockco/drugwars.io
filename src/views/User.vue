<template>
  <div>
    <div v-if="!isLoading && user.user" class="mb-2 py-6 border-bottom text-center">
      <Avatar
        :username="username"
        size="100"
        :rank="user.rank[0].rank"
      />
      <div class="username">
        {{ username }}
      </div>
    </div>
    <div class="p-4">
      <div v-if="isLoading">
        <Loading/>
      </div>
      <div v-else-if="user.user" class="text-center">
        <div class="shield mb-4" v-if="shieldEnd">
          <Icon name="shield1" size="26" class="text-gray"/>
          <div class="text-gray">{{ shieldEnd | ms }}</div>
        </div>
        <ul class="columns list-style-none user-balances container-xxs mb-4">
          <li class="column col-4">
            <Icon name="drugs"/>
            <div>
              <div>{{ balances.drugs | amount }}</div>
              <div>{{ user.user.drug_production_rate * 60 * 60 * 24 | amount}} / day</div>
              <div class="text-gray">DRUGS</div>
            </div>
          </li>
          <li class="column col-4">
            <Icon name="weapons"/>
            <div>
              <div>{{ balances.weapons | amount }}</div>
              <div>{{ user.user.weapon_production_rate * 60 * 60 * 24 | amount}} / day</div>
              <div class="text-gray">WEAPONS</div>
            </div>
          </li>
          <li class="column col-4">
            <Icon name="alcohols"/>
            <div>
              <div>{{ balances.alcohols | amount }}</div>
              <div>{{ user.user.alcohol_production_rate * 60 * 60 * 24 | amount}} / day</div>
              <div class="text-gray">ALCOHOLS</div>
            </div>
          </li>
        </ul>
        <Army class="mb-4" :units="units"/>
        <Base class="mb-4" :items="user.buildings"/>
        <div v-if="username !== me" class="mb-4">
          <router-link
            class="button button-red button-large"
            :to="`/fight?target=${username}`"
          >
            Attack {{ username }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import kbyte from '@/helpers/kbyte';

export default {
  data() {
    return {
      username: this.$route.params.username,
      isLoading: false,
      user: null,
      units: [],
      me: this.$store.state.auth.username,
    };
  },
  computed: {
    balances() {
      if (!this.user || !this.user.user) {
        return {};
      }
      const time = (this.$store.state.ui.timestamp - Date.parse(this.user.user.last_update)) / 1000;
      return {
        drugs: this.user.user.drugs_balance + time * this.user.user.drug_production_rate,
        weapons: this.user.user.weapons_balance + time * this.user.user.weapon_production_rate,
        alcohols: this.user.user.alcohols_balance + time * this.user.user.alcohol_production_rate,
      };
    },
    shieldEnd() {
      if (!this.user || !this.user.user) {
        return 0;
      }
      const diff = this.user.user.shield_end * 1000 - this.$store.state.ui.timestamp;
      return diff > 0 ? diff : 0;
    },
  },
  created() {
    this.isLoading = true;
    kbyte.requestAsync('get_user', this.username).then(user => {
      this.user = user;
      this.units = user.units.map(unit => ({
        key: unit.unit,
        amount: unit.amount,
      }));
      this.isLoading = false;
    });
  },
};
</script>

<style scoped lang="less">
.user-balances {
  li {
    font-size: 20px;
  }

  .iconfont {
    font-size: 28px;
  }
}
</style>
