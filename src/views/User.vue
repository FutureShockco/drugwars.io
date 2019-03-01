<template>
  <div>
    <Header :title="username" />
    <div class="p-4">
      <div v-if="isLoading">
        <Loading/>
      </div>
      <div v-else-if="user.user" class="text-center">
        <div class="mb-4">
          <Avatar :username="username" size="140"/>
        </div>
        <ul class="columns list-style-none user-balances container-xxs mb-4">
          <li class="column col-4">
            <Icon name="drugs"/>
            <div>
              <div>{{ balances.drugs | amount }}</div>
              <div class="text-gray">DRUGS</div>
            </div>
          </li>
          <li class="column col-4">
            <Icon name="weapons"/>
            <div>
              <div>{{ balances.weapons | amount }}</div>
              <div class="text-gray">WEAPONS</div>
            </div>
          </li>
          <li class="column col-4">
            <Icon name="alcohols"/>
            <div>
              <div>{{ balances.alcohols | amount }}</div>
              <div class="text-gray">ALCOHOLS</div>
            </div>
          </li>
        </ul>
        <Army class="mb-4" :units="units"/>
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
    };
  },
  computed: {
    balances() {
      const time = (this.$store.state.ui.timestamp - Date.parse(this.user.user.last_update)) / 1000;
      return {
        drugs: this.user.user.drugs_balance + time * this.user.user.drug_production_rate,
        weapons: this.user.user.weapons_balance + time * this.user.user.weapon_production_rate,
        alcohols: this.user.user.alcohols_balance + time * this.user.user.alcohol_production_rate,
      };
    },
  },
  created() {
    this.isLoading = true;
    kbyte.requestAsync('get_user', this.username).then(user => {
      console.log(user.units);
      this.user = user;
      this.units = user.units.map(unit => ({
        key: unit.unit,
        amount: unit.amount,
      }));
      console.log(this.units);
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
