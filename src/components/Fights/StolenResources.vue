<template>
  <div class="text-red">
    <div v-if="stolenResources.drugs">
      -{{ stolenResources.drugs | amount }} DRUGS
    </div>
    <div v-if="stolenResources.weapons">
      -{{ stolenResources.weapons | amount }} WEAPONS
    </div>
    <div v-if="stolenResources.alcohols">
      -{{ stolenResources.alcohols | amount }} ALCOHOLS
    </div>
  </div>
</template>

<script>
  export default {
    props: ['stolenResources'],
  };
</script>
