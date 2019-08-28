<template>
    <div class="m-2 columns" v-if="!share">
        <span @click="handleShareFight('forum')">
          <Icon :size="32" class="mr-1 icon" name="dw" />
        </span>
        <span @click="handleShareFight('facebook')">
        <Icon :size="32" class="mr-1 icon" name="facebook"/>
        </span>
        <span @click="handleShareFight('reddit')">
        <Icon :size="32" class="mr-1 icon" name="reddit"/>
        </span>
        <span @click="handleShareFight('twitter')">
        <Icon :size="32" class="mr-1 icon" name="twitter"/>
        </span>
        <span @click="handleShareFightFast('wechat')">
        <Icon :size="32" class="icon" name="wechat"/>
        </span>
        <span @click="handleShareFightFast('vk')">
        <Icon :size="32" class="mr-1 icon" name="vk"/>
        </span>
        <span @click="handleShareFight('telegram')">
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
    ...mapActions(['shareFight', 'notify']),
    handleShareFight(where) {
      const self = this;
      self.share = true;
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
              const ref = `https://drugwars.io/i/${self.$store.state.auth.username}`;
              const pic = `https://cdn.stateofthedapps.com/dapps/drugwars/product_image_drugwars_624db1de4ae771212221afef1e4f60c47d7e7932d3ee7a928683f5a6c10c0c5e_opti.jpg`;
              const mes = `DrugWars is a free to play massively multiplayer strategy and simulation game based on Steem where people can get rewarded with cryptocurrency.`;
              switch (where) {
                case `facebook`:
                  window.open(
                    `http://www.facebook.com/dialog/feed?app_id=404488530371221&link=${ref}&picture=${pic}&name=DrugWars&description=Dialogs%20provide%20a%20simple,%20consistent%20interface%20for%20applications%20to%20interact%20with%20users&message=Yoyooy!&display=popup&quote=${mes} Check my latest fight ! ${
                      self.fight.attacker_nickname
                    } vs ${self.fight.target_nickname}, ${imgurl.toLowerCase()}`,
                    'myWindow',
                    'width=800,height=600',
                  );
                  self.share = false;
                  break;
                case `twitter`:
                  window.open(
                    `https://twitter.com/intent/tweet?url=${ref}&hashtags=drugwars%2Cgaming%2Cdwd%2Csteem&original_referer=${ref}&text=Check my latest fight ! ${
                      self.fight.attacker_nickname
                    } vs ${self.fight.target_nickname}, ${imgurl.toLowerCase()}`,
                    'myWindow',
                    'width=800,height=600',
                  );
                  self.share = false;
                  break;
                case `forum`:
                  window.open(
                    `https://drugwars.tokenbb.io/new?category=all-fights&title=Check my latest fight ! ${
                      self.fight.attacker_nickname
                    } vs ${self.fight.target_nickname}&content=![dw](${imgurl.toLowerCase()})`,
                    'myWindow',
                    'width=800,height=600',
                  );
                  self.share = false;
                  break;
                case `steemit`:
                  {
                    const post = [
                      [
                        'comment',
                        {
                          parent_author: '',
                          parent_permlink: 'drugwars-fight',
                          author: self.$store.state.auth.username,
                          permlink:
                            self.$store.state.auth.username.slice(0, 3) +
                            self.fight.fight_key.slice(0, 10),
                          title: `Check my latest fight ! ${self.fight.attacker_nickname} vs ${
                            self.fight.target_nickname
                          }`,
                          body: `<a href="https://drugwars.io/i/${
                            self.$store.state.auth.username
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
                          author: self.$store.state.auth.username,
                          permlink:
                            self.$store.state.auth.username.slice(0, 3) +
                            self.fight.fight_key.slice(0, 10),
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
                    self
                      .shareFight(post)
                      .then(result => {
                        if (result) self.share = false;
                      })
                      .catch(e => {
                        console.error('Failed to share a fight=', e);
                        self.share = false;
                      });
                  }

                  break;
                case `telegram`:
                  window.open(
                    `https://telegram.me/share/url?url=${ref}&text=Check my latest fight ! ${
                      self.fight.attacker_nickname
                    } vs ${self.fight.target_nickname}&content=![dw](${imgurl.toLowerCase()})`,
                    'myWindow',
                    'width=800,height=600',
                  );
                  self.share = false;
                  break;
                case `reddit`:
                  window.open(
                    `https://www.reddit.com/submit?url=${ref}&sr=${
                      self.fight.fight_key
                    }&&title=Check my latest fight!&resubmit=true&text=${
                      self.fight.attacker_nickname
                    } vs ${self.fight.target_nickname} ${mes}`,
                    'myWindow',
                    'width=800,height=600',
                  );
                  self.share = false;
                  break;
                default:
                  break;
              }
            }
          }
        };
      }, 1000);
    },
    handleShareFightFast(where) {
      const self = this;
      self.share = true;
      const ref = `https://drugwars.io/i/${self.$store.state.auth.username}`;
      switch (where) {
        case `vk`:
          window.open(`https://vk.com/share.php?url=${ref}`, 'myWindow', 'width=800,height=600');
          self.share = false;
          break;
        case `wechat`:
          window.open(
            `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ref}`,
            'myWindow',
            'width=800,height=600',
          );
          self.share = false;
          break;

        default:
          break;
      }
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
