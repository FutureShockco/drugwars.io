<template>
    <div>
        <CardsTabs/>
        <div>
            <div class="text-center mt-3 mb-3">
                <button class="button" @click="chooseCardType('all')" :class="{ 'button-yellow' : card_type ==='all' }">ALL</button>
                <button class="button ml-1" @click="chooseCardType('units')" :class="{ 'button-yellow' : card_type ==='units' }">UNITS</button>
                <button disabled class="button ml-1" @click="chooseCardType('buildings')" :class="{ 'button-yellow' : card_type ==='buildings' }">BUILDINGS</button>
                <button disabled class="button ml-1" @click="chooseCardType('training')" :class="{ 'button-yellow' : card_type ==='training' }">TRAINING</button>
                <button disabled class="button ml-1" @click="chooseCardType('heroes')" :class="{ 'button-yellow' : card_type ==='heroes' }">HEROES</button>
                <button disabled class="button ml-1" @click="chooseCardType('consumables')" :class="{ 'button-yellow' : card_type ==='consumables' }">CONSUMABLES</button>
            </div>
            <Loading v-if="loading" />
            <div class="card-box">
                <div v-for="card in cards" class="card" :key="card.id" :id="card.id+'-card'">
                    <canvas width="220" height="295" :id="card.id+'-card-front'" class="card-front"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { buildings, CardPack, units, trainings } from 'drugwars';
import { filter, pickBy } from 'lodash';
import { setTimeout } from 'timers';

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
    };
  },
  created() {
    const self = this;
    self.cards = [];
    // self.handleSubmit()
    self.loading = true;
    const b = filter(pickBy(buildings));
    const u = filter(pickBy(units));
    const t = filter(pickBy(trainings));
    // b.forEach(element => {
    //     element.ctype = 'buildings';
    //     element.owned = true;
    //     self.cards.push(element)
    // });
    u.forEach(element => {
      element.ctype = 'units';
      element.owned = true;
      if (!element.npc) self.cards.push(element);
    });
    // t.forEach(element => {
    //     element.ctype = 'training';
    //     element.owned = true;
    //     self.cards.push(element)
    // });
    // const generator = new CardPack(5);
    setTimeout(() => {
      self.handleSubmit();
    }, 3000);
  },
  methods: {
    handleSubmit() {
      const self = this;
      self.loading = true;

      this.cards.forEach(card => {
        const c = document.getElementById(`${card.id}-card`);
        let canvas = document.getElementById(`${card.id}-card-front`),
          ctx = canvas.getContext('2d');
        const background = new Image();
        const attack_type = new Image();
        const frame = new Image();
        const character = new Image();
        const border = new Image();
        const flag = new Image();
        const effect = new Image();
        const path = 'http://teelkee.com/dw';
        background.src = `../img/cards/background/1.png`;

        background.onload = () => {
          frame.src = `${path}/frames/1.png`;
          ctx.imageSmoothingEnabled = true;
          ctx.drawImage(background, 2, 2, canvas.width - 4, canvas.height - 4);
        };

        frame.onload = () => {
          if (card.ctype === 'buildings') {
            console.log(card.id);
            character.src = `../img/cards/buildings/${card.id}.png`;
          } else if (card.ctype === 'units') {
            character.src = `../img/cards/units/${card.id}.png`;
          } else if (card.ctype === 'training') {
            character.src = `../img/trainings/${card.id}.jpg`;
          } else {
            character.src = `${path}/heroes/${card.pic}.png`;
          }
          ctx.imageSmoothingEnabled = true;
          ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
        };

        character.onload = () => {
          effect.src = `../img/cards/fx/1.png`;
          ctx.imageSmoothingEnabled = true;
          ctx.drawImage(character, 0, 0, canvas.width, canvas.height);
        };

        effect.onload = () => {
          // border.src = `${path}/borders/${card.quality}.png`;
          if (card.owned && card.ctype === 'units') {
            attack_type.src = `${path}/icons/${card.dmg_type}.png`;
          } else {
            attack_type.src = `${path}/icons/weapon.png`;
          }
          ctx.imageSmoothingEnabled = true;
          ctx.drawImage(effect, 0, 0, canvas.width, canvas.height);
        };
        attack_type.onload = () => {
          flag.src = `${path}/flags/fr.png`;
          ctx.imageSmoothingEnabled = true;
          if (card.owned && card.ctype === 'unit') ctx.drawImage(attack_type, 38, 225, 40, 40);
        };

        // border.onload = () => {
        //   attack_type.src = `${path}/icons/${card.attack_type}.png`;
        //   ctx.imageSmoothingEnabled = true;
        //   ctx.drawImage(border, 0, 0, canvas.width, canvas.height);
        // };

        flag.onload = () => {
          // attack_type.src = `${path}/icons/${card.attack_type}.png`;
          const yellowgradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
          yellowgradient.addColorStop('0', '#e6ac00');
          yellowgradient.addColorStop('0.5', '#ffca31');
          yellowgradient.addColorStop('1.0', '#fbbd08');
          ctx.fillStyle = yellowgradient;
          ctx.textAlign = 'left';
          ctx.strokeStyle = 'black';

          if (card.owned) {
            ctx.textAlign = 'left';
            ctx.fillStyle = yellowgradient;
            ctx.shadowColor = 'rgba(0,0,0,1)';
            ctx.shadowBlur = 3;
            ctx.fillStyle = '#fff';
            ctx.font = '10px Legend';
            ctx.fillText('COMMON', 20, 140);
            ctx.font = '20px American Captain';
            ctx.fillStyle = '#000';
            this.wrapText(ctx, card.name, 21, 163, canvas.width - 50, 16);
            ctx.fillStyle = yellowgradient;
            this.wrapText(ctx, card.name, 20, 162, canvas.width - 50, 16);

            if (card.feature) {
              ctx.font = '10px American Captain';
              ctx.strokeStyle = '#000';
              ctx.lineWidth = '2';
              ctx.fillStyle = '#000';
              ctx.fillRect(20, 168, 38, 14);
              ctx.stroke();
              ctx.fillStyle = '#ffc508';
              ctx.shadowBlur = 0;

              ctx.fillText('UNIQUE', 24, 178);
              ctx.textAlign = 'left';
              ctx.font = '7px Helvetica';
              ctx.fillStyle = '#fff';
              ctx.shadowBlur = 3;
              const text_height = this.wrapText(
                ctx,
                card.feature.toString().toUpperCase(),
                20,
                192,
                canvas.width - 60,
                11,
              );
              if (card.desc) {
                ctx.font = '10px American Captain';

                ctx.strokeStyle = '#000';
                ctx.lineWidth = '2';
                ctx.fillStyle = '#000';
                ctx.fillRect(20, text_height + 5, 60, 14);
                ctx.stroke();
                ctx.fillStyle = '#ffc508';
                ctx.shadowBlur = 0;

                ctx.fillText('DESCRIPTION', 24, text_height + 15);
                ctx.textAlign = 'left';
                ctx.font = '7px Helvetica';
                ctx.fillStyle = '#fff';
                ctx.shadowBlur = 3;
                this.wrapText(
                  ctx,
                  card.desc.toString().toUpperCase(),
                  20,
                  30 + text_height,
                  canvas.width - 60,
                  11,
                );
              }
            }
          }
          console.log(card.ctype);
          if (card.ctype === 'units') {
            // DRAW attributes TOP
            ctx.textAlign = 'center';
            ctx.font = '7px American Captain';
            ctx.fillStyle = yellowgradient;
            ctx.fillText('ATTACK', 190, 186);
            ctx.font = '12px American Captain';
            ctx.fillStyle = '#fff';
            ctx.fillText(card.attack, 190, 198);

            ctx.font = '7px American Captain';
            ctx.fillStyle = yellowgradient;
            ctx.fillText('HEALTH', 190, 210);
            ctx.font = '12px American Captain';
            ctx.fillStyle = '#fff';
            ctx.fillText(card.health, 190, 222);

            ctx.font = '7px American Captain';
            ctx.fillStyle = yellowgradient;
            ctx.fillText('SPEED', 190, 234);
            ctx.font = '12px American Captain';
            ctx.fillStyle = '#fff';
            ctx.fillText(card.speed, 190, 246);

            ctx.font = '7px American Captain';
            ctx.fillStyle = yellowgradient;
            ctx.fillText('CARRY', 190, 258);
            ctx.font = '12px American Captain';
            ctx.fillStyle = '#fff';
            ctx.fillText(card.capacity, 190, 270);
            // //DRAW attributes BOTTOM
            // ctx.textAlign = 'center';
            // ctx.font = '10px American Captain';
            // ctx.fillStyle = yellowgradient;
            // ctx.fillText('PHYSICAL', 87, 268);
            // ctx.font = '14px American Captain';
            // ctx.fillStyle = '#fff';
            // ctx.fillText(card.res_physical, 87, 280);

            // ctx.font = '10px American Captain';
            // ctx.fillStyle = yellowgradient;
            // ctx.fillText('WEAPON', 119, 268);
            // ctx.font = '14px American Captain';
            // ctx.fillStyle = '#fff';
            // ctx.fillText(card.res_weapon, 119, 280);

            // ctx.font = '10px American Captain';
            // ctx.fillStyle = yellowgradient;
            // ctx.fillText('FIRE', 151, 268);
            // ctx.font = '14px American Captain';
            // ctx.fillStyle = '#fff';
            // ctx.fillText(card.res_fire, 151, 280);

            // ctx.font = '10px American Captain';
            // ctx.fillStyle = yellowgradient;
            // ctx.fillText('CHEMICAL', 183, 268);
            // ctx.font = '14px American Captain';
            // ctx.fillStyle = '#fff';
            // ctx.fillText(card.res_chemical, 183, 280);
          } else if (!card.owned) {
            ctx.imageSmoothingEnabled = true;
            ctx.drawImage(flag, 10, 115, 20, 12);
            ctx.textAlign = 'left';
            ctx.fillStyle = yellowgradient;
            ctx.shadowColor = 'rgba(0,0,0,1)';
            ctx.shadowBlur = 3;
            ctx.font = '13px American Captain';
            ctx.fillStyle = '#000';

            ctx.font = '16px American Captain';
            ctx.fillStyle = yellowgradient;
            this.wrapText(
              ctx,
              `${card.prefixe} ${card.name} ${card.suffixe}`,
              30,
              142,
              canvas.width - 10,
              16,
            );
            ctx.font = '13px American Captain';
          }
          ctx.textAlign = 'center';
          ctx.font = '14px Legend';

          ctx.fillStyle = '#fff';
          ctx.fillText('X1'.toUpperCase(), 190, 165);
          self.loading = false;

          c.style.transform = 'rotateY(0deg)';
          this.card = card;
        };
      });
    },
    wrapText(context, text, x, y, maxWidth, lineHeight) {
      const words = text.split(' ');
      let line = '';
      for (let n = 0; n < words.length; n++) {
        const testLine = `${line + words[n]} `;
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth) {
          context.fillText(line, x, y);
          line = `${words[n]} `;
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      context.fillText(line, x, y);
      return y;
    },
    chooseCardType(value) {
      this.card_type = value;
      const self = this;
      self.cards = [];
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
          element.ctype = 'units';
          element.owned = true;
          if (!element.npc) self.cards.push(element);
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



<style type="text/css">
[v-cloak] {
  display: none;
}

.card {
  border: 0px;
  font-family: 'American Captain', Verdana, Tahoma;
}

.cards {
  font-family: 'American Captain', Verdana, Tahoma;
}

.uppercase {
  text-transform: uppercase;
}

.minip {
  width: 24px;
}

.result {
  border-radius: 5px;
  border: 2px solid #ffc400;
}

.unitname {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
}

.vs {
  margin-top: 40%;
}

@keyframes rotate {
  0%,
  20% {
    transform: rotate(0);
  }
  46% {
    transform: rotate(67deg);
  }
  66% {
    transform: rotate(55deg);
  }
  80% {
    transform: rotate(63deg);
  }
  86% {
    transform: rotate(58deg);
  }
  93%,
  to {
    transform: rotate(60deg);
  }
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
    transform: translate(-0.6px, 0);
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

.card {
  background-color: transparent;
}

.card-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  background-color: transparent;
}

.card-box .card {
  position: relative;
  height: 295px;
  width: 220px;
  margin-bottom: 20px;
  /* animation-name: cardshake; */
  animation-iteration-count: infinite;
  animation-direction: alternate;
  cursor: pointer;
  background-color: transparent;
}

.card-box .card:hover {
  animation-name: hoverscale;
  animation-duration: 0.3s;
  animation-iteration-count: 1;
  transform: scale(1, 1);
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

.card-box .card .card-back {
  display: none;
  height: 100%;
  width: auto;
  transform: rotateY(90deg);
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
}

.card-box .card .card-front {
  border-radius: 20px;
}
</style>
