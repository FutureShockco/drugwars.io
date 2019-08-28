<template>
    <div>
        <HelpTabs/>
        <div class="p-4">
            <h3>How to play</h3>
            <ul class="help">
                <li>First of all, upgrade your buildings and try to produce as many resources as possible.</li>
                <li>When you are ready, build some units and train them in the art of war! They will need it.</li>
                <li>You can attack other players and they can attack you to steal your resources!</li>
                <li>When players attack or get attacked they have differents options to defend theirself, they can also choose to build more defense and let their defense taking care about the opponents.</li>
                <li>Good luck - all is fair in love and DrugWars!</li>
            </ul>
            <router-link to="/earlyaccess" class="d-block" @click.native="toggleSidebar">
                <h3>
                    Early Access (TOS)</h3>
            </router-link>
        </div>
    </div>
</template>

<script>
import faq from '@/../faq.json';

export default {
  data() {
    return {
      q: '',
    };
  },
  computed: {
    faq() {
      return faq.filter(q =>
        JSON.stringify(q)
          .toLowerCase()
          .includes(this.q.toLowerCase()),
      );
    },
  },
};
</script>

<style scoped class="less">
.help {
  font-size: 18px;
}
</style>
