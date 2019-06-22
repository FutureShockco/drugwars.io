<template>
    <div id="territorybg" class="territorybg">
        <canvas id="canvas" class="mt-1"></canvas>
        <h3 class="title" id="title" style="opacity:0;">
            <div v-if="selectedTile">BASE {{selectedTile}}</div>
            <h5 class="mt-0">UNDER THE CONTROL OF :
                <span v-if="currentNickname">{{currentNickname}}</span>
                <span v-else>Nobody </span>
            </h5>
            <div>INFORMATIONS</div>
            <h5 class="mt-0">HQ LEVEL : {{currentHq}}</h5>
            <h5 class="mt-0">DETAIL : {{customName}}</h5>
        </h3>
        <div class="map-title" id="visit" style="opacity:0;">
            <router-link v-if="selectedTile && currentNickname && currentNickname != nickname" :to="`/actions/fight?target=${location}&base=${selectedTile}`">
                <button class="button button-red">ATTACK</button>
            </router-link>
            <router-link v-if="selectedTile && currentNickname && currentNickname != nickname" :to="`/actions/transport?target=${location}&base=${selectedTile}`">
                <button class="button button-blue">CARRY</button>
            </router-link>
            <router-link v-else-if="currentNickname != nickname" :to="`/actions/occup?target=${location}&base=${selectedTile}`">
                <button class="button button-blue">CREATE NEW BASE</button>
            </router-link>
            <button v-if="currentNickname === nickname && location == base.territory && selectedTile == base.base" class="button button-blue">
                  ALREADY SELECTED
                  </button>
            <button v-else-if="currentNickname === nickname" class="button button-blue" @click="selectBase()">
                  SELECT
                  </button>
    

            <button v-if="!main" class="button button-blue" @click="handleSubmit()">CHOOSE AS PRIMARY BASE</button>
        </div>
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
            location: this.$route.query.location || null,
            selectedTile: null,
            selected: null,
            customName: null,
            currentNickname: null,
            currentHq: null,
            nickname: this.$store.state.game.user.user.nickname,
            bases: [],
        };
    },
    computed: {
        main() {
            if (this.base)
                return this.$store.state.game.user.buildings.find(b => b.main === 1) || null;
        },
        base() {
            console.log(this.$store.state.game.base)
            return this.$store.state.game.base;
        },
        ownOccupationTroop() {
            if (this.$store.state.game.user.units.find(u => u.unit === 'spy'))
                return (
                    this.$store.state.game.user.units.find(u => u.unit === 'spy').amount || {
                        amount: 0,
                    }
                );
            return 0;
        },
    },
    methods: {
        init() {
            const self = this;
            let bg = document.getElementById('territorybg');
            var canvas_element = document.getElementById('canvas');
            canvas_element.width = bg.offsetWidth;
            canvas_element.height = bg.offsetHeight;
            let context = canvas_element.getContext('2d');

            let tiles_array = [];

            const TILE_TYPES = {
                sea: { name: 'Sea', color: 'lightBlue' },
                land: { name: 'Land', color: 'black' }
            }

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
                    end: x + width
                }
                this.workHeight = {
                    start: y,
                    end: y + height
                }
                this.fillColor = fillColor;
                this.strokeStyle = 'black';
            }

            const visitTitle = document.getElementById('title');
            const visitButton = document.getElementById('visit');
            canvas_element.onclick = function(e) {
                event = e;
                var elementClickedId = checkClick(event);
                if (self.selectedTile != null && self.currentNickname != null) {
                    tiles_array[self.selectedTile - 1].fillColor = 'blue';
                } else if (self.selectedTile != null) {
                    tiles_array[self.selectedTile - 1].fillColor = 'black';
                }
                console.log(elementClickedId)
                self.selectedTile = elementClickedId.id;
                self.currentNickname = elementClickedId.nickname
                self.currentHq = elementClickedId.hq
                self.customName = elementClickedId.custom_name
                self.isMain = elementClickedId.main
                if (elementClickedId.nickname === self.nickname) {
                    tiles_array[elementClickedId.id - 1].fillColor = 'green';
                } else {
                    tiles_array[elementClickedId.id - 1].fillColor = 'red';
                }
                visitButton.style.top = `${tiles_array[elementClickedId.id].y +50}px`;
                visitButton.style.left = `${tiles_array[elementClickedId.id].x -35}px`;
                visitButton.style.opacity = 1;
                visitTitle.style.top = `${tiles_array[elementClickedId.id].y + 60}px`;
                visitTitle.style.left = `${tiles_array[elementClickedId.id].x -35}px`;
                visitTitle.style.opacity = 1;

                drawTiles();
            };

            canvas_element.onmousemove = function(e) {
                let elementUnder = checkClick(event);
                if (elementUnder == 1) {
                    changeCursor('pointer');
                } else {
                    changeCursor('default');
                }
            }

            canvas_element.onmouseout = function(e) {
                changeCursor('default');
            };


            function checkClick(event) {
                let clickX = event.layerX;
                let clickY = event.layerY;

                var element;

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
                let quantityAll = quantityX * quantityY + 2;
                var tileWidth = canvas_element.width / quantityX;
                let tileHeight = canvas_element.height / quantityY;

                var drawPosition = {
                    x: 0,
                    y: 0
                }
                for (var i = 1; i < quantityAll; i++) {
                    var fillColor = TILE_TYPES.land.color;
                    var nickname = ''
                    var level = '';
                    var custom_name = '';
                    var main = '';
                    self.bases.forEach(element => {
                        if (element.base === i) {
                            fillColor = 'blue';
                            nickname = element.nickname;
                            level = element.lvl;
                            custom_name = element.custom;
                            main = element.main;
                        }
                    });
                let tile = new Tile(drawPosition.x, drawPosition.y, tileWidth, tileHeight, i, nickname, level, custom_name, main, fillColor);
                tiles_array.push(tile);

                drawPosition.x += tileWidth;
                if (drawPosition.x >= canvas_element.width) {
                    drawPosition.x = 0;
                    drawPosition.y += tileHeight;
                }
            }

        }
        createTiles(20, 20);

        function drawTiles() {
            tiles_array.forEach(tile => {
                context.beginPath();
                context.fillStyle = tile.fillColor;
                context.rect(tile.x, tile.y, tile.width, tile.height);
                context.lineWidth = '5';
                context.strokeStyle = tile.strokeStyle;
                context.strokeStyle = '#ffc508';
                context.stroke()
                context.fill();
                context.textAlign = 'center';
                context.font = '16px American Captain';
                context.fillStyle = '#fff';
                context.fillText(tile.id, tile.x + 16, tile.y + 26);
            });
        }
        drawTiles();

        function changeCursor(cursorType) {
            document.body.style.cursor = cursorType;
        }
        this.showLoading = false;
    },
    ...mapActions(['send', 'notify', 'setBase']),
    async handleSubmit() {
        const self = this;
        const isValid = await this.validateFormFree();
        console.log(this.location)
        this.isLoading = true;
        if (isValid && this.location && this.selectedTile) {
            const payload = {
                type: 'dw-firstloc',
                territory: Number(this.location),
                base: Number(this.selectedTile),
            };
            this.send(payload)
                .then(() => {
                    client.requestAsync('get_bases', this.location).then(result => {
                        console.log(result);
                        self.bases = result;
                        self.setBase(self.bases);
                        self.isLoading = false;
                    });
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
        if (this.$store.state.game.user.buildings.find(b => b.main === 1 && b.territory != 0)) {
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
        console.log(territory, base, custom, main);
        this.setBase({ territory, base, custom, main });
    },
},
mounted() {
    const self = this;
    client.requestAsync('get_bases', this.location).then(result => {
        console.log(result);
        self.bases = result;
        self.init();
        self.isLoading = false;
    });
},
};
</script>


<style lang="less" scoped>
.territorybg {
    height: calc(100vh - 98px);
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
    pointer-events: none;
    background: rgba(0, 0, 0, 1);
    padding: 20px;
    border-radius: 5px;
}

.map-title {
    position: absolute;
}
</style>
