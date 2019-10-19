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
          <div :id="card.hid+'-card'" v-if="card.hid" v-for="card in cards" :key="card.hid"
            :class="'card q1'">
            <div class="card-shine" :id="card.hid+'-card-shine'"></div>
            <div :class="'sa-position sa-1 s1'" :id="card.hid+'-spin'"></div>
            <div :class="'sa-position sa-2 s1'" :id="card.hid+'-spin'"></div>
            <div :class="'sa-position sa-3 s1'" :id="card.hid+'-spin'"></div>
            <div :class="'sa-position sa-4 s1'" :id="card.hid+'-spin'"></div>
            <img  src="https://img.drugwars.io/cards/background/classic_unit1.png" alt="image host"
              :id="card.hid+'-card-back'" class="card-back" />
            <div :id="card.hid+'-card-front'" class="card-front">
              <!-- <img class="layer layer0" :src="'https://img.drugwars.io/cards/background/'+card.dmg_type+'.png'"
                data-depth="16" /> -->
              <!-- <img class="layer layer1 shadowv" :src="'https://img.drugwars.io/cards/heroes/'+hero+'.png'"
                data-depth="4" />
              <img class="layer layer2 shadowr" :src="'https://img.drugwars.io/cards/heroes/'+hero+'.png'"
                data-depth="6" /> -->
              <!-- <img class="layer layer3" :src="'https://img.drugwars.io/cards/heroes/'+hero+'.png'" data-depth="6" /> -->
              <img class="layer layer4" v-if="card.hero" :src="'https://img.drugwars.io/cards/heroes/'+card.hero+'.png'" data-depth="2" />
               <img class="layer layer4" v-else :src="'https://img.drugwars.io/cards/units/'+card.id+'.png'" data-depth="2" />
              <img class="layer layer5 attack_type" :src="'https://img.drugwars.io/cards/attack_type/'+card.dmg_type+'.png'" data-depth="0" />
              <img class="layer layer7" :src="'https://img.drugwars.io/cards/frames/black.png'" data-depth="0" />
              <img class="layer layer8" v-if="card.quality" :src="'https://img.drugwars.io/cards/fx/'+card.quality+'.png'" data-depth="0" />
              <img class="layer layer8" v-else :src="'https://img.drugwars.io/cards/fx/1.png'" data-depth="0" />
              <div class="text layer9" data-depth="0">
                <img v-if="card.flag" class="flag" :src="'https://img.drugwars.io/flags/'+card.flag+'.png'" />
                <div class="name">
                  <span v-if="card.prefixe">{{card.prefixe}}</span> 
                   <span v-if="card.hero">{card.{hero}}</span>
                    <span v-if="card.name">{{card.name}}</span>
                   <span v-if="card.suffixe"> {{card.suffixe}}</span>
                </div>
                <span class="skill">
                  ACTIVE
                </span>
                <span class="skill_name">{{card.active}}</span>
                <div class="skill_desc" v-html="card.active_desc">
                </div>
                <span class="skill" v-if="card.passive">
                  PASSIVE
                </span>
                <span class="skill_name"  v-if="card.passive">{{card.passive}}</span>
                <div class="skill_desc" v-html="card.passive_desc">
                </div>
                 <span class="skill" v-if="card.desc">
                  DESCRIPTION
                </span>
                <div class="skill_desc" v-html="card.desc">
                </div>
              </div>
              <div class="properties layer10" data-depth="0">
                <div class="lvl mb-3">
                  X1
                </div>
                <span class="skill">
                    ATTACK
                </span>
                <div class="skill_name">{{card.attack}}</div>
                <span class="skill">
                    HEALTH
                </span>
                <div class="skill_name">{{card.health}}</div>
                <span class="skill">
                    SPEED
                </span>
                <div class="skill_name">{{card.speed}}</div>
                <span class="skill">
                    CARRY
                </span>
                <div class="skill_name">{{card.capacity}}</div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </div>
</template>

<script>
import { buildings, units, trainings } from 'drugwars';
import { filter, pickBy } from 'lodash';
import { setTimeout } from 'timers';
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
      element.ctype = 'units';
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
          card.hid = card.id;
          card.suffixe = '';
          card.prefixe = '';

          card.bg = 'prison'

          card.active = card.skill.type
          if(card.feature.split(':')[1])
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
          unit.ctype = 'units';
          unit.owned = true;
          if (!unit.npc) self.newcards.push(unit);
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
              rotate: function (event) {
            if (!this.animate || this.count === 5) {
              const self = this;
              var x = event.clientX;
              var y = event.clientY;
              var w = window.innerWidth;
              var h = window.innerHeight;
              var midpointX = w / 2;
              var midpointY = h / 2;
              var ypos = x - midpointX;
              var xpos = y - midpointY;
              var yval = ypos / midpointX * 20;
              var xval = xpos / midpointY * 20;

              self.cards.forEach(card => {
                var images = document.getElementsByClassName("layer");
                var card = document.getElementById(card.hid + '-card');
                card.style.transform =
                  "perspective(550px) rotateY(" + yval/2 + "deg) rotateX(" + xval/2 + "deg)";

                for (var i = 1; i < images.length; ++i) {
                  var myImg = images[i];
                  myImg.style =
                    "transform: perspective(550px) translateZ(" +
                    myImg.getAttribute("data-depth") / myImg.clientHeight * 2000 +
                    "px); left: " +
                    yval * myImg.getAttribute("data-depth") * -1 / 20 +
                    "%; top: " +
                    xval * myImg.getAttribute("data-depth") / 20 +
                    "%;";
                }
              })
            }
          },
  },
};
</script>



<style lang="less" scoped>
[v-cloak] {
  display: none;
}

    .ac {
      font-family: 'American Captain', Verdana, Tahoma;
    }

    .le {
      font-family: 'Legend', Verdana, Tahoma;
    }

    .card {
      border: 0px;
      border-radius: 20px !important;
      color: white;
    }

    .cards {
      background-color: transparent;
      font-family: 'American Captain', Verdana, Tahoma;
    }

    .uppercase {
      text-transform: uppercase;
    }

    .minip {
      width: 24px;
    }

    .result {
      background-color: black;
      border-radius: 5px;
      border: 2px solid #ffc400;
    }

    .unitname {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      text-align: center;
    }



  .card {
      border: 0px;
      border-radius: 20px !important;
    }

    .cards {
      background-color: transparent;
      font-family: 'American Captain', Verdana, Tahoma;
    }

    .uppercase {
      text-transform: uppercase;
    }

    .minip {
      width: 24px;
    }

    .result {
      background-color: black;
      border-radius: 5px;
      border: 2px solid #ffc400;
    }

    .unitname {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      text-align: center;
    }


    input {
      min-height: 16px !important;
      padding: 0px 8px !important;
    }



    @keyframes cardback {
      from {
        transform: rotateY(0);
      }

      to {
        transform: rotateY(90deg);
      }
    }

    @keyframes cardfront {
      from {
        transform: rotateY(90deg);
      }

      to {
        transform: rotateY(0);
      }
    }

    @keyframes cardshake {
      from {
        transform: translate(-0.6px, -0.6px);
      }

      0% {
        transform: translate(0.6px, 0.6px);
      }

      20% {
        transform: translate(-0.6px, -20px);
      }

      40% {
        transform: translate(0.6px, -0.6px);
      }

      60% {
        transform: translate(-0.6px, 0.6px);
      }

      80% {
        transform: translate(0.6px, -0.6px);
      }

      100% {
        transform: translate(-0.6px, -0.6px);
      }

      to {
        transform: translate(0, 0);
      }
    }

    @keyframes hoverscale {
      from {
        transform: translate(0);
      }

      to {
        transform: translate(1.6);
      }
    }

    @-moz-keyframes spin0 {
      to {
        transform: rotateZ(0deg);
      }

      from {
        transform: rotateZ(360deg);
      }
    }

    @-webkit-keyframes spin0 {
      to {
        transform: rotateZ(0deg);
      }

      from {
        transform: rotateZ(360deg);
      }
    }

    @keyframes spin0 {
      to {
        transform: rotateZ(0deg);
      }

      from {
        transform: rotateZ(360deg);
      }
    }

    @-moz-keyframes spin1 {
      to {
        transform: rotateZ(45deg);
      }

      from {
        transform: rotateZ(405deg);
      }
    }

    @-webkit-keyframes spin1 {
      to {
        transform: rotateZ(45deg);
      }

      from {
        transform: rotateZ(405deg);
      }
    }

    @keyframes spin1 {
      to {
        transform: rotateZ(45deg);
      }

      from {
        transform: rotateZ(405deg);
      }
    }

    @-moz-keyframes spin2 {
      to {
        transform: rotateZ(90deg);
      }

      from {
        transform: rotateZ(450deg);
      }
    }

    @-webkit-keyframes spin2 {
      to {
        transform: rotateZ(90deg);
      }

      from {
        transform: rotateZ(450deg);
      }
    }

    @keyframes spin2 {
      to {
        transform: rotateZ(90deg);
      }

      from {
        transform: rotateZ(450deg);
      }
    }

    @-moz-keyframes spin3 {
      to {
        transform: rotateZ(135deg);
      }

      from {
        transform: rotateZ(495deg);
      }
    }

    @-webkit-keyframes spin3 {
      to {
        transform: rotateZ(135deg);
      }

      from {
        transform: rotateZ(495deg);
      }
    }

    @keyframes spin3 {
      to {
        transform: rotateZ(135deg);
      }

      from {
        transform: rotateZ(495deg);
      }
    }

    @-moz-keyframes spin4 {
      to {
        transform: rotateZ(180deg);
      }

      from {
        transform: rotateZ(540deg);
      }
    }

    @-webkit-keyframes spin4 {
      to {
        transform: rotateZ(180deg);
      }

      from {
        transform: rotateZ(540deg);
      }
    }

    @keyframes spin4 {
      to {
        transform: rotateZ(180deg);
      }

      from {
        transform: rotateZ(540deg);
      }
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

    .q5 {
      box-shadow: 0px 0px 60px 6px rgba(8, 218, 255, 0.3) !important;
    }

    .q4 {
      box-shadow: 0px 0px 60px 6px rgba(255, 119, 8, 0.3) !important;
    }

    .q3 {
      box-shadow: 0px 0px 60px 6px rgba(226, 8, 255, 0.3) !important;
    }

    .q2 {
      box-shadow: 0px 0px 60px 6px rgba(66, 255, 8, 0.3) !important;
    }

    .q1 {
      box-shadow: 0px 0px 60px 6px rgba(255, 196, 8, 0.3) !important;
    }

    .card-box .card .sa-1 {
      width: 200%;
      height: 60px;
      transform-style: preserve-3d;
      animation: spin1 10s linear infinite;
      transform: rotateX(10deg) rotateZ(45deg);
    }

    .s5 {
      background-image: radial-gradient(circle at center,
          rgba(27, 255, 217, 0),
          rgba(27, 255, 236, 0.2) 35%,
          rgba(27, 240, 255, 0.05) 50%,
          rgba(27, 255, 225, 0.025) 65%,
          rgba(27, 255, 187, 0) 80%,
          rgba(27, 247, 255, 0) 90%,
          rgba(27, 255, 244, 0) 100%);
    }

    .s4 {
      background-image: radial-gradient(circle at center,
          rgba(255, 164, 27, 0),
          rgba(255, 175, 27, 0.2) 35%,
          rgba(255, 175, 27, 0.05) 50%,
          rgba(255, 164, 27, 0.025) 65%,
          rgba(255, 156, 27, 0) 80%,
          rgba(255, 156, 27, 0) 90%,
          rgba(255, 149, 27, 0) 100%);
    }

    .s3 {
      background-image: radial-gradient(circle at center,
          rgba(255, 27, 255, 0),
          rgba(255, 27, 236, 0.2) 35%,
          rgba(236, 27, 255, 0.05) 50%,
          rgba(255, 27, 255, 0.025) 65%,
          rgba(255, 27, 244, 0) 80%,
          rgba(255, 27, 236, 0) 90%,
          rgba(255, 27, 244, 0) 100%);
    }

    .s2 {
      background-image: radial-gradient(circle at center,
          rgba(92, 255, 27, 0),
          rgba(65, 255, 27, 0.2) 35%,
          rgba(92, 255, 27, 0.05) 50%,
          rgba(73, 255, 27, 0.025) 65%,
          rgba(54, 255, 27, 0) 80%,
          rgba(73, 255, 27, 0) 90%,
          rgba(99, 255, 27, 0) 100%);
    }

    .s1 {
      background-image: radial-gradient(circle at center,
          rgba(255, 177, 27, 0),
          rgba(255, 177, 27, 0.2) 35%,
          rgba(255, 177, 27, 0.05) 50%,
          rgba(255, 177, 27, 0.025) 65%,
          rgba(255, 177, 27, 0) 80%,
          rgba(255, 177, 27, 0) 90%,
          rgba(255, 177, 27, 0) 100%);
    }

    .card-box .card:hover {
      animation-duration: 0.5s;
      animation-iteration-count: 1;
      transform: scale(1.1, 1.1);
      z-index: 50;
    }

    .card-box .card:nth-of-type(1) {
      animation-duration: 2.15s;
    }

    .card-box .card:nth-of-type(2) {
      animation-duration: 2.35s;
    }

    .card-box .card:nth-of-type(3) {
      animation-duration: 2.55s;
    }

    .card-box .card:nth-of-type(4) {
      animation-duration: 1.95s;
    }

    .card-box .card:nth-of-type(5) {
      animation-duration: 2.45s;
    }

    .card-box .card .card-back {
      display: block;
      height: 100%;
      width: auto;
      animation-name: cardback;

    }


    .card-box .card .card-front {
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 20px;
      overflow: hidden;
      height: 100%;
      width: 100%;
      z-index: 1;
    }

    .card-box .card .card-shine {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: none;
      width: 100px;
      height: 100px;

      box-shadow: 0px 0px 180px 60px rgba(255, 196, 6, 0.3);
      z-index: 0.5;
    }

    .card-box .card .sa-position {
      position: absolute;
      top: 30%;
      left: -50%;
      z-index: 0, 5;
      pointer-events: none;
    }

    .card-box .card .sa-2 {
      width: 200%;
      height: 60px;
      transform-style: preserve-3d;
      animation: spin2 10s linear infinite;
      transform: rotateX(10deg) rotateZ(90deg);
    }

    .card-box .card .sa-3 {
      width: 200%;
      height: 60px;
      transform-style: preserve-3d;
      animation: spin3 10s linear infinite;
      transform: rotateX(10deg) rotateZ(135deg);
    }

    .card-box .card .sa-4 {
      width: 200%;
      height: 60px;
      transform-style: preserve-3d;
      animation: spin4 10s linear infinite;
      transform: rotateX(10deg) rotateZ(180deg);
    }

    .card-box .card .sa-5 {
      width: 200%;
      height: 60px;
      transform-style: preserve-3d;
      animation: spin4 10s linear infinite;
      transform: rotateX(10deg) rotateZ(135deg);
    }

    @keyframes bounceIn {
      0% {
        opacity: 0;
        transform: scale(0.3) translate3d(0, 0, 0);
      }

      50% {
        opacity: 0.9;
        transform: scale(1.1);
      }

      80% {
        opacity: 1;
        transform: scale(0.89);
      }

      100% {
        opacity: 1;
        transform: scale(1) translate3d(0, 0, 0);
      }
    }


    #cardWrapper {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .card {
      position: relative;
      /* width: calc(70vh * 0.70756062767475); */
      /* height: 70vh; */
      /* overflow: hidden; */
    }

    .card img {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0px;
    }

    .card .layer0 {
      z-index: 0;
    }

    .card .layer1 {
      z-index: 1;
    }

    .card .layer2 {
      z-index: 2;
    }

    .card .shadowv {
      -webkit-filter: opacity(.5) drop-shadow(0 0 0 green);
      filter: opacity(.5) drop-shadow(0 0 0 green);
    }

    .card .shadowr {
      -webkit-filter: opacity(.5) drop-shadow(0 0 0 red);
      filter: opacity(.5) drop-shadow(0 0 0 red);
    }

    .card .layer3 {
      z-index: 3;
    }

    .card .layer4 {
      z-index: 4;
    }

    .card .layer5 {
      z-index: 5;
    }

    .card .attack_type {
      width: 40px !important;
      height: 40px !important;
      left: 15px !important;
      top: 10px !important;
    }

    .card .layer6 {
      z-index: 6;
    }

    .card .layer7 {
      z-index: 7;
    }

    .card .layer8 {
      z-index: 8;
    }

    .card .layer9 {
      z-index: 9;
    }

    .card .layer10 {
      z-index: 10;
    }

    .card .text {
      position: absolute;
      top: 112px !important;
      left: 20px !important;
      text-align: left;
      line-height: 16px;
      text-shadow: 0px 0px 5px black, 0px 0px 5px black, 0px 0px 5px black, 0px 0px 5px black;
    }

    .card .properties {
      position: relative;
      top: 156px !important;
      right: 15px !important;
      font-family: 'Legend';
      text-align: center;
      line-height: 8px;
      text-shadow: 0px 0px 5px black, 0px 0px 5px black, 0px 0px 5px black, 0px 0px 5px black;
      width: 30px;
      float: right;
    }

    .card .flag {
      width: 25px;
      height: 15px;
      position: relative;
    }

    .card .name {
      font-size: 16px;
      font-family: "American Captain";
      color: #fbbd08;
      text-shadow: 0px 0px 5px black, 0px 0px 5px black;
    }

    .card .skill {
      background: black;
      font-size: 10px;
      font-family: "American Captain";
      color: #fbbd08;
      text-shadow: 0px 0px 5px black, 0px 0px 5px black;
      width: fit-content;
      padding: 2px 5px;
    }
    .card .properties .skill{
      font-size: 8px;
    }

    .card .properties .skill_name {
      font-family: "American Captain";
      text-align: center;
      width: 100%;
      margin-left: 0px;
    }

    .card .skill_name {
      margin-left: 2px;
      font-size: 11px;
      font-family: "Legend";
      color: #fff;
      text-shadow: 0px 0px 5px black, 0px 0px 5px black;
      width: fit-content;
      padding: 2px 5px;
      text-transform: uppercase;
    }

    .card .skill_desc {
      font-size: 10px;
      text-shadow: 0px 0px 5px black, 0px 0px 5px black;
      width: calc(100% - 45px);
      text-rendering: optimizeLegibility;
    }
</style>

