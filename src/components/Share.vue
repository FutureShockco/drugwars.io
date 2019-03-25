<template>
  <div class="m-2 columns">
    <span @click="handleShareFight('forum')">
      <Icon :size="32" class="mr-1 icon" name="dw" />
    </span>
    <span @click="handleShareFight('facebook')">
    <Icon :size="32" class="mr-1 icon" name="facebook"/>
    </span>
    <span @click="handleShareFight('forum')">
    <Icon :size="32" class="icon" name="steemit"/>
    </span>
    <span @click="handleShareFight('forum')">
    <Icon :size="32" class="mr-1 icon" name="reedit"/>
    </span>
    <span @click="handleShareFight('forum')">
    <Icon :size="32" class="mr-1 icon" name="twitter"/>
    </span>
    <span @click="handleShareFight('forum')">
    <Icon :size="32" class="icon" name="wechat"/>
    </span>
    <span @click="handleShareFight('forum')">
    <Icon :size="32" class="mr-1 icon" name="vk"/>
    </span>
    <span @click="handleShareFight('forum')">
    <Icon :size="32" class="icon" name="telegram"/>
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

const domtoimage = require('dom-to-image');

export default {
  props: ['url', 'fight', 'fight_key'],
  data() {
    return {
      share: false,
    };
  },
  methods: {
    ...mapActions(['shareFight']),
    handleShareFight(where) {
      const self = this;
      self.share = true;
      const key = this.fight_key;
      const cloudName = 'hightouch';
      const unsignedUploadPreset = 'nrmzes4b';
      const xhr = new XMLHttpRequest();
      setTimeout(() => {
        const node = document.getElementById(this.fight_key.slice(0, 10));
        domtoimage.toJpeg(node, { quality: 1 }).then(dataUrl => {
          const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
          const fd = new FormData();
          xhr.open('POST', url, true);
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          fd.append('upload_preset', unsignedUploadPreset);
          fd.append('tags', 'browser_upload');
          fd.append('file', dataUrl);
          xhr.send(fd);
        });
        xhr.onreadystatechange = function x() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.responseText) {
              const response = JSON.parse(xhr.responseText);
              const imgurl = response.secure_url;

              switch (where) {
                case `facebook`:
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=Check my latest fight ! ${
                      self.fight.username
                    } vs ${self.fight.target}&content=![dw](${imgurl.toLowerCase()})`,
                    'myWindow',
                    'width=800,height=600',
                  );
                  self.share = false;
                  break;
                case `twitter`:
                  window.open(
                    `https://drugwars.tokenbb.io/new?category=all-fights&title=Check my latest fight ! ${
                      self.fight.username
                    } vs ${self.fight.target}&content=![dw](${imgurl.toLowerCase()})`,
                    'myWindow',
                    'width=800,height=600',
                  );
                  self.share = false;
                  break;
                case `reedit`:
                  window.open(
                    `https://drugwars.tokenbb.io/new?category=all-fights&title=Check my latest fight ! ${
                      self.fight.username
                    } vs ${self.fight.target}&content=![dw](${imgurl.toLowerCase()})`,
                    'myWindow',
                    'width=800,height=600',
                  );
                  self.share = false;
                  break;
                case `vk`:
                  window.open(
                    `https://drugwars.tokenbb.io/new?category=all-fights&title=Check my latest fight ! ${
                      self.fight.username
                    } vs ${self.fight.target}&content=![dw](${imgurl.toLowerCase()})`,
                    'myWindow',
                    'width=800,height=600',
                  );
                  self.share = false;
                  break;
                case `wechat`:
                  window.open(
                    `https://drugwars.tokenbb.io/new?category=all-fights&title=Check my latest fight ! ${
                      self.fight.username
                    } vs ${self.fight.target}&content=![dw](${imgurl.toLowerCase()})`,
                    'myWindow',
                    'width=800,height=600',
                  );
                  self.share = false;
                  break;
                case `forum`:
                  window.open(
                    `https://drugwars.tokenbb.io/new?category=all-fights&title=Check my latest fight ! ${
                      self.fight.username
                    } vs ${self.fight.target}&content=![dw](${imgurl.toLowerCase()})`,
                    'myWindow',
                    'width=800,height=600',
                  );
                  self.share = false;
                  break;
                case `steem`:
                  {
                    const post = [
                      [
                        'comment',
                        {
                          parent_author: '',
                          parent_permlink: 'drugwars-fight',
                          author: this.username,
                          permlink: key.slice(0, 10),
                          title: `Check my latest fight ! ${this.fight.username} vs ${
                            this.fight.target
                          }`,
                          body: `<a href="https://drugwars.io/i/${
                            this.username
                          }"><img src="${imgurl.toLowerCase()}"></a>`,
                          json_metadata: JSON.stringify({
                            content: 'fight',
                            tags: ['drugwars-fight', 'gaming', 'fight', 'dw'],
                            app: 'drugwars',
                          }),
                        },
                      ],
                      [
                        'comment_options',
                        {
                          author: this.username,
                          permlink: key.slice(0, 10),
                          max_accepted_payout: '1000000.000 SBD',
                          percent_steem_dollars: 10000,
                          allow_votes: true,
                          allow_curation_rewards: true,
                          extensions: [
                            [
                              0,
                              {
                                beneficiaries: [
                                  { account: 'drugwars', weight: 600 },
                                  { account: 'drugwars-dealer', weight: 400 },
                                ],
                              },
                            ],
                          ],
                        },
                      ],
                    ];
                    this.shareFight(post)
                      .then(() => {
                        self.share = false;
                      })
                      .catch(e => {
                        console.error('Failed to share a fight=', e);
                        self.share = false;
                      });
                  }

                  break;
                default:
                  break;
              }
            }
          }
        };
      }, 1000);
    },
  },
};
</script>

<style scoped lang="less">
@import '../vars';

.icon {
  cursor: pointer;
}
</style>
