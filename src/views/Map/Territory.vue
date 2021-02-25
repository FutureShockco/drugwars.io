<template>
  <div
    id="territorybg"
    class="territorybg anim-scale-in"
  >    <h3 class="title" id="title" style="display: none">
      <div v-if="selectedTile">BASE {{ selectedTile }}</div>
      <h5 class="mt-0">
        UNDER THE CONTROL OF :
        <div v-if="currentNickname">{{ currentNickname }}</div>
        <span v-else>Nobody </span>
        <div v-if="currentGang && currentGang.role !== null">
          {{ currentGang.role }} of {{ currentGang.name }} [{{ currentGang.ticker }}]
        </div>
      </h5>
      <div>INFORMATIONS</div>
      <h5 class="mt-0">HQ LEVEL : {{ currentHq }}</h5>
      <h5 class="mt-0">DETAIL : {{ customName }}</h5>
      <div class="map-title text-left" id="visit">
        <router-link
          v-if="selectedTile && currentNickname && currentNickname != nickname"
          :to="`/actions?type=attack&target=${location}&base=${selectedTile}`"
        >
          <button class="button button-red">ATTACK</button>
        </router-link>
        <router-link
          v-if="selectedTile && currentNickname && currentNickname != nickname"
          :to="`/actions?type=transport&target=${location}&base=${selectedTile}`"
        >
          <button class="button button-blue">TRANSPORT</button>
        </router-link>
        <router-link
          v-else-if="currentNickname != nickname && base"
          :to="`/actions?type=occupy&target=${location}&base=${selectedTile}`"
        >
          <button class="button button-blue">CREATE NEW BASE</button>
        </router-link>
        <button
          v-if="
            currentNickname === nickname && location == base.territory && selectedTile == base.base
          "
          class="button button-blue"
        >
          ALREADY SELECTED
        </button>
        <div v-else-if="currentNickname === nickname">
          <button class="button button-blue" @click="selectBase()">SELECT</button>
          <router-link :to="`/actions?type=transport&target=${location}&base=${selectedTile}`">
            <button class="button button-blue">TRANSPORT</button>
          </router-link>
        </div>
        <button v-if="!main" class="button button-blue" @click="handleSubmit()">
          CHOOSE AS PRIMARY BASE
        </button>
      </div>
    </h3>
    <table id="table">
      <canvas id="canvas" class="mt-1" style="cursor: pointer"></canvas>
    </table>

    <div class="text-center">
      <button class="button button-yellow" @click="decreaseLocation()">
        <div class="iconfont icon-arrow-left"></div></button
      ><input
        type="number"
        v-model="currentLocation"
        placeholder="25"
        class="mt-1 input"
        @change="updateLocation(currentLocation)"
      />
      <button class="button button-yellow" @click="increaseLocation()">
        <div class="iconfont icon-arrow-right"></div>
      </button>
    </div>
  </div>
</template>

<script>
import client from '@/helpers/client';
import { mapActions } from 'vuex';
import Promise from 'bluebird';

export default {
  data() {
    return {
      isMain: null,
      isLoading: false,
      selectedTile: null,
      selected: null,
      customName: null,
      currentNickname: null,
      currentGang: null,
      currentHq: null,
      job: null,
      nickname: this.$store.state.game.user.user.nickname,
      bases: [],
      currentLocation: null,
      dragging: false,
      iso: false,
      x: 'no',
      y: 'no',
    };
  },
  watch: {
    location(val) {
      if (val) {
        console.log(val);
        this.updateLocation()
      }
    },
  },
  computed: {
    main() {
      if (this.base) return this.$store.state.game.user.buildings.find((b) => b.main === 1) || null;
    },
    location() {
      return this.$route.query.location || null;
    },
    base() {
      return this.$store.state.game.mainbase;
    },
    ownOccupationTroop() {
      if (this.$store.state.game.user.units.find((u) => u.unit === 'occupation_troop'))
        return (
          this.$store.state.game.user.units.find((u) => u.unit === 'occupation_troop').amount || {
            amount: 0,
          }
        );
      return 0;
    },
  },
  methods: {
    testIso() {
      if (!this.iso) {
        const tb = document.getElementById('table');
        tb.style.position = 'absolute';
        tb.style.borderSpacing = '0px';
        tb.style.padding = '5px';
        tb.style.transform = 'rotateX(60deg) rotateZ(-45deg)';
      } else {
        const tb = document.getElementById('table');
        tb.style.position = 'initial';
        tb.style.borderSpacing = '0px';
        tb.style.padding = '5px';
        tb.style.transform = 'rotateX(0deg) rotateZ(0deg)';
      }
      this.iso = !this.iso;
      start();
    },
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
      const tb = document.getElementById('table');

      const context = canvas_element.getContext('2d');
      let tiles_array = [];

      let width = 0;
      let height = 0;
      if (self.iso) {
        width = bg.offsetWidth * 2;
        height = (bg.offsetHeight - 150) * 2;
        canvas_element.width = width * 2;
        canvas_element.height = height * 2;
      } else {
        width = bg.offsetWidth;
        height = bg.offsetHeight - 150;
        canvas_element.width = width;
        canvas_element.height = height;
      }

      function clearCanvas() {
        const ctx = canvas_element.getContext('2d');
        ctx.clearRect(0, 0, width, height);
      }
      const TILE_TYPES = {
        me: { name: 'Me', color: 'green' },
        sea: { name: 'Sea', color: 'lightBlue' },
        land: { name: 'Land', color: null },
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
        gang,
        job,
        fillColor,
        strokeStyle,
      ) {
        this.id = id;
        this.nickname = nickname || null;
        this.level = level || null;
        this.gang = gang || null;
        this.job = job || null;
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
      canvas_element.onclick = function (e) {
        event = e;
        const elementClickedId = checkClick(event);
        if (self.selectedTile != null && self.nickname === self.currentNickname) {
          tiles_array[self.selectedTile - 1].fillColor = 'green';
          clearCanvas();
        } else if (
          self.selectedTile != null &&
          self.currentNickname &&
          self.nickname !== self.currentNickname
        ) {
          tiles_array[self.selectedTile - 1].fillColor = 'red';
          clearCanvas();
        } else if (self.selectedTile != null && !self.currentNickname && self.job) {
          tiles_array[self.selectedTile - 1].fillColor = '#ffc508';
        } else if (self.selectedTile != null) {
          tiles_array[self.selectedTile - 1].fillColor = null;
        }
        if (elementClickedId.id === 225) {
          if (elementClickedId.job === self.job) {
            tiles_array[224].fillColor = '#ffc508';
          } else if (elementClickedId.nickname === self.nickname) {
            tiles_array[224].fillColor = 'green';
          } else if (elementClickedId.nickname !== self.nickname) {
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
        self.currentGang = elementClickedId.gang;
        self.job = elementClickedId.job;
        if (elementClickedId.job && !elementClickedId.nickname) {
          tiles_array[elementClickedId.id - 1].fillColor = '#ffc508';
        } else if (elementClickedId.nickname === self.nickname) {
          tiles_array[elementClickedId.id - 1].fillColor = 'green';
        } else if (elementClickedId.nickname !== self.nickname) {
          tiles_array[elementClickedId.id - 1].fillColor = 'blue';
        } else {
          tiles_array[elementClickedId.id - 1].fillColor = 'gray';
        }

        if (tiles_array[elementClickedId.id] && !elementClickedId.job) {
          visitTitle.style.display = 'block';
          if (tiles_array[elementClickedId.id].x === 0) {
            visitTitle.style.top = `${tiles_array[elementClickedId.id].y + 4}px`;
            visitTitle.style.left = `initial`;
            visitTitle.style.right = `${48}px`;
          } else if (
            tiles_array[elementClickedId.id].x > canvas_element.width / 2 ||
            tiles_array[elementClickedId.id].x > canvas_element.width
          ) {
            visitTitle.style.top = `${tiles_array[elementClickedId.id].y + 54}px`;
            visitTitle.style.left = `initial`;
            visitTitle.style.right = `${
              canvas_element.width - tiles_array[elementClickedId.id].x + 48
            }px`;
          } else {
            visitTitle.style.top = `${tiles_array[elementClickedId.id].y + 54}px`;
            visitTitle.style.right = `initial`;
            visitTitle.style.left = `${tiles_array[elementClickedId.id].x}px`;
          }
        } else if (elementClickedId.job) {
          visitTitle.style.display = 'none';
        }
        drawTiles();
      };

      function checkClick(event) {
        const clickX = event.layerX;
        const clickY = event.layerY;

        let element;

        tiles_array.forEach((tile) => {
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
              gang: tile.gang,
              job: tile.job,
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
          let gang = {};
          let job = '';
          self.bases.forEach((element) => {
            if (element.base === i && element.job != undefined) {
              fillColor = '#ffc508';
              nickname = element.nickname;
              level = element.lvl;
              custom_name = element.custom;
              main = element.main;
              job = element.job;
            } else if (element.base === i && element.nickname === self.nickname) {
              fillColor = 'green';
              nickname = element.nickname;
              gang = { role: element.role, gang: element.name, ticker: element.ticker };
              level = element.lvl;
              custom_name = element.custom;
              main = element.main;
            } else if (element.base === i && element.nickname !== self.nickname) {
              fillColor = '#a90000';
              nickname = element.nickname;
              gang = { role: element.role, gang: element.name, ticker: element.ticker };
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
            gang,
            job,
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

      const home = new Image();
      const tree = new Image();
      const buildingtop = new Image();
      const buildingbottom = new Image();
      const fountain = new Image();
      const pool = new Image();
      const heliport = new Image();
      const job = new Image();
      home.src = '//img.drugwars.io/map/first.png';
      buildingtop.src = '//img.drugwars.io/map/first.png';
      pool.src = '//img.drugwars.io/map/first.png';
      heliport.src = '//img.drugwars.io/map/first.png';
      home.src = '//img.drugwars.io/map/home.png';
      tree.src = '//img.drugwars.io/map/tree.png';
      buildingtop.src = '//img.drugwars.io/map/buildingtop.png'; 
      buildingbottom.src = '//img.drugwars.io/map/buildingbottom.png';
      fountain.src = '//img.drugwars.io/map/fountain.png';
      pool.src = '//img.drugwars.io/map/pool.png';
      heliport.src = '//img.drugwars.io/map/heliport.png';
      job.src = '//img.drugwars.io/map/home.png';


      function drawTiles() {
        const background = new Image();

        background.src = `//img.drugwars.io/map/newmap.jpg`;
        background.onload = () => {
          context.imageSmoothingEnabled = true;
          context.drawImage(background, 0, 0, canvas.width, canvas.height);
          tiles_array.forEach((tile) => {
            context.beginPath();
            if (tile.fillColor) context.fillStyle = tile.fillColor;
            else context.fillStyle = 'rgba(255, 255, 255, 0.0)';
            context.rect(tile.x + 6, tile.y + 9, tile.width - 12, tile.height - 12);
            // context.lineWidth = '0';
            // context.strokeStyle = tile.strokeStyle;
            // context.strokeStyle = '#000';

            context.fill();

            if (tile.fillColor) {
              if(tile.level > 99)
              {
                context.drawImage(heliport, tile.x + 6, tile.y + 9, tile.width - 12, tile.height - 11);
              }
              else if (tile.level > 49) {
                 context.drawImage(pool, tile.x + 6, tile.y + 9, tile.width - 12, tile.height - 11);
              }
              else if (tile.level > 29) {
                 context.drawImage(fountain, tile.x + 6, tile.y + 9, tile.width - 12, tile.height - 11);
              }
              if (tile.level < 10) {
                context.drawImage(home, tile.x + 6, tile.y + 9, tile.width - 12, tile.height - 11);
                if (tile.fillColor === 'green'){
                  context.drawImage(tree, tile.x + 6, tile.y + 9, tile.width - 12, tile.height - 11);
                } 
              }
              if (tile.level > 9) {
                context.drawImage(buildingtop, tile.x + 6, tile.y + 9, tile.width - 12, tile.height - 11);
              }
              if (tile.level > 19) {
                context.drawImage(buildingbottom, tile.x + 6, tile.y + 9, tile.width - 12, tile.height - 11);
              }

            }
            context.shadowColor = 'black';
            context.shadowBlur = 5;
            context.textAlign = 'center';
            context.lineWidth = 5;

            context.font = '12px American Captain';
            context.fillStyle = '#fff';
            context.fillText(tile.id, tile.x + 15, tile.y + 42);
          });
        };
      }
      createTiles(15, 15);
      drawTiles();

      // const limit = (document.body.clientWidth)-bg.offsetWidth;
      // tb.style.left = (limit+50) +'px';
    },
    ...mapActions(['send', 'notify', 'setMainBase', 'init']),
    async handleSubmit() {
      const self = this;
      const isValid = await this.validateFormFree();
      this.isLoading = true;
      if (isValid && this.location && this.selectedTile) {
        const payload = {
          type: 'dw-firstloc',
          territory: Number(this.location),
          base: Number(this.selectedTile),
        };
        this.send(payload)
          .then(() => {
            setTimeout(() => {
              self.init();
            }, 5000);
            Promise.delay(3000).then(() => {
              client.requestAsync('get_bases', this.location).then((result) => {
                [self.bases] = result;
                this.setMainBase({
                  territory: result[0][0].territory,
                  base: result[0][0].base,
                  custom: result[0][0].custom,
                  main: result[0][0].main,
                });
                self.$router.push(`/buildings`);
                self.isLoading = false;
              });
            });
          })
          .catch((e) => {
            this.notify({ type: 'error', message: 'Failed to take base' });
            console.error('Failed to take base', e);
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
      if (this.$store.state.game.user.buildings.find((b) => b.main === 1 && b.territory !== 0)) {
        this.errorMessage = 'You already have a main base!';
      }

      if (!base || !territory) {
        this.errorMessage = 'Please choose a location and a base';
      }
      const now = new Date();
      const isPunished = new Date(Date.parse(this.$store.state.game.user.user.punished));
      if (isPunished > now) {
        this.errorMessage = `Hmm Bad talks are not appropriated in GoldWars, try again after ${isPunished.toLocaleString()}`;
      }

      if (!this.errorMessage)
        try {
          const base = await client.requestAsync('check_base', params);
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
    handleZoom() {
      const bg = document.getElementById('territorybg');
      const canvas_element = document.getElementById('canvas');
      const width = bg.offsetWidth;
      const height = bg.offsetHeight - 300;
      canvas_element.width = width;
      canvas_element.height = height;
      const context = canvas_element.getContext('2d');
      context.scale(1, 0.5);
      context.translate(0, 500);
      context.rotate((-45 * Math.PI) / 180);
    },
    updateLocation(value) {
      const self = this;
      self.bases = null;
      if (self.currentLocation !== self.location) {
        if(value)
        self.currentLocation = value;
        else self.currentLocation = self.location;
        client.requestAsync('get_bases', self.currentLocation).then((result) => {
          [self.bases] = result;
          result[1].forEach((element) => {
            self.bases.push(element);
          });
          self.start();
          self.isLoading = false;
        });
      }
    },
  },
  mounted() {
    const self = this;
    self.bases = null;
    self.currentLocation = self.location;
    client.requestAsync('get_bases', this.location).then((result) => {
      [self.bases] = result;
      result[1].forEach((element) => {
        self.bases.push(element);
      });
      self.start();
      self.isLoading = false;
    });
  },
  // updated() {
  //   const self = this;
  //   self.bases = null;
  //   if (self.currentLocation !== self.location) {
  //     self.currentLocation = self.location;
  //     client.requestAsync('get_bases', this.location).then((result) => {
  //       [self.bases] = result;
  //       result[1].forEach((element) => {
  //         self.bases.push(element);
  //       });
  //       self.start();
  //       self.isLoading = false;
  //     });
  //   }
  // },
};
</script>


<style lang="less" scoped>
.territorybg {
  overflow: hidden;
}

.title {
  position: absolute;
  z-index: 10;
  left: 50%;
  top: 20%;
  text-shadow: 5px 5px 5px black; // pointer-events: none;
  background: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-radius: 5px;
}

// .map-title {
//   position: absolute;
// }
//table{
//}
tr {
  height: 0px;
  width: 0px;
  display: block;
}

td {
  height: 0px;
  width: 0px;
  display: block;
  padding: 0px;
}

.tile {
  transform: translate3d(0em, 0em, 0em);
  width: 4em;
  height: 4em;
  transition: all 1s cubic-bezier(0.22, 0.6, 0.39, 1.42);
}

.tile.hide {
  transform: translate3d(12em, 12em, 0em) !important;
  opacity: 0;
  transition: all 1s cubic-bezier(0.7, -0.4, 0.88, 0.51);
}

.tile > div {
  transform: rotateZ(-45deg) rotateY(-60deg) translate3d(-1.1em, -4.8em, 0em);
  width: 11.5em;
  height: 10em;
  background-size: 1600% 100%;
  background-position: -6px 0px;
  background-repeat: no-repeat;
  background-image: url(http://img14.deviantart.net/f99b/i/2011/354/d/5/isometric_new_tiles_by_spasquini-d4jnp2i.png);
  image-rendering: pixelated;
}

@keyframes showTile {
  from {
    transform: translate3d(12em, 12em, 0em);
    opacity: 0;
  }
  to {
    transform: translate3d(0em, 0em, 0em);
    opacity: 1;
  }
}

@keyframes hideTile {
  from {
    transform: translate3d(0em, 0em, 0em);
    opacity: 1;
  }
  to {
    transform: translate3d(12em, 12em, 0em);
    opacity: 0;
  }
}

.tile > div.tile-0 {
  background-position: calc(-6px + (-183.5px * 0)) 0px;
}

.tile > div.tile-1 {
  background-position: calc(-6px + (-183.5px * 1)) 0px;
}

.tile > div.tile-2 {
  background-position: calc(-6px + (-183.5px * 2)) 0px;
}

.tile > div.tile-3 {
  background-position: calc(-6px + (-183.5px * 3)) 0px;
}

.tile > div.tile-4 {
  background-position: calc(-6px + (-183.5px * 4)) 0px;
}

.tile > div.tile-5 {
  background-position: calc(-6px + (-183.5px * 5)) 0px;
}

.tile > div.tile-6 {
  background-position: calc(-6px + (-183.5px * 6)) 0px;
}

.tile > div.tile-7 {
  background-position: calc(-6px + (-183.5px * 7)) 0px;
}

.tile > div.tile-8 {
  background-position: calc(-6px + (-183.5px * 8)) 0px;
}

.tile > div.tile-9 {
  background-position: calc(-6px + (-183.5px * 9)) 0px;
}

.tile > div.tile-10 {
  background-position: calc(-6px + (-183.5px * 10)) 0px;
}

.tile > div.tile-11 {
  background-position: calc(-6px + (-183.5px * 11)) 0px;
}

.tile > div.tile-12 {
  background-position: calc(-6px + (-183.5px * 12)) 0px;
}

.tile > div.tile-13 {
  background-position: calc(-6px + (-183.5px * 13)) 0px;
}

.tile > div.tile-14 {
  background-position: calc(-6px + (-183.5px * 14)) 0px;
}

.tile > div.tile-15 {
  background-position: calc(-6px + (-183.5px * 15)) 0px;
}
</style>
