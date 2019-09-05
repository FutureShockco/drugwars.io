<template>
    <div>
        <h5>Balances</h5>
        <ul class="columns list-style-none user-balances mb-4">
            <li class="column col-4">
                <Icon name="drug" />
                <div class="text-red">
                    <div>{{ detail.drugs_balance | amount }}</div>
                    <div class="text-green">{{ detail.drug_storage / 100 * 20 | amount }} safe</div>
                </div>
            </li>
            <li class="column col-4">
                <Icon name="weapon" />
                <div class="text-red">
                    <div>{{ detail.weapons_balance | amount }}</div>
                    <div class="text-green">{{ detail.weapon_storage / 100 * 20 | amount }} safe</div>
                </div>
            </li>
            <li class="column col-4">
                <Icon name="alcohol" />
                <div class="text-red">
                    <div>{{ detail.alcohols_balance | amount }} </div>
                    <div class="text-green">{{ detail.alcohol_storage / 100 * 20 | amount }} safe</div>
                </div>
            </li>
        </ul>
        <h5 v-if="detail && detail.buildings">BUILDINGS :</h5>
        <ActionsBase class="mb-4" v-if="detail && detail.buildings" :items="detail.buildings" />
        <h5 v-if="detail && detail.trainings">TRAINING :</h5>
        <ActionsTrainings class="mb-4" v-if="detail && detail.trainings" :items="detail.trainings" />
        <div >
            <a @click="openInNewTab()">Open in the simulator</a>
        </div>
    </div>
</template>

<script>
export default {
  props: ['detail'],
  computed: {
    balances() {
      if (!this.detail) {
        return {};
      }
      const time = (this.$store.state.ui.timestamp - Date.parse(this.detail.last_update)) / 1000;
      const drugs = this.detail.drugs_balance + time * this.detail.drug_production_rate;
      const weapons = this.detail.weapons_balance + time * this.detail.weapon_production_rate;
      const alcohols = this.detail.alcohols_balance + time * this.detail.alcohol_production_rate;
      return {
        drugs: drugs > this.detail.drug_storage ? this.detail.drug_storage : drugs,
        weapons: weapons > this.detail.weapon_storage ? this.detail.weapon_storage : weapons,
        alcohols: alcohols > this.detail.alcohols_storage ? this.detail.alcohols_storage : alcohols,
      };
    },
    ownBase() {
      return this.$store.state.game.mainbase;
    },
  },
  methods: {
    openInNewTab() {
      const url = 'https://simulator.drugwars.io/';
      let toOpen = '';
      let myarmy = this.$store.state.game.user.units.filter(
        unit => unit.base === this.ownBase.base && unit.territory === this.ownBase.territory,
      );
      myarmy = myarmy.map(unit =>
        this.serialize({
          p: 1,
          key: unit.unit,
          n: unit.amount,
        }),
      );
      toOpen += myarmy;
      const mytraining = this.$store.state.game.user.trainings.map(training =>
        this.serialize({
          p: 1,
          key: training.training,
          lvl: training.lvl,
        }),
      );
      toOpen += `,${mytraining}`;
      if (this.detail.units.length > 0) {
        const enemyarmy = this.detail.units.map(unit =>
          this.serialize({
            p: 2,
            key: unit.unit,
            n: unit.amount,
          }),
        );
        toOpen += `,${enemyarmy}`;
      }

      if (this.detail.trainings.length > 0) {
        const enemytraining = this.detail.trainings.map(training =>
          this.serialize({
            p: 2,
            key: training.training,
            lvl: training.lvl,
          }),
        );
        toOpen += `,${enemytraining}`;
      }
      const win = window.open(`${url}?${toOpen}`, '_blank');
      win.focus();
    },
    serialize(obj) {
      const str = [];
      for (const p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
        }
      return str.join('&');
    },
  },
};
</script>
