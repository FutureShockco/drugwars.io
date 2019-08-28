<template>
    <div v-if="units">
        <h5>UNITS</h5>
        <div v-for="unit in units" v-if="unit.amount !== 0" :key="unit.unit || unit.key" class="d-inline-block mx-1 my-1 text-center">
            <img width="50" :src="`/img/units/${unit.unit || unit.key}.png`">
            <div>
                {{ unit.amount }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['units'],
};
</script>
