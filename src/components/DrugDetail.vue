<template>
    <div>
        <div class="d-flex flex-lg-row text-center text-lg-left item">
          {{drug}}
            <!-- <div class="mr-3">
                <img class="preview" :src="`/img/buildings/${drug.productid}.jpg`">
            </div> -->
            <!-- <div class="item-content width-full">
                <h5>{{ drug.name }}</h5>
                <div class="mb-2" v-html="drug.desc"></div>
                <div v-if="drug.feature" class="mb-2">
                    UNIQUE:
                    <span class="text-orange">{{ drug.feature }}</span>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { drugs } from 'drugwars';
import { pickBy } from 'lodash';

export default {
  data() {
    return {
      drug: pickBy(drugs, b => b.id === this.$route.query.name)[this.$route.query.name],
    };
  }
};
</script>
