<template>
    <div>
        <div v-if="!isLoading && user" class="mb-2 py-6 border-bottom text-center">
            <Avatar :username="username" size="100" :rank="rank" />
            <div class="username">
                {{ username }}
            </div>
        </div>
        <div class="p-4 text-center mt-6">
            <div v-if="isLoading">
                <Loading/>
            </div>
            <div v-else-if="user" class="text-center container-xxs">
                <div class="shield mb-4" v-if="shieldEnd">
                    <h5>Shield</h5>
                    <Icon name="shield" size="36" class="text-gray" />
                    <div class="text-gray">{{ shieldEnd | ms }}</div>
                </div>
                <h5>Balances</h5>
                <ul class="columns list-style-none user-balances mb-4">
                    <li class="column col-4">
                        <Icon name="drug" />
                        <div>
                            <div>{{ balances.drugs | amount }} / {{ user.drug_storage | amount }}</div>
                            <div>{{ user.drug_production_rate * 60 * 60 * 24 | amount}} / day</div>
                            <div class="text-green">{{ user.drug_storage / 100 * 25 | amount }} safe</div>
                            <div class="text-gray">DRUGS</div>
                        </div>
                    </li>
                    <li class="column col-4">
                        <Icon name="weapon" />
                        <div>
                            <div>{{ balances.weapons | amount }} / {{ user.weapon_storage | amount }}</div>
                            <div>{{ user.weapon_production_rate * 60 * 60 * 24 | amount}} / day</div>
                            <div class="text-green">{{ user.weapon_storage / 100 * 25 | amount }} safe</div>
                            <div class="text-gray">WEAPONS</div>
                        </div>
                    </li>
                    <li class="column col-4">
                        <Icon name="alcohol" />
                        <div>
                            <div>{{ balances.alcohols | amount }} / {{ user.alcohol_storage | amount }}</div>
                            <div>{{ user.alcohol_production_rate * 60 * 60 * 24 | amount}} / day</div>
                            <div class="text-green">{{ user.alcohol_storage / 100 * 25 | amount }} safe</div>
                            <div class="text-gray">ALCOHOL</div>
                        </div>
                    </li>
                </ul>
                <h5>Army</h5>
                <Army class="mb-4" :units="units" />
                <h5>Base</h5>
                <div v-if="username !== me" class="mb-4">
                    <router-link class="button button-red button-large" :to="`/actions?target=${username}`">
                        Attack {{ username }}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import client from '@/helpers/client';

// export default {
//   data() {
//     return {
//       username: this.$route.params.username,
//       isLoading: false,
//       user: null,
//       rank: null,
//       units: [],
//       buildings: [],
//       me: this.$store.state.auth.username,
//     };
//   },
//   computed: {
//     balances() {
//       if (!this.user) {
//         return {};
//       }
//       const time = (this.$store.state.ui.timestamp - Date.parse(this.user.last_update)) / 1000;
//       const drugs = this.user.drugs_balance + time * this.user.drug_production_rate;
//       const weapons = this.user.weapons_balance + time * this.user.weapon_production_rate;
//       const alcohols = this.user.alcohols_balance + time * this.user.alcohol_production_rate;
//       return {
//         drugs: drugs > this.user.drug_storage ? this.user.drug_storage : drugs,
//         weapons: weapons > this.user.weapon_storage ? this.user.weapon_storage : weapons,
//         alcohols: alcohols > this.user.alcohols_storage ? this.user.alcohols_storage : alcohols,
//       };
//     },
//     shieldEnd() {
//       if (!this.user) {
//         return 0;
//       }
//       const diff = this.user.shield_end * 1000 - this.$store.state.ui.timestamp;
//       return diff > 0 ? diff : 0;
//     },
//   },
// created() {
//   this.isLoading = true;
//   client.requestAsync('get_user', this.username).then(user => {
//     this.user = user.user;
//     this.buildings = user.buildings;
//     this.rank = user.rank[0].rank;
//     this.units = user.units.map(unit => ({
//       key: unit.unit,
//       amount: unit.amount,
//     }));
//     this.isLoading = false;
//   });
// },
// };
</script>

<style scoped lang="less">
.user-balances {
  li {
    font-size: 18px;
  }
  .iconfont {
    font-size: 28px;
  }
}
</style>
