<template>
  <ul class="balances list-style-none">
    <li :class="{ 'text-yellow': booster }">
      <Icon name="drug" size="36" />
      <div class="balance">
        <div :class="{ 'text-red': balances.drugs >= cap.drug_storage }">
          {{ balances.drugs | amount }} <span class="mini"> {{ 'message.drugs' | translate }}</span>
        </div>
        <div class="detail">
          {{ (production.drug_production_rate * 60 * 60 * 24 * 2) | amount }}+<span
            class="text-orange"
            v-if="drugBonus"
          >
            {{ (drugBonus * 2) | amount }}</span
          >/DAY
        </div>
        <div class="detail">
          <span class="text-green">{{ ((cap.drug_storage / 100) * 20) | amount }}</span
          >/SAFE
        </div>
      </div>
    </li>
    <li :class="{ 'text-yellow': booster }">
      <Icon name="weapon" size="36" />
      <div class="balance">
        <div :class="{ 'text-red': balances.weapons >= cap.weapon_storage }">
          {{ balances.weapons | amount }}
          <span class="mini"> {{ 'message.weapons' | translate }}</span>
        </div>
        <div class="detail">
          {{ (production.weapon_production_rate * 60 * 60 * 24) | amount }}+<span
            class="text-orange"
            v-if="weaponBonus"
            >{{ weaponBonus | amount }}</span
          >/DAY
        </div>
        <div class="detail">
          <span class="text-green">{{ ((cap.weapon_storage / 100) * 20) | amount }}</span
          >/SAFE
        </div>
      </div>
    </li>
    <li :class="{ 'text-yellow': booster }">
      <Icon name="alcohol" size="36" />
      <div class="balance">
        <div :class="{ 'text-red': balances.alcohols >= cap.alcohol_storage }">
          {{ balances.alcohols | amount
          }}<span class="mini"> {{ 'message.alcohol' | translate }}</span>
        </div>
        <div class="detail">
          {{ (production.alcohol_production_rate * 60 * 60 * 24) | amount }}+<span
            class="text-orange"
            v-if="alcoholBonus"
            >{{ alcoholBonus | amount }}</span
          >/DAY
        </div>
        <div class="detail">
          <span class="text-green">{{ ((cap.alcohol_storage / 100) * 20) | amount }}</span
          >/SAFE
        </div>
      </div>
    </li>
    <li>
      <Icon name="dwd" size="36" />
      <div class="balance">
        <div>{{ user.dwd }} <span class="mini"> DWD</span></div>
        <div class="balance">
          <div class="detail">
            DAILY: <span class="detail text-green"> +{{ totalRewards.daily }} </span>
          </div>
          <div class="detail">
            HEIST: <span class="detail text-green"> +{{ ownHeistReward.amount }} </span>
          </div>
        </div>
      </div>
    </li>
    <li class="steembalance" v-if="this.$store.state.auth.account">
      <Icon name="steem" size="36" />
      <div class="balance">
        <div>{{ steemBalance | amount }} <span class="mini"> STEEM</span></div>
      </div>
    </li>
  </ul>
</template>

<script>
import { getBalances, getCapPerBase, getProdPerBase } from '@/helpers/utils';
import { buildings } from 'drugwars';

export default {
  computed: {
    prizeProps() {
      return this.$store.state.game.prizeProps;
    },

    totalDailyDWD() {
      const prizePops = this.$store.state.game.prizeProps;
      return prizePops.daily_percent;
    },
    dwdToSteem() {
      const { prizeProps } = this.$store.state.game;
      return parseFloat(prizeProps.total_dwd / parseFloat(prizeProps.balance)).toFixed(0);
    },
    user() {
      return this.$store.state.game.user.user;
    },
    cap() {
      return getCapPerBase(this.base);
    },
    production() {
      return getProdPerBase(this.base);
    },
    userTotalDrugProduction() {
      const allHQ = this.$store.state.game.bases;
      let production = 0;
      allHQ.forEach((hq) => {
        if (hq.buildings.length > 0) {
          hq.buildings.forEach((element) => {
            if (buildings[element.name] && buildings[element.name].production_type === 'drugs') {
              production +=
                buildings[element.name].production_rate *
                  element.level *
                  buildings[element.name].coeff +
                ((buildings[element.name].production_rate *
                  element.level *
                  buildings[element.name].coeff) /
                  100) *
                  element.level;
            }
          });
        }
      });
      return production;
    },
    base() {
      return this.$store.state.game.selectedBase || [];
    },
    booster() {
      const date = new Date().getTime() / 1000;
      return Number(this.$store.state.game.user.user.booster) > date;
    },
    balances() {
      let ocLvl = 0;
      if ( this.base && 
        this.base.buildings.find((b) => b.name === 'operation_center')
      ) {
        ocLvl =
          this.base.buildings.find((b) => b.name === 'operation_center')
            .lvl || 0;
      }
      let labLvl = 0;
      if (this.$store.state.game.gang_buildings.find((b) => b.name === 'scientific_lab'))
        labLvl = this.$store.state.game.gang_buildings.find((b) => b.name === 'scientific_lab').lvl;
      let weaponLvl = 0;
      if (this.$store.state.game.gang_buildings.find((b) => b.name === 'weapon_center'))
        weaponLvl = this.$store.state.game.gang_buildings.find((b) => b.name === 'weapon_center')
          .lvl;
      let distilleryLvl = 0;
      if (this.$store.state.game.gang_buildings.find((b) => b.name === 'distillery_school'))
        distilleryLvl = this.$store.state.game.gang_buildings.find(
          (b) => b.name === 'distillery_school',
        ).lvl;
      return getBalances(
        this.base,
        ocLvl,
        labLvl,
        weaponLvl,
        distilleryLvl,
        this.$store.state.ui.timestamp,
      );
    },
    totalVest() {
      return this.$store.state.game.user.heist[0] ? this.$store.state.game.user.heist[0].drugs : 0;
    },
    totalRewards() {
      const daily = parseFloat(
        (this.userTotalDrugProduction / this.prizeProps.drug_production_rate) * this.totalDailyDWD,
      ).toFixed(3);
      return { daily };
    },
    totalHeistDWD() {
      const { prizeProps } = this.$store.state.game;
      return prizeProps.heist_percent;
    },
    ownHeistReward() {
      const percent = (100 / this.prizeProps.heist_pool) * this.totalVest;
      const amount = parseFloat((this.totalHeistDWD / 100) * percent).toFixed(3);
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
    dwdBalance() {
      return parseFloat(this.$store.state.game.user.dwd).toFixed(3);
    },
    drugBonus() {
      let oc = 0;
      if (this.base.buildings.find((b) => b.name === 'operation_center'))
        oc = this.base.buildings.find((b) => b.name === 'operation_center').lvl;
      let labLvl = 0;
      if (this.$store.state.game.gang_buildings.find((b) => b.name === 'scientific_lab'))
        labLvl = this.$store.state.game.gang_buildings.find((b) => b.name === 'scientific_lab').lvl;

      return parseFloat(
        this.production.drug_production_rate * 60 * 60 * 24 * oc * 0.005 +
          this.production.drug_production_rate * 60 * 60 * 24 * labLvl * 0.0025,
      ).toFixed(2);
    },
    weaponBonus() {
      let oc = 0;
      if (this.base.buildings.find((b) => b.name === 'operation_center'))
        oc = this.base.buildings.find((b) => b.name === 'operation_center').lvl;
      let weaponLvl = 0;
      if (this.$store.state.game.gang_buildings.find((b) => b.name === 'weapon_center'))
        weaponLvl = this.$store.state.game.gang_buildings.find((b) => b.name === 'weapon_center')
          .lvl;
      return parseFloat(
        this.production.weapon_production_rate * 60 * 60 * 24 * oc * 0.005 +
          this.production.weapon_production_rate * 60 * 60 * 24 * weaponLvl * 0.005,
      ).toFixed(2);
    },
    alcoholBonus() {
      let oc = 0;
      if (this.base.buildings.find((b) => b.name === 'operation_center'))
        oc = this.base.buildings.find((b) => b.name === 'operation_center').lvl;
      let distilleryLvl = 0;
      if (this.$store.state.game.gang_buildings.find((b) => b.name === 'distillery_school'))
        distilleryLvl = this.$store.state.game.gang_buildings.find(
          (b) => b.name === 'distillery_school',
        ).lvl;
      return parseFloat(
        this.production.alcohol_production_rate * 60 * 60 * 24 * oc * 0.005 +
          this.production.alcohol_production_rate * 60 * 60 * 24 * distilleryLvl * 0.005,
      ).toFixed(2);
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
.steembalance {
  display: initial;
}
.balances {
  color: white;
  font-size: 25px;
  font-weight: 500;
  display: inline-flex;
  line-height: 22px;
  font-family: @heading-font;
  text-align: left !important;
  li {
    padding: 0px;
    margin-top: 5px;
    margin-left: 5px;
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
      font-size: 12px;
      line-height: 12px !important;
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
  .steembalance {
    display: none;
  }
  .balances {
    display: flex;
    font-size: 16px !important;
    margin-top: 0px !important;
    line-height: 10px !important;
    li {
      padding-left: 5px;
      padding-right: 5px;
      padding-top: 8px;
      margin-left: 0px;
      margin-right: 0px;

      .balance {
        float: right;
        text-align: left;
        margin-left: 5px;
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
        font-size: 7px;
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
  .steembalance {
    display: none;
  }
  .balances {
    display: inline-flex;
    font-size: 20px !important;
    line-height: 14px !important;
    margin: 0px;
    li {
      padding: 0px;
      margin-top: 15px;
      margin-left: 5px;
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
