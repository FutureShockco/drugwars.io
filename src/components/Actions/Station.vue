<template>
	<div class="border-bottom pt-2 pb-2 columns" :id="fight.transport_key.slice(0, 10)">
		<div class="columns text-center">
			<div class="column col-5">
				<div v-if="fight.attacker_nickname != user.nickname" :to="`/actions?type=attack&target=${fight.attacker_territory}&base=${fight.attacker_base}`">
					<Avatar :size="60" :username="fight.attacker_nickname" :picture="fight.attacker_picture" />
				</div>
				<Avatar v-else :size="60" :username="fight.attacker_nickname" :picture="fight.attacker_picture" />
				<div class="username mb-4">{{ fight.attacker_nickname }}</div>
				<div v-if="fight.attacker_gang" class="username gang mt-4">{{fight.attacker_role}} OF {{ fight.attacker_gang }} [{{ fight.attacker_ticker}}]</div>
				<div v-if="json && json.attacker && json.attacker.value" v-html="json.attacker.value"></div>
				<!-- <Troops
						:units="json.attacker.units"
					/> -->
			</div>
			<div class="column col-2">
				<div class="mt-2" v-if="result">
					<div class="button button-green result" v-if="result === 'win'">Win</div>
					<div class="button result" v-if="result === 'draw'">Draw</div>
					<div class="button button-red result" v-if="result === 'lost'">Lost</div>
				</div>
				<h1 class="mt-0 mb-0" v-else-if="fight.type !== 'station'">VS</h1>
				<h1 class="mt-0 mb-0" v-else>TO</h1>
				<h5 class="mt-0 mb-0" v-if="timeToWait">Ready in
					<div>{{ timeToWait | ms }}</div>
				</h5>
				<h5 class="mt-0" v-else-if="fight.is_stable">Ended</h5>
				<h5 class="mt-0" v-else-if="fight.type !== 'station'">Preparation</h5>
				<h5 class="mt-0" v-else-if="fight.target_nickname !== user.nickname">Units are defending</h5>
				<h5 class="mt-0" v-else-if="fight.target_nickname === user.nickname && fight.attacker_territory === fight.target_territory && fight.attacker_base === fight.target_base">Units are back</h5>
				<h5 class="mt-0" v-else>Units are ready</h5>
			</div>
			<div class="column col-5">
				<div v-if="fight.target_nickname != user.nickname" :to="`/actions?type=attack&target=${fight.attacker_territory}&base=${fight.attacker_base}`">
					<Avatar :size="60" :username="fight.target_nickname" :picture="fight.target_picture" />
				</div>
				<Avatar v-else :size="60" :username="user.nickname" :picture="user.picture" />
				<div class="username mb-4">{{ fight.target_nickname }}</div>
				<div v-if="fight.target_ticker" class="username gang mt-4">{{fight.target_role}} of {{fight.target_gang}}[{{ fight.target_ticker }}]</div>
				<div v-if="json && json.target &&json.target.value" v-html="json.target.value"></div>
			</div>
		</div>
		<div>
			<div class="columns text-center">
				<div class="column col-6">
					<div v-if="json && json.attacker && json.attacker.start_value">
						<b>Attacker Start:</b>
						<ActionsValue :result="json.attacker.start_value" />
					</div>
					<div class="mb-2 mt-2" v-if="json.attacker">
						<Army v-if="json.attacker.units" :units="json.attacker.units" :withDead="true" />
					</div>
					<div v-if="json && json.target && json.target.start_value">
						<ActionsValue :result="json.attacker.start_value" :lose="json.attacker.end_value" />
					</div>
					<div v-if="fight.json.amount">{{fight.json.amount}} Unit(s)</div>
					<p class="message mb-4">{{ fight.message }}</p>
				</div>
				<div class="column col-6">
					<div v-if="json && json.target && json.target.start_value">
						<b>Defender Start:</b>
						<ActionsValue :result="json.target.start_value" />
					</div>
					<div v-if="json.target">
						<Army v-if="json.target.units" :units="json.target.units" :withDead="true" />
					</div>
					<div v-if="json && json.target && json.target.start_value">
						<ActionsValue :result="json.target.start_value" :lose="json.target.end_value" />
					</div>
				</div>
			</div>
			<div class="text-center mb-3 mt-3">
				<div v-if="fight.attacker_base">
					FROM Territory {{fight.attacker_territory}} : Location {{fight.attacker_base}} - TO : Territory {{fight.target_territory}} : Location {{fight.target_base}}
				</div>
				<div v-if="fight.transporter_base">
					FROM Territory {{fight.transporter_territory}} : Location {{fight.transporter_base}} - TO : Territory {{fight.target_territory}} : Location {{fight.target_base}}
				</div>
				<div>
					Start : {{start}} - End : {{end}}
				</div>
				<div v-if="fight.transport_key">
					Tx : {{fight.transport_key}} <span v-if="fight.steem_block">Steem block : {{fight.steem_block}}</span>
				</div>
				<div v-else-if="fight.transport_key">
					Tx: {{fight.transport_key}} <span v-if="fight.steem_block">Steem block : {{fight.steem_block}}</span>
				</div>
				<button class="button button-red mt-2" @click="handleSubmit()" v-if="fight.is_done && fight.attacker_nickname !== user.nickname || (fight.attacker_territory != fight.target_territory || fight.attacker_base != fight.target_base)">Cancel Station</button>
			</div>
		</div>
	</div>
</template>

<script>
import { jsonParse } from '@/helpers/utils';
import { mapActions } from 'vuex';

export default {
  props: ['fight'],
  data() {
    return {};
  },
  computed: {
    timeToWait() {
      const timeToWait = new Date(this.fight.end_date).getTime() - this.$store.state.ui.timestamp;
      return timeToWait > 0 ? timeToWait : 0;
    },
    start() {
      const start = new Date(this.fight.timestamp_start * 1000).toLocaleString();
      return start;
    },
    end() {
      const end = new Date(this.fight.end_date).toLocaleString();
      return end;
    },
    result() {
      let result;
      let isAuthor;
      if (this.fight.attacker_nickname !== this.user.nickname && !this.fight.target) {
        isAuthor = false;
      } else if (this.fight.target_nickname !== this.user.nickname) isAuthor = true;
      if (this.fight.result === 1) {
        result = isAuthor ? 'win' : 'lost';
      } else if (this.fight.result === 3) {
        result = !isAuthor ? 'win' : 'lost';
      } else if (this.fight.result === 2) {
        result = 'draw';
      }
      return result;
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
    ...mapActions(['send', 'init']),
    handleSubmit() {
      const payload = {
        station_id: this.fight.transport_key,
        type: 'cancel-station',
      };
      this.isLoading = true;
      this.send(payload)
        .then(result => {
          if (result) {
            this.notify({
              type: 'success',
              message: result,
            });
            this.isLoading = false;
          }
        })
        .catch(e => {
          this.notify({
            type: 'error',
            message: `Failed to cancel station ${this.fight.transport_key}`,
          });
          console.error(`Failed to cancel station ${this.fight.transport_key}`, e);
          this.isLoading = false;
        });
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
  font-size: 24px;
  padding: 5px;
  height: 40px;
  background-size: cover !important;
}

.gang {
  font-size: 18px;
}

.sharemessage {
  font-size: 12px;
}

div .minip {
  width: 28px !important;
  height: 28px !important;
}

img {
  width: 28px;
  height: 28px;
}

.message {
  max-width: 260px;
  margin: 0 auto;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
</style>
