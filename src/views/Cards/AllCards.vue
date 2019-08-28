<template>
    <div>
        <CardsTabs/>
        <div class="anim-fade-in">
            <Loading v-if="loading" />
            <div v-else class="card-box">
    
                <div v-for="card in cards" class="card" :key="card.id" :id="card.id+'-card'">
    
                    <canvas width="200" height="270" :id="card.id+'-card-front'" class="card-front"></canvas>
    
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
      error: null,
      details: false,
      json: null,
      seed: null,
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
    this.loading = true;
    const b = filter(pickBy(buildings));
    const u = filter(pickBy(units));
    const t = filter(pickBy(trainings));
    b.forEach(element => {
      element.ctype = 'building';
      element.owned = true;
      self.cards.push(element);
    });
    u.forEach(element => {
      element.ctype = 'unit';
      element.owned = true;
      self.cards.push(element);
    });
    t.forEach(element => {
      element.ctype = 'training';
      element.owned = true;
      self.cards.push(element);
    });
    // const generator = new CardPack(5);
    self.loading = false;
    setTimeout(() => {
      self.handleSubmit();
    }, 3000);
  },
  methods: {
    handleSubmit() {
      this.seed = '123456';

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
        background.src = `${path}/backgrounds/weapon/1.png`;

        background.onload = () => {
          frame.src = `${path}/frames/1.png`;
          ctx.imageSmoothingEnabled = true;
          ctx.drawImage(background, 2, 2, canvas.width - 4, canvas.height - 4);
        };

        frame.onload = () => {
          effect.src = `${path}/effects/5.png`;
          ctx.imageSmoothingEnabled = true;
          ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
        };

        effect.onload = () => {
          if (card.ctype === 'building') {
            character.src = `../img/buildings/${card.id}.jpg`;
          } else if (card.ctype === 'unit') {
            character.src = `../img/cards/units/${card.id}.png`;
          } else if (card.ctype === 'training') {
            character.src = `../img/trainings/${card.id}.jpg`;
          } else {
            character.src = `${path}/heroes/${card.pic}.png`;
          }
          ctx.imageSmoothingEnabled = true;
          ctx.drawImage(effect, 0, 0, canvas.width, canvas.height);
        };

        character.onload = () => {
          // border.src = `${path}/borders/${card.quality}.png`;
          if (card.owned && card.ctype === 'unit') {
            attack_type.src = `${path}/icons/${card.dmg_type}.png`;
          } else {
            attack_type.src = `${path}/icons/weapon.png`;
          }
          ctx.imageSmoothingEnabled = true;
          ctx.drawImage(character, 0, 0, canvas.width, canvas.height);
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
            ctx.font = '13px American Captain';
            ctx.fillStyle = '#000';

            ctx.font = '16px American Captain';
            ctx.fillStyle = yellowgradient;
            this.wrapText(ctx, card.name, 10, 142, canvas.width - 50, 16);
            ctx.font = '13px American Captain';
            if (card.feature) {
              ctx.textAlign = 'left';
              ctx.font = '10px Legend';
              ctx.fillStyle = '#fff';

              this.wrapText(
                ctx,
                card.feature.toString().toUpperCase(),
                10,
                158,
                canvas.width - 10,
                11,
              );
            }
            if (card.desc) {
              ctx.font = '8px Helvetica';

              ctx.fillStyle = '#fff';
              this.wrapText(
                ctx,
                card.desc.toString().toUpperCase(),
                10,
                208,
                canvas.width - 10,
                11,
              );
            }
          }
          if (card.ctype === 'unit') {
            // DRAW attributes TOP
            ctx.textAlign = 'center';
            ctx.font = '10px American Captain';
            ctx.fillStyle = yellowgradient;
            ctx.fillText('ATTACK', 87, 240);
            ctx.font = '14px American Captain';
            ctx.fillStyle = '#fff';
            ctx.fillText(card.attack, 87, 252);

            ctx.font = '10px American Captain';
            ctx.fillStyle = yellowgradient;
            ctx.fillText('HEALTH', 119, 240);
            ctx.font = '14px American Captain';
            ctx.fillStyle = '#fff';
            ctx.fillText(card.health, 119, 252);

            ctx.font = '10px American Captain';
            ctx.fillStyle = yellowgradient;
            ctx.fillText('SPEED', 151, 240);
            ctx.font = '14px American Captain';
            ctx.fillStyle = '#fff';
            ctx.fillText(card.speed, 151, 252);

            ctx.font = '10px American Captain';
            ctx.fillStyle = yellowgradient;
            ctx.fillText('CARRY', 183, 240);
            ctx.font = '14px American Captain';
            ctx.fillStyle = '#fff';
            ctx.fillText(card.capacity, 183, 252);

            // DRAW attributes BOTTOM
            ctx.textAlign = 'center';
            ctx.font = '10px American Captain';
            ctx.fillStyle = yellowgradient;
            ctx.fillText('PHYSICAL', 87, 268);
            ctx.font = '14px American Captain';
            ctx.fillStyle = '#fff';
            ctx.fillText(card.res_physical, 87, 280);

            ctx.font = '10px American Captain';
            ctx.fillStyle = yellowgradient;
            ctx.fillText('WEAPON', 119, 268);
            ctx.font = '14px American Captain';
            ctx.fillStyle = '#fff';
            ctx.fillText(card.res_weapon, 119, 280);

            ctx.font = '10px American Captain';
            ctx.fillStyle = yellowgradient;
            ctx.fillText('FIRE', 151, 268);
            ctx.font = '14px American Captain';
            ctx.fillStyle = '#fff';
            ctx.fillText(card.res_fire, 151, 280);

            ctx.font = '10px American Captain';
            ctx.fillStyle = yellowgradient;
            ctx.fillText('CHEMICAL', 183, 268);
            ctx.font = '14px American Captain';
            ctx.fillStyle = '#fff';
            ctx.fillText(card.res_chemical, 183, 280);
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
          ctx.font = ' 26px Legend';

          ctx.fillStyle = '#fff';
          ctx.fillText('X1'.toUpperCase(), 40, 280);

          b.style.transform = 'rotateY(0deg)';
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
    },
    showDetails() {
      this.details = true;
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

input {
  min-height: 16px !important;
  padding: 0px 8px !important;
}

svg {
  width: 50vmin;
  max-width: 200px;
  animation: rotate 1s infinite cubic-bezier(0.3, -0.05, 0.9, 0.95);
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
  height: 290px;
  width: 215px;
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
