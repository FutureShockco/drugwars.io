<template>
  <div class="mb-4 d-flex flex-row border-bottom item">
      <img class="preview" :src="`/img/trainings/${training.id}.png`"/>
    <div class="width-full mr-4">
      <router-link :to="'/trainings/' + training.id">
        <h5>{{ training.name }}</h5>
      </router-link>
      <div class="item-description my-1">{{ training.desc }}</div>
      <div v-if="training.feature">
        Special:
        <span class="text-green">
          {{ training.feature }}
        </span>
      </div>
            <BuildingCost
        class="ml-2"
        :level="1"
        :amount="0"
        :drugs_cost="training.drugs_cost"
        :weapons_cost="training.weapons_cost"
        :alcohols_cost="training.alcohols_cost"
      />
    </div>
    <Checkout/>
  </div>
</template>

<script>
export default {
  props: ['training'],
  computed: {
    ownTraining() {
      return (
        this.$store.state.game.user.trainings.find(b => b.training === this.$props.training.id) || {
          lvl: 0,
        }
      );
    },
    ownTF() {
      return (
        this.$store.state.game.user.buildings.find(b => b.building === 'training_facility') || {
          lvl: 0,
        }
      );
    },
  },
};
</script>
