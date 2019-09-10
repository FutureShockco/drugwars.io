<template>
    <div>
        <div class="d-flex flex-lg-row text-center text-lg-left item">
            <div class="mr-3">
                <img class="preview" :src="`/img/icons/drugs/${drug.icon}`">
            </div> 
            <div class="item-content width-full">
                <h5>{{ drug.name }}</h5>
                <div class="mb-2" v-html="drug.description"></div>
            </div> 
        </div>
    </div>
</template>

<script>
import { drugs } from 'drugwars';
import { pickBy } from 'lodash';

export default {
  data() {
    return {
      drug: drugs.find(b => b.id === this.$route.query.name),
    };
  }
};
</script>
