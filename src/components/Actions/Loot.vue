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
        <div v-if="stolenResources.alcohols || stolenResources.alcohol">
            <span v-if="result ==='lost'">-</span>
            <span v-else>+</span> {{ stolenResources.alcohols || stolenResources.alcohol | amount }} ALCOHOL
        </div>
        <div v-if="stolenResources.dwd">
            <span v-if="result ==='lost'">-</span>
            <span v-else>+</span> {{ stolenResources.dwd | amount }} DWD
        </div>
    </div>
</template>

<script>
export default {
  props: ['stolenResources', 'result'],
};
</script>
