<template>
  <ul class="balances list-style-none">
    <li>
         <Icon name="drug" size="36"/>
         <div class="balance">
        <div :class="{ 'text-red': balances.drugs >= HQ.drug_storage }">
          {{ balances.drugs | amount }} <span class="mini"> DRUGS</span>
        </div>
        <div class="detail">
        +{{ HQ.drug_production_rate * 60 * 60 * 24 | amount}}<span class="text-orange" v-if="drugBonus"> +{{drugBonus | amount}}</span>/DAY
        </div>
                <div class="detail">
         <span class="text-green">{{HQ.drug_storage/100*25 | amount}}</span> /SAFE
        </div>
        </div>
    </li>
    <li>
      <Icon name="weapon" size="36"/>
       <div class="balance">
        <div :class="{ 'text-red': balances.weapons >= HQ.weapon_storage }">
          {{ balances.weapons | amount }} <span class="mini"> WEAPONS</span>
        </div>
          <div class="detail">
           +{{ HQ.weapon_production_rate * 60 * 60 * 24 | amount}} <span class="text-orange" v-if="weaponBonus">+{{weaponBonus | amount}}</span>/DAY                  
        </div>
                        <div class="detail">
         <span class="text-green">{{HQ.weapon_storage/100*25 | amount}}</span> /SAFE
        </div>
        </div>
    </li>
    <li>
       <Icon name="alcohol" size="36"/>
        <div class="balance">
        <div :class="{ 'text-red': balances.alcohols >= HQ.alcohol_storage }">
          {{ balances.alcohols | amount }}<span class="mini"> ALCOHOL</span>
        </div>
            <div class="detail">
            +{{ HQ.alcohol_production_rate * 60 * 60 * 24 | amount}} <span class="text-orange" v-if="alcoholBonus">+{{alcoholBonus | amount}}</span>/DAY
        </div>
                                <div class="detail">
          <span class="text-green">{{HQ.alcohol_storage/100*25 | amount}}</span> /SAFE
        </div>
         </div>
    </li>
    <li>
      <Icon name="future" size="36"/>
        <div class="balance">
        <div>{{ user.future - user.future_pending | amount}} <span class="mini"> FUTURE</span></div>
          <div class="balance">
         <div class="detail"> DAILY: <span class="detail text-green">
        +{{ Math.round(totalRewards.daily)}} FUTURE</span></div>
                 <div class="detail"> HEIST: <span class="detail text-green">
        +{{ Math.round(ownHeistReward.amount)}} FUTURE</span></div>
         </div>
            <div class="sync text-left" v-if="user.future_pending">Synchronizing...</div>
         </div>
    </li>
     <li v-if="this.$store.state.auth.account">
      <Icon  name="steem" size="36"/>
        <div class="balance">
        <div >{{ steemBalance | amount}} <span class="mini"> STEEM</span></div>
         </div>
    </li>
  </ul>
</template>

<script>
import { getBalances } from '@/helpers/utils';

export default {
  computed: {
    timeToWait() {
      const midnight = new Date().setUTCHours(24, 0, 0, 0);
      return midnight - this.$store.state.ui.timestamp;
    },
    prizeProps() {
      return this.$store.state.game.prizeProps;
    },
    total() {
      const prizePops = this.$store.state.game.prizeProps;
      return (
        ((parseFloat(prizePops.balance) * prizePops.steemprice) / 100) *
        (prizePops.daily_percent + prizePops.heist_percent)
      );
    },
    totalDailyFuture() {
      const prizePops = this.$store.state.game.prizeProps;
      return (
        (((parseFloat(prizePops.balance) * prizePops.steemprice) / 100) * prizePops.daily_percent) /
        0.005
      );
    },
    futureToSteem() {
      const { prizeProps } = this.$store.state.game;
      return parseFloat(prizeProps.total_future / parseFloat(prizeProps.balance)).toFixed(0);
    },
    user() {
      return this.$store.state.game.user.user;
    },
    user_production() {
      const all_hq = this.$store.state.game.user.buildings.filter(b=> b.building === "headquarters")
      let production = 0;
      all_hq.forEach(element => {
        if(element.drug_production_rate)
        production = production + element.drug_production_rate
      });
      return production
    },
    base() {
      return this.$store.state.game.mainbase;
    },
    HQ() {
      if (
        this.base &&
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'headquarters' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        )
      ) {
        return this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'headquarters' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        );
      }
      return { drug_balance: 0 };
    },
    balances() {
      let ocLvl = 0;
      if (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        )
      )
        ocLvl = this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        ).lvl;
      let labLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'scientific_lab'))
        labLvl = this.$store.state.game.gang_buildings.find(b => b.building === 'scientific_lab')
          .lvl;
      let weaponLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'weapon_center'))
        weaponLvl = this.$store.state.game.gang_buildings.find(b => b.building === 'weapon_center')
          .lvl;
      let distilleryLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'distillery_school'))
        distilleryLvl = this.$store.state.game.gang_buildings.find(
          b => b.building === 'distillery_school',
        ).lvl;
      return getBalances(
        this.HQ,
        ocLvl,
        labLvl,
        weaponLvl,
        distilleryLvl,
        this.$store.state.ui.timestamp,
      );
    },
    dailyRewards() {
      const { prizeProps } = this.$store.state.game;
      return parseFloat(prizeProps.daily_rewards) || 0;
    },
    totalVest() {
      return this.$store.state.game.user.heist[0] ? this.$store.state.game.user.heist[0].drugs : 0;
    },
    totalReward() {
      return (parseFloat(this.prizeProps.balance) / 100) * this.prizeProps.heist_percent;
    },
    totalRewards() {
      const daily = parseFloat(
        (this.user_production / this.prizeProps.drug_production_rate) *
          this.totalDailyFuture,
      ).toFixed(3);
      return { daily };
    },
    totalHeistFuture() {
      const { prizeProps } = this.$store.state.game;
      return (
        (((parseFloat(prizeProps.balance) * prizeProps.steemprice) / 100) *
          prizeProps.heist_percent) /
        0.005
      );
    },
    ownHeistReward() {
      const percent = (100 / this.prizeProps.heist_pool) * this.totalVest;
      const amount = (this.totalHeistFuture / 100) * percent;
      return {
        amount,
        percent,
      };
    },
    steemBalance() {
      if (this.$store.state.auth.account)
        return parseFloat(this.$store.state.auth.account.balance).toFixed(3) || 0;
      return 0;
    },
    sbdBalance() {
      if (this.$store.state.auth.account)
        return parseFloat(this.$store.state.auth.account.sbd_balance).toFixed(3) || 0;
      return 0;
    },
    futureBalance() {
      return parseFloat(this.$store.state.game.user.future).toFixed(3);
    },
    drugBonus() {
      let oc = 0;
      if (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        )
      )
        oc = this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        ).lvl;
      let labLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'scientific_lab'))
        labLvl = this.$store.state.game.gang_buildings.find(b => b.building === 'scientific_lab')
          .lvl;
      return (
        this.user.drug_production_rate * 60 * 60 * 24 * oc * 0.005 +
        this.user.drug_production_rate * 60 * 60 * 24 * labLvl * 0.0025
      );
    },
    weaponBonus() {
      let oc = 0;
      if (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        )
      )
        oc = this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        ).lvl;
      let weaponLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'weapon_center'))
        weaponLvl = this.$store.state.game.gang_buildings.find(b => b.building === 'weapon_center')
          .lvl;
      return (
        this.user.weapon_production_rate * 60 * 60 * 24 * oc * 0.005 +
        this.user.weapon_production_rate * 60 * 60 * 24 * weaponLvl * 0.005
      );
    },
    alcoholBonus() {
      let oc = 0;
      if (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        )
      )
        oc = this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        ).lvl;
      let distilleryLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'distillery_school'))
        distilleryLvl = this.$store.state.game.gang_buildings.find(
          b => b.building === 'distillery_school',
        ).lvl;
      return (
        this.user.alcohol_production_rate * 60 * 60 * 24 * oc * 0.005 +
        this.user.alcohol_production_rate * 60 * 60 * 24 * distilleryLvl * 0.005
      );
    },
  },
};
</script>

<style scoped lang="less">
@import '../vars.less';
.sync {
  margin-top: -8px !important;
  font-size: 12px;
}
.balances {
  color: white;
  font-size: 26px;
  font-weight: 500;
  display: inline-flex;
  line-height: 22px;
  font-family: @heading-font;
  text-align: left !important;
  li {
    padding: 0px;
    margin-top: 5px;
    margin-left: 5px;
    border-left: 1px rgb(10, 10, 10) solid;
    border-right: 1px rgb(10, 10, 10) solid;
    .balance {
      float: right;
      text-align: right;
    }
    span {
      float: right;
      line-height: 42px;
    }
    .text-gray {
      font-size: 16px;
    }
    .detail {
      font-size: 13px;
      line-height: 13px !important;
      text-align: left;
      span {
        float: none;
        line-height: 13px !important;
      }
    }
    .icon {
      font-size: 32px;
      line-height: 32px;
      margin-right: 10px;
      font-weight: 100;
    }
  }
  .mini {
    font-size: 12px;
    margin-top: -20px;
    text-align: left;
  }
}
@media screen and (min-width: 200px) and (max-width: 669px) {
  .balances {
    display: flex;
    font-size: 16px !important;
    margin-top: 6px !important;
    line-height: 12px !important;
    li {
      padding: 5px;
      padding-top: 0px;
      border-left: 1px rgb(10, 10, 10) solid;
      border-right: 1px rgb(10, 10, 10) solid;
      .balance {
        float: right;
        text-align: left;
      }
      span {
        float: right;
        line-height: 42px;
      }
      .text-gray {
        font-size: 4px;
      }
      .detail {
        margin: 0px;
        display: -webkit-inline-box;
        line-height: 4px !important;
        font-size: 8px;
      }
    }
    .mini {
      text-align: left;
      position: absolute;
      font-size: 6px;
      margin-top: -18px;
    }
    .icon {
      display: none;
      float: left;
      width: 16px;
      height: 16px;
    }
  }
}
@media screen and (min-width: 670px) and (max-width: 1119px) {
  .balances {
    display: inline-flex;
    font-size: 20px !important;
    line-height: 14px !important;
    margin: 0px;
    li {
      padding: 0px;
      margin-top: 15px;
      margin-left: 5px;
      border-left: 1px rgb(10, 10, 10) solid;
      border-right: 1px rgb(10, 10, 10) solid;
      .balance {
        float: right;
        text-align: left;
      }
      span {
        float: right;
        line-height: 42px;
        min-width: 50px;
      }
      .text-gray {
        font-size: 6px;
      }
      .detail {
        font-size: 9px;
      }
    }
    .mini {
      font-size: 11px;
      margin-top: -20px;
      text-align: left;
      position: absolute;
    }
    .icon {
      float: left;
      font-weight: 100;
      width: 24px;
      height: 24px;
      margin-right: 5px;
    }
  }
}
</style>
