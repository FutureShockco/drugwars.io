<template>
  <div class="border-bottom pb-4 mb-4 columns" :id="fight.fight_key.slice(0, 10)">
    <div class="columns text-center">
      <div class="column col-5">
        <Avatar  v-if="!share" :size="80" :username="fight.username"/>
        <div v-if="share" class="username mt-12 mb-4" >{{ fight.username }}</div>
        <div v-else class="username mb-4" >{{ fight.username }}</div>
        <div class="mb-4" v-if="json.attacker">
          <Army
            v-if="json.attacker.units"
            :units="json.attacker.units"
            :withDead="true"
          />
        </div>
        <p class="message mb-4">{{ fight.message }}</p>
      </div>
      <div class="column col-2">
        <div class="mt-4" v-if="result">
          <div class="button button-green result" v-if="result === 'win'">
            Win
          </div>
          <div class="button result" v-if="result === 'draw'">
            Draw
          </div>
          <div class="button button-red result" v-if="result === 'lost'">
            Lost
          </div>
        </div>
        <h1 class="mt-3" v-else>VS</h1>
        <span class="mt-3" v-if="timeToWait">
          Start in {{ timeToWait | ms }}
        </span>
         <Icon v-if="share" class="logo" name="logo"/>
         <h4 v-if="share">JOIN US!</h4>
      </div>
      <div class="column col-5">
        <Avatar v-if="!share" :size="80" :username="fight.target"/>
        <div v-if="share" class="username mt-12 mb-4" >{{ fight.target }}</div>
        <div v-else class="username mb-4" >{{ fight.target }}</div>
        <div class="mb-4" v-if="json.target">
          <Army
            v-if="json.target.units"
            :units="json.target.units"
            :withDead="true"
          />
          <FightsLoot
            v-if="json.target.loot"
            :stolenResources="json.target.loot"
          />
        </div>
      </div>
    </div>
    <div class="text-center">
      <span v-if="!share" class="mr-2">
        Fight
        #{{ fight.fight_key.slice(0, 10) }}
        {{ fight.is_done ? 'ended' : 'incoming' }}
      </span>
      <span v-if="!fight.is_stable" class="mr-2">
        (pending confirmation)
      </span>
      <div>
        Start :  {{start}} - End : {{end}}
      </div>
      <button v-if="!share" class="button button-blue" @click="handleShareFight()">Share on Steem</button>
      <div class="sharemessage" v-if="!share">And obtain a chance to get rewarded (max 1 upvote per day per person).</div>
    </div>
  </div>
</template>

<script>
import { jsonParse } from '@/helpers/utils';
import { mapActions } from 'vuex';

const domtoimage = require('dom-to-image');

export default {
  props: ['fight'],
  data() {
    return {
      share: false,
    };
  },
  computed: {
    timeToWait() {
      const timeToWait = this.fight.timestamp_end * 1000 - this.$store.state.ui.timestamp;
      return timeToWait > 0 ? timeToWait : 0;
    },
    start() {
      const start = new Date(this.fight.timestamp_start * 1000).toLocaleString();
      return start;
    },
    end() {
      const end = new Date(this.fight.timestamp_end * 1000).toLocaleString();
      return end;
    },
    result() {
      let result;
      const isAuthor = this.fight.username === this.username;
      if (this.fight.result === 1) {
        result = isAuthor ? 'win' : 'lost';
      } else if (this.fight.result === 3) {
        result = !isAuthor ? 'win' : 'lost';
      } else if (this.fight.result === 2) {
        result = 'draw';
      }
      return result;
    },
    username() {
      return this.$store.state.auth.username;
    },
    json() {
      return jsonParse(this.fight.json);
    },
  },
  methods: {
    ...mapActions(['shareFight']),
    handleShareFight() {
      const self = this;
      self.share = true;
      console.log('aaa');
      const key = self.fight.fight_key;
      const cloudName = 'hightouch';
      const unsignedUploadPreset = 'nrmzes4b';
      const xhr = new XMLHttpRequest();
      setTimeout(() => {
        const node = document.getElementById(self.fight.fight_key.slice(0, 10));
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
              const post = [
                [
                  'comment',
                  {
                    parent_author: '',
                    parent_permlink: 'drugwars-fight',
                    author: self.username,
                    permlink: key.slice(0, 10),
                    title: `Check my latest fight ! ${self.fight.username} vs ${self.fight.target}`,
                    body: `<a href="https://drugwars.io/i/${
                      self.username
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
                    author: self.username,
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
                            { account: 'drugwars', weight: 2000 },
                            { account: 'drugwars-dealer', weight: 1500 },
                          ],
                        },
                      ],
                    ],
                  },
                ],
              ];
              self
                .shareFight(post)
                .then(() => {
                  self.share = false;
                })
                .catch(e => {
                  console.error('Failed to share a fight=', e);
                  self.share = false;
                });
            }
          }
        };
      }, 1000);
    },
  },
};
</script>

<style scoped type="less">
@import '../../vars.less';

p {
  overflow: hidden;
  max-width: 50%;
}

.logo {
  margin-top: 10px;
  width: 100%;
}

.result {
  font-size: 36px;
  padding: 10px;
  height: 50px;
  background-size: cover !important;
}
.sharemessage {
  font-size: 12px;
}

.message {
  max-width: 260px;
  margin: 0 auto;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
</style>
