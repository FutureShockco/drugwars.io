<template>
  <div>
          <BootcampTabs/>
    <div class="p-4 after-header">
      <Training
        v-for="training in trainings"
        :training="training"
        :key="training.id"
      />
    </div>
  </div>
</template>

<script>
import trainings from '@/helpers/trainings.json';

export default {
  data() {
    return {
      trainings,
    };
  },
};
</script>
