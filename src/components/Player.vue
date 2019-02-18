<template>
  <div class="mb-4 d-flex flex-row border-bottom pb-4">
    <div>
      <Avatar size="60" :username="player.username"></Avatar>
    </div>
    <div class="width-full">
      <div class="username">{{ player.username }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['player'],
};
</script>
