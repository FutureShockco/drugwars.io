<template>
    <div id="territorybg" class="territorybg">
        <div class="text-center">
        <button class="button button-yellow" @click="decreaseLocation()"><div class="iconfont icon-arrow-left"></div>
        </button><input type="number" v-model="location" placeholder="25" class="mt-5 input">
        <button class="button button-yellow"  @click="increaseLocation()"><div class="iconfont icon-arrow-right"></div></button>
        </div>
        <h3 class="title" id="title" style="opacity:0;">
            <div v-if="selectedTile">BASE {{selectedTile}}</div>
            <h5 class="mt-0">UNDER THE CONTROL OF :
                <span v-if="currentNickname">{{currentNickname}}</span>
                <span v-else>Nobody </span>
            </h5>
            <div>INFORMATIONS</div>
            <h5 class="mt-0">HQ LEVEL : {{currentHq}}</h5>
            <h5 class="mt-0">DETAIL : {{customName}}</h5>
                    <div class="map-title text-left" id="visit" style="opacity:0;">
            <router-link v-if="selectedTile && currentNickname && currentNickname != nickname" :to="`/actions?type=attack&target=${location}&base=${selectedTile}`">
                <button class="button button-red">ATTACK</button>
            </router-link>
            <router-link v-if="selectedTile && currentNickname && currentNickname != nickname" :to="`/actions?type=transport&target=${location}&base=${selectedTile}`">
                <button class="button button-blue">TRANSPORT</button>
            </router-link>
            <router-link v-else-if="currentNickname != nickname && base" :to="`/actions?type=occupy&target=${location}&base=${selectedTile}`">
                <button class="button button-blue">CREATE NEW BASE</button>
            </router-link>
            <button v-if="currentNickname === nickname && location == base.territory && selectedTile == base.base" class="button button-blue">
                      ALREADY SELECTED
                      </button>
            <div v-else-if="currentNickname === nickname"><button class="button button-blue" @click="selectBase()">
                      SELECT
                </button>
                <router-link :to="`/actions?type=transport&target=${location}&base=${selectedTile}`">
                    <button class="button button-blue">TRANSPORT</button>
                </router-link>
            </div>
            <button v-if="!main" class="button button-blue" @click="handleSubmit()">CHOOSE AS PRIMARY BASE</button>
        </div>
        </h3>

        <canvas id="canvas" class="mt-1"></canvas>
    </div>
</template>

<script>
import client from '@/helpers/client';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      isMain: null,
      isLoading: false,
      selectedTile: null,
      selected: null,
      customName: null,
      currentNickname: null,
      currentHq: null,
      nickname: this.$store.state.game.user.user.nickname,
      bases: [],
      currentLocation: null,
    };
  },
  computed: {
    main() {
      if (this.base) return this.$store.state.game.user.buildings.find(b => b.main === 1) || null;
    },
    location() {
      return this.$route.query.location || null;
    },
    base() {
      return this.$store.state.game.mainbase;
    },
    ownOccupationTroop() {
      if (this.$store.state.game.user.units.find(u => u.unit === 'occupation_troop'))
        return (
          this.$store.state.game.user.units.find(u => u.unit === 'occupation_troop').amount || {
            amount: 0,
          }
        );
      return 0;
    },
  },
  methods: {
    increaseLocation() {
      this.$router.push({ path: `/map/territory?location=${Number(this.location) + 1}` });
    },
    decreaseLocation() {
      this.$router.push({ path: `/map/territory?location=${Number(this.location) - 1}` });
    },
    start() {
      const self = this;
      const bg = document.getElementById('territorybg');
      const canvas_element = document.getElementById('canvas');
      const width = bg.offsetWidth;
      const height = bg.offsetHeight;
      canvas_element.width = width;
      canvas_element.height = height;
      const context = canvas_element.getContext('2d');
      let tiles_array = [];
      function clearCanvas() {
        const ctx = canvas_element.getContext('2d');
        ctx.clearRect(0, 0, width, height);
      }
      clearCanvas();
      canvas_element.width = width;
      canvas_element.height = height;
      const TILE_TYPES = {
        me: { name: 'Me', color: 'green' },
        sea: { name: 'Sea', color: 'lightBlue' },
        land: { name: 'Land', color: 'black' },
      };

      function Tile(
        x,
        y,
        width,
        height,
        id,
        nickname,
        level,
        custom_name,
        main,
        fillColor,
        strokeStyle,
      ) {
        this.id = id;
        this.nickname = nickname || null;
        this.level = level || null;
        this.custom_name = custom_name || null;
        this.main = main || null;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.workWidth = {
          start: x,
          end: x + width,
        };
        this.workHeight = {
          start: y,
          end: y + height,
        };
        this.fillColor = fillColor;
        this.strokeStyle = 'black';
      }

      const visitTitle = document.getElementById('title');
      const visitButton = document.getElementById('visit');
      canvas_element.onclick = function(e) {
        event = e;
        const elementClickedId = checkClick(event);
        console.log(elementClickedId)
        if (self.selectedTile != null && self.nickname === self.currentNickname) {
          tiles_array[self.selectedTile - 1].fillColor = 'green';
        } else if (
          self.selectedTile != null &&
          self.currentNickname &&
          self.nickname !== self.currentNickname
        ) {
          tiles_array[self.selectedTile - 1].fillColor = 'red';
        } else if (self.selectedTile != null) {
          tiles_array[self.selectedTile - 1].fillColor = 'black';
        }
        if(elementClickedId.id === 225)
        {
          if (elementClickedId.nickname === self.nickname) {
            tiles_array[224].fillColor = 'green';
          } else 
          if (elementClickedId.nickname !== self.nickname) {
            tiles_array[224].fillColor = 'blue';
          } else {
            tiles_array[224].fillColor = 'gray';
          }
        }
        self.selectedTile = elementClickedId.id;
        self.currentNickname = elementClickedId.nickname;
        self.currentHq = elementClickedId.hq;
        self.customName = elementClickedId.custom_name;
        self.isMain = elementClickedId.main;
        if (elementClickedId.nickname === self.nickname) {
          tiles_array[elementClickedId.id - 1].fillColor = 'green';
        } else if (elementClickedId.nickname !== self.nickname) {
          tiles_array[elementClickedId.id - 1].fillColor = 'blue';
        } else {
          tiles_array[elementClickedId.id - 1].fillColor = 'gray';
        }
        // visitButton.style.top = `${tiles_array[elementClickedId.id].y + 10}px`;
        // visitButton.style.left = `${tiles_array[elementClickedId.id].x + 15}px`;
        visitButton.style.opacity = 1;
        if(tiles_array[elementClickedId.id])
        {
        visitTitle.style.top = `${tiles_array[elementClickedId.id].y + 30}px`;
        visitTitle.style.left = `${tiles_array[elementClickedId.id].x - 35}px`;
        visitTitle.style.opacity = 1;
        }


        drawTiles();
      };

      canvas_element.onmousemove = function(e) {
        const elementUnder = checkClick(event);
        if (elementUnder == 1) {
          changeCursor('pointer');
        } else {
          changeCursor('default');
        }
      };

      canvas_element.onmouseout = function(e) {
        changeCursor('default');
      };

      function checkClick(event) {
        const clickX = event.layerX;
        const clickY = event.layerY;

        let element;

        tiles_array.forEach(tile => {
          if (
            clickX > tile.workWidth.start &&
            clickX < tile.workWidth.end &&
            clickY > tile.workHeight.start &&
            clickY < tile.workHeight.end
          ) {
            element = {
              id: tile.id,
              nickname: tile.nickname,
              hq: tile.level,
              custom_name: tile.custom_name,
              main: tile.main,
            };
          }
        });
        return element;
      }

      function createTiles(quantityX, quantityY) {
        tiles_array = [];
        const quantityAll = quantityX * quantityY + 1;
        const tileWidth = canvas_element.width / quantityX;
        const tileHeight = canvas_element.height / quantityY;

        const drawPosition = {
          x: 0,
          y: 0,
        };
        let i = 1;
        for (i = 1; i < quantityAll; i++) {
          let fillColor = TILE_TYPES.land.color;
          let nickname = '';
          let level = '';
          let custom_name = '';
          let main = '';
          self.bases.forEach(element => {
            if (element.base === i && element.nickname === self.nickname) {
              fillColor = 'green';
              nickname = element.nickname;
              level = element.lvl;
              custom_name = element.custom;
              main = element.main;
            } else if (element.base === i && element.nickname !== self.nickname) {
              fillColor = 'red';
              nickname = element.nickname;
              level = element.lvl;
              custom_name = element.custom;
              main = element.main;
            }
          });
          const tile = new Tile(
            drawPosition.x,
            drawPosition.y,
            tileWidth,
            tileHeight,
            i,
            nickname,
            level,
            custom_name,
            main,
            fillColor,
          );
          tiles_array.push(tile);

          drawPosition.x += tileWidth;
          if (drawPosition.x >= canvas_element.width) {
            drawPosition.x = 0;
            drawPosition.y += tileHeight;
          }
        }
      }

      createTiles(15, 15);

      function drawTiles() {
        tiles_array.forEach(tile => {
          context.beginPath();
          context.fillStyle = tile.fillColor;
          context.rect(tile.x, tile.y, tile.width, tile.height);
          context.lineWidth = '5';
          context.strokeStyle = tile.strokeStyle;
          context.strokeStyle = '#ffc508';
          context.stroke();
          context.fill();
          context.textAlign = 'center';
          context.font = '12px American Captain';
          context.fillStyle = '#fff';
          context.fillText(tile.id, tile.x + 10, tile.y + 25);
        });
      }
      drawTiles();

      function changeCursor(cursorType) {
        document.body.style.cursor = cursorType;
      }
      this.showLoading = false;
    },
    ...mapActions(['send', 'notify', 'setMainBase', 'init']),
    async handleSubmit() {
      const self = this;
      const isValid = await this.validateFormFree();
      console.log(this.location);
      this.isLoading = true;
      if (isValid && this.location && this.selectedTile) {
        const payload = {
          type: 'dw-firstloc',
          territory: Number(this.location),
          base: Number(this.selectedTile),
        };
        this.send(payload)
          .then(() => {
            Promise.delay(2000).then(() => {
              client.requestAsync('get_bases', this.location).then(result => {
                console.log(result);
                self.bases = result[0];
                self.setMainBase(self.bases);
                self.init();
                self.isLoading = false;
              });
            })
          })
          .catch(e => {
            this.notify({ type: 'error', message: 'Failed to create gang' });
            console.error('Failed to create gang', e);
            this.isLoading = false;
          });
      } else {
        this.isLoading = false;
      }
    },
    async validateFormFree() {
      this.errorMessage = null;
      const base = this.selectedTile;
      const territory = this.location;
      const params = { base, territory };
      if (this.$store.state.game.user.buildings.find(b => b.main === 1 && b.territory !== 0)) {
        this.errorMessage = 'You already have a main base!';
      }

      if (!base || !territory) {
        this.errorMessage = 'Please choose a location and a base';
      }
      const now = new Date();
      const isPunished = new Date(Date.parse(this.$store.state.game.user.user.punished));
      if (isPunished > now) {
        this.errorMessage = `Hmm Bad talks are not appropriated in DrugWars, try again after ${isPunished.toLocaleString()}`;
      }

      if (!this.errorMessage)
        try {
          const base = await client.requestAsync('check_base', params);
          console.log(base);
          if (base) {
            this.errorMessage = `Base number '${base}' is already taken`;
          }
          return !this.errorMessage;
        } catch (e) {
          this.errorMessage = `Base number '${base}' doesn't exist`;
          console.error(`Base number '${base}' doesn't exist`, e);
          return false;
        }
      if (this.errorMessage) {
        return false;
      }
      return !this.errorMessage;
    },
    selectBase() {
      const territory = this.location;
      const base = this.selectedTile;
      const custom = this.customName;
      const main = this.isMain;
      this.setMainBase({ territory, base, custom, main });
    },
  },
  mounted() {
    const self = this;
    self.bases = null;
    self.currentLocation = self.location;
    client.requestAsync('get_bases', this.location).then(result => {
      self.bases = result;
      self.start();
      self.isLoading = false;
    });
  },
  updated() {
    const self = this;
    self.bases = null;
    if (self.currentLocation !== self.location) {
      self.currentLocation = self.location;
      client.requestAsync('get_bases', this.location).then(result => {
        self.bases = result;
        self.start();
        self.isLoading = false;
      });
    }
  },
};
</script>


<style lang="less" scoped>
.territorybg {
  height: calc(100vh - 160px);
  max-width: calc(1120px - 400px);
}

canvas {
  border: 3px solid #ffc508;
}

.title {
  position: absolute;
  z-index: 10;
  left: 50%;
  top: 20%;
  text-shadow: 5px 5px 5px black;
  // pointer-events: none;
  background: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-radius: 5px;
}

// .map-title {
//   position: absolute;
// }
</style>
