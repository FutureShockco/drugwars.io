<template>
    <div>
        <NewsTabs/>
        <div class="p-4 text-center anim-fade-in">
            <h2>DAILY NEWSPAPER</h2>
         <div v-html="news"></div>
        </div>
    </div>
</template>

<script>
import dsteem from '@/helpers/dsteem';
import steemMarkdown from 'steem-markdown-only';

export default {
  props: ['inProgress'],
  data() {
    return {
      news: null,
    };
  },
  created() {
    const self = this;
    const now = new Date();
    const lastday = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
    const day = lastday.getUTCDate();
    const month = lastday.getUTCMonth() + 1;
    const year = lastday.getUTCFullYear();
    const date = `${day}-${month}-${year}`;
    dsteem.database.getDiscussions('blog', { tag: 'drugwars', limit: 3 }).then(discussions => {
      discussions.forEach(element => {
        if (element.title.includes(date) && element.title.includes(this.$store.state.game.server.name)) {
          let text = steemMarkdown(element.body);
          text = text
            .replace(/<img/g, '<img width="100%" class="image"')
            .replace(/<table/g, '<table style="text-align: center;width:100%;"');
          [self.news] = text.split('See you on');
        }
      });
    });
  },
};
</script>

<style scoped lang="less">
.checkout {
  text-align: center;
  width: 180px;
}

.full-width {
  max-width: 100%;
}

center img {
  max-width: 100% !important;
}

.dwdicon {
  width: 22px;
  left: 0px;
  position: relative;
  float: left;
  top: 5px;
}
</style>
