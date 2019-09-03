<template>
    <div  class="bubble px-0 m-1 text-center ">
        <AvatarBubble class="mx-2" :size="size" :username="player.nickname" :rank="player.rank" :picture="player.picture" :xp="player.xp" :reputation="player.reputation" />
        <div class="detail">
            <div class="busername" v-if="player.gang" :class="{ 'text-blue' : player.gang === user.gang }">
                {{ player.nickname }}
                <div class="gang-label" v-if="player.ticker">
                    {{player.role}} OF [{{ player.ticker }}]
                </div>
            </div>
            <div class="busername" v-else>
                {{ player.nickname }}
            </div>
        <div class="mt-3">
            Coordinates</div>
        <div>{{player.territory}} :{{player.base}}</div>
        <div>Distance Approx. : </div>
        {{timer | ms}}
        <div class="production mb-2">
            <span>{{player.drug_production_rate * 60 * 60 * 24| amount}}  <Icon name="drug" size="18" /></span>
            <span> {{player.weapon_production_rate * 60 * 60 * 24| amount}}  <Icon name="weapon" size="18" /></span>
            <span>{{player.alcohol_production_rate * 60 * 60 * 24| amount}}  <Icon name="alcohol" size="18" /></span>
        </div>
        <button :disabled="!ownSpy && isLoading" class="button button-red btn-block" @click.prevent="handleSubmit(player.territory,player.base)">
                <SmallLoading v-if="isLoading"/>
              <span v-else>Spy</span>
            </button>
    </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import client from '@/helpers/client';

export default {
    props: ['player', 'rank', 'info'],
    data() {
        return {
            isLoading: false,
            waitingConfirmation: false,
        };
    },
    computed: {
        user() {
            return this.$store.state.game.user.user;
        },
        ownBase() {
            return this.$store.state.game.mainbase;
        },
        shieldEnd() {
            const diff = this.player.shield_end * 1000 - this.$store.state.ui.timestamp;
            return diff > 0 ? diff : 0;
        },
        size()
        {
          if(this.player.drug_production_rate*10 > 100)
          return 100
          if((this.player.drug_production_rate*10 < 40))
          return 40
          else{
            return (this.player.drug_production_rate*10)
          }
        },
        ownSpy() {
            if (
                this.$store.state.game.user.units.find(
                    u =>
                    u.unit === 'spy' &&
                    u.base === this.$store.state.game.mainbase.base &&
                    u.territory === this.$store.state.game.mainbase.territory,
                )
            )
                return (
                    this.$store.state.game.user.units.find(
                        u =>
                        u.unit === 'spy' &&
                        u.base === this.$store.state.game.mainbase.base &&
                        u.territory === this.$store.state.game.mainbase.territory,
                    ).amount || {
                        amount: 0,
                    }
                );
            return 0;
        },
        ownSpy() {
            if (
                this.$store.state.game.user.units.find(
                    u =>
                    u.unit === 'spy' &&
                    u.base === this.$store.state.game.mainbase.base &&
                    u.territory === this.$store.state.game.mainbase.territory,
                ) || 0

            )
                return (
                    this.$store.state.game.user.units.find(
                        u =>
                        u.unit === 'spy' &&
                        u.base === this.$store.state.game.mainbase.base &&
                        u.territory === this.$store.state.game.mainbase.territory,
                    ).amount || 0
                );
            return 0;
        },
        timer() {
            const self = this;
            let timer = 15 * 60;
            let distance = 0;
            let reduce = 0;
            if (self.ownBase && self.player)
                distance =
                Number(self.ownBase.territory) > Number(self.player.territory) ?
                Number(self.ownBase.territory) - Number(self.player.territory) :
                Number(self.player.territory) - Number(self.ownBase.territory);
            const training = this.$store.state.game.user.trainings.find(b => b.training === 'routing');
            if (training) {
                reduce = training.lvl;
            }
            timer += distance;
            return (timer = (timer - (timer / 200) * reduce) * 1000);
        },
    },
    methods: {
        ...mapActions(['startFight', 'init']),
        async handleSubmit(territory, base) {
            this.isLoading = true;
            const self = this;
            const payload = {
                from_territory: Number(self.ownBase.territory),
                from_base: Number(self.ownBase.base),
                territory: Number(territory),
                base: Number(base),
                units: [{ key: 'spy', amount: 1 }],
                type: 'fight',
            };
            if (this.message) {
                payload.message = this.message;
            }
            const isValid = await this.validateForm();
            if (isValid) {
                this.startFight(payload)
                    .then(() => {
                        this.isLoading = false;
                    })
                    .catch(e => {
                        console.error('Failed to start a fight=', e);
                        this.isLoading = false;
                    });
            } else {
                this.isLoading = false;
            }
        },
        async validateForm() {
            this.errorMessage = null;
            const target = this.player.nickname.toLowerCase();
            if (!this.errorMessage)
                try {
                    const user = await client.requestAsync('check_user', target);
                    if (!user || !user[0].nickname) {
                        this.errorMessage = `Player '${target}' does not exist`;
                    }
                    return !this.errorMessage;
                } catch (e) {
                    this.errorMessage = `Player with nickname '${target}' doesn't exist`;
                    console.error(`Player with nickname '${target}' doesn't exist`, e);
                    return false;
                }
            if (this.errorMessage) {
                return false;
            }
            return !this.errorMessage;
        },
    },
};
</script>

<style scoped lang="less">
@import '../vars.less';
.username {
    text-overflow: ellipsis;
    pointer-events: none;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    line-height: 16px;
}

.bubble {
    position: absolute;
    width: 100px;
}

.rank {
    margin: 8px 0;
}

.icon {
    margin-bottom: -5px;
}

.avatar-img{
    background-size: contain!important;
}

.detail {
    z-index: 10;
    padding: 0px;
    height: 0px;
    font-size: 12px;
    overflow: hidden;
    background: rgb(24, 24, 24);
    border-radius: 10px;
    pointer-events: none;
}

.bubble:hover .detail {
    padding: 10px;
    height: auto;
    overflow: visible;

}

.button {
    pointer-events: initial;
}

.production {
    font-size: 12px;
    color: #fbbd08;
    pointer-events: none;
}

.busername {
  font-family: @heading-font;
  font-size: 26px;
  text-transform: uppercase;
  transform: translate(-50%,-50%) skew(-24deg) rotate(-10deg);
  top: 0px;
  width: 200px;
  left:50%;
  text-align: center;
  margin: 0;
  line-height: 0px;
  position: relative;
  text-rendering: optimizeLegibility;
  font-weight: 900;
  color: #db2828;
  text-shadow: 1px 4px 6px #000, 0 0 0 #0b0b0b, 1px 4px 6px #101010;
  white-space: nowrap;
}
.gang-label{
  margin-top:5px;
}
</style>
