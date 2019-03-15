<template>
  <div class="text-red">
    <h5>Balances</h5>
    <ul class="columns list-style-none user-balances mb-4">
      <li class="column col-4">
        <Icon name="drug"/>
        <div>
          <div>{{ detail.drugs_balance | amount }}</div>
          <div class="text-green">{{ detail.drug_storage / 100 * 25 | amount }} safe</div>
        </div>
      </li>
      <li class="column col-4">
        <Icon name="weapon"/>
        <div>
          <div>{{ detail.weapons_balance | amount }}</div>
          <div class="text-green">{{ detail.weapon_storage / 100 * 25 | amount }} safe</div>
        </div>
      </li>
      <li class="column col-4">
        <Icon name="alcohol"/>
        <div>
          <div>{{ detail.alcohols_balance | amount }} </div>
          <div class="text-green">{{ detail.alcohol_storage / 100 * 25 | amount }} safe</div>
        </div>
      </li>
    </ul>
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
  },
};
</script>
