<template>
    <div>
        <CardsTabs/>
        <div>
            <div class="text-center mt-3 mb-6">
                <button class="button" @click="chooseCardType('all')" :class="{ 'button-yellow' : card_type ==='all' }">ALL</button>
                <button class="button ml-1" @click="chooseCardType('units')" :class="{ 'button-yellow' : card_type ==='units' }">UNITS</button>
                <button disabled class="button ml-1" @click="chooseCardType('buildings')" :class="{ 'button-yellow' : card_type ==='buildings' }">BUILDINGS</button>
                <button disabled class="button ml-1" @click="chooseCardType('training')" :class="{ 'button-yellow' : card_type ==='training' }">TRAINING</button>
                <button disabled class="button ml-1" @click="chooseCardType('heroes')" :class="{ 'button-yellow' : card_type ==='heroes' }">HEROES</button>
                <button disabled class="button ml-1" @click="chooseCardType('consumables')" :class="{ 'button-yellow' : card_type ==='consumables' }">CONSUMABLES</button>
            </div>
            <Loading v-if="loading" />
                <div class="card-box">
          <div :id="card.hid+'-card'" v-if="card.hid" v-for="card in cards" :key="card.hid" :class="'card q1'">
            <Card :card="card"/>
          </div>
        </div>
        </div>
    </div>
</template>

<script>
import { buildings, units, trainings } from 'drugwars';
import { filter, pickBy } from 'lodash';
import { setTimeout } from 'timers';
import heroes from '@/heroes.json';
/* eslint-disable */

export default {
  data() {
    return {
      card_type: 'all',
      error: null,
      details: false,
      json: null,
      loading: null,
      log: [],
      result: {},
      cards: [],
      newcards: [],
    };
  },
  created() {
    const self = this;
    self.cards = [];
    self.newcards = [];
    const b = filter(pickBy(buildings));
    const u = filter(pickBy(units));
    const t = filter(pickBy(trainings));

    u.forEach(element => {
      element.ctype = 'unit';
      element.owned = true;
      if (!element.npc) 
      self.newcards.push(element);
    });

      self.handleSubmit();
          //       document.addEventListener(
          //   "mousemove",
          //   function (event) {
          //     self.rotate(event);
          //   },
          //   false
          // );
  },
  methods: {
    handleSubmit() {
      const self = this;
      self.loading = true;

      this.newcards.forEach(card => {
          if(card.id)
          card.hid = card.id;
          else card.hid = card.name;

          card.suffixe = '';
          card.prefixe = '';

          card.bg = 'prison'
          if(card.skill&&card.skill.type)
          card.active = card.skill.type
          if(card.feature&&card.feature.split(':')[1])
          card.active_desc = card.feature.split(':')[1]
          else
          card.active_desc = card.feature
          if(card.active_skills)
          for (var i = 0; i < card.active_skills.values.length; i++) {
            var value = "$$value" + [i + 1] + "$$"
            card.active_desc = card.active_desc.replace(value, '<span style="color:red;font-weight:900;font-size: 11px;">' + card.active_skills.values[i] + '</span>');
          }
          //card.passive = drugwars.Cards.passives[card.family].find(element => element.id === card.passive_skills.id).name
          //card.passive_desc = drugwars.Cards.passives[card.family].find(element => element.id === card.passive_skills.id).description
          if(card.passive_skills)
          for (var i = 0; i < card.passive_skills.values.length; i++) {
            var value = "$$value" + [i + 1] + "$$"
            card.passive_desc = card.passive_desc.replace(value, '<span style="color:red;font-weight:900;font-size: 11px;">' + card.passive_skills.values[i] + '</span>');
          }
          console.log(card)
          self.cards.push(card)
      })
      self.loading = false;
      self.newcards = [];
    },
    chooseCardType(value) {
      this.card_type = value;
      const self = this;
      self.cards = [];
      self.newcards = [];
      // self.handleSubmit()
      self.loading = true;
      // if (self.card_type === 'all' || self.card_type === 'buildings') {
      //   const b = filter(pickBy(buildings));
      //   b.forEach(element => {
      //     element.ctype = 'buildings';
      //     element.owned = true;
      //     self.cards.push(element);
      //   });
      // }
      if (self.card_type === 'all' || self.card_type === 'units') {
        const u = filter(pickBy(units));
        u.forEach(element => {
          const unit = element;
          unit.ctype = 'unit';
          unit.owned = true;
          if (!unit.npc) self.newcards.push(unit);
        });
      }
      if (self.card_type === 'heroes') {
        const h = filter(pickBy(heroes));
        h.forEach(element => {
          const hero = element;
          hero.ctype = 'hero';
          hero.owned = false;
          self.newcards.push(hero);
        });
      }
      // if (self.card_type === 'all' || self.card_type === 'training') {
      //   const t = filter(pickBy(trainings));
      //   t.forEach(element => {
      //     element.ctype = 'training';
      //     element.owned = true;
      //     self.cards.push(element);
      //   });
      // }
      // const generator = new CardPack(5);
      self.loading = false;
      setTimeout(() => {
        self.handleSubmit();
      }, 2000);
    },
    
  },
};
</script>



<style lang="less" scoped>
[v-cloak] {
  display: none;
}

  
    .card-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
    }

    .card-box .card {
      position: relative;
      height: 295px;
      width: 220px;
      margin: 10px;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      cursor: pointer;
      background-color: transparent;
      background-size: contain;
    }
</style>

