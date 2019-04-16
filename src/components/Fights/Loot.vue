<template>
    <div class="mini" :class="{ 'text-red' : result ==='lost', 'text-green' : result ==='win' }">
        <div v-if="stolenResources.drugs">
            <span v-if="result ==='lost'">-</span>
            <span v-else>+</span> {{ stolenResources.drugs | amount }} DRUGS
        </div>
        <div v-if="stolenResources.weapons">
            <span v-if="result ==='lost'">-</span>
            <span v-else>+</span> {{ stolenResources.weapons | amount }} WEAPONS
        </div>
        <div v-if="stolenResources.alcohols">
            <span v-if="result ==='lost'">-</span>
            <span v-else>+</span> {{ stolenResources.alcohols | amount }} ALCOHOL
        </div>
    </div>
</template>

<script>
export default {
  props: ['stolenResources', 'result'],
};
</script>
