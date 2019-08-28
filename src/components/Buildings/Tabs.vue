<template>
    <Header>
        <UiTabs>
            <UiTab to="/buildings">Office</UiTab>
            <UiTab to="/buildings/drugs">Drugs</UiTab>
            <UiTab to="/buildings/weapons">Weapons</UiTab>
            <UiTab to="/buildings/alcohol">Alcohol</UiTab>
            <!-- <UiTab to="/buildings/defense">Defense</UiTab> -->
        </UiTabs>
        <div class="coordbase text-right" v-if="base">
            <div class="text text-blue tab name" v-if="main">
                Primary
            </div>
            <div class="text text-orange tab name" v-else-if="base.custom">
                {{base.custom}}
            </div> {{base.territory}}:{{base.base}}
        </div>
    </Header>
</template>



<script>
export default {
  data() {
    return {
      share: false,
      details: false,
    };
  },
  computed: {
    base() {
      return this.$store.state.game.mainbase;
    },
    main() {
      return (
        this.$store.state.game.user.buildings.find(
          b => b.main === 1 && b.base === this.base.base && b.territory === this.base.territory,
        ) || null
      );
    },
    user() {
      return this.$store.state.game.user.user;
    },
    username() {
      return this.$store.state.auth.username;
    },
    json() {
      return jsonParse(this.fight.json) || {};
    },
  },
  methods: {
    showDetails() {
      this.details = true;
    },
    hideDetails() {
      this.details = false;
    },
  },
};
</script>

<style lang="less" scoped>
.coordbase {
  position: absolute;
  right: 10px;
}
</style>
