<template>
    <div>
        <HelpTabs/>
        <div class="p-4">
            <h3>F.A.Q.</h3>
            <input class="input btn-large btn-block mb-4" placeholder="Search" v-model="q" />
            <div>
                <div>
                    <div :key="key" v-for="(question, key) in faq" class="mb-4">
                        <p><b class="mr-3">{{ question.q }}</b></p>
                        <p>{{ question.a }}</p>
                    </div>
                </div>
            </div>
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
