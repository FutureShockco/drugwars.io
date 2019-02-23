<template>
  <div>
    <Header title="Missions" />
    <div class="p-4 after-header">
      <div class="d-flex flex-row border-bottom mb-6 pb-4">
        <div>
          <img width="100" height="100" class="mr-4" src="/img/me.png"/>
        </div>
        <p>Hey <b>{{ username }}</b>! You seem to be just arrived in the city. You may try to make some friends but I rather suggest you to start to defend yourself before starting any friendship. Nobody knows how much time you will stand there, but everyone will try to steal what you are producing! You should fulfill theses missions before getting some new ones.</p>
      </div>
      <ul class="missions list-style-none">
        <li><i class="iconfont icon-check text-green mr-2"/> Upgrade the headquarters</li>
        <li><i class="iconfont icon-check text-green mr-2"/> Increase your DRUGS production</li>
        <li><i class="iconfont icon-check text-green mr-2"/> Increase your WEAPONS production</li>
        <li><i class="iconfont icon-check text-green mr-2"/> Increase your ALCOHOL production</li>
        <li><i class="iconfont icon-check text-green mr-2"/> Build a training facility!</li>
        <li><i class="iconfont icon-check text-green mr-2"/> Recruit some units</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: this.$store.state.auth.username,
    };
  },
};
</script>

<style scoped lang="less">
.missions {
  li {
    font-size: 20px;
    margin-bottom: 12px;

    .icon-check {
      font-size: 24px;
    }
  }
}
</style>
