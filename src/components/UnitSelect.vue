<template>
  <div>
    <p>{{ unit.name }}</p>
    <img class="preview rounded-2" :src="`/img/units/${unit.id}.png`"/>
    <div class="v-align-middle mb-4">
      <input
        class="input form-control mr-2"
        type="number"
        min="1"
        :max="item.amount"
        v-model="amount"
      >
      <button
        class="button button-blue"
        @click="handleClick"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script>
import units from 'drugwars/units.json';

export default {
  props: ['item'],
  data() {
    return {
      amount: this.item.amount,
    };
  },
  computed: {
    unit() {
      return units[this.item.key];
    },
  },
  methods: {
    handleClick() {
      this.$emit('click', {
        key: this.unit.id,
        amount: this.amount,
      });
    }
  }
};
</script>
