<template>
    <div v-if="config.prefix" class="dropdown" @click="toggleRiskLevels" :class="{ expanded: isExpanded }">
        <div class="dropdown-label-container">
            <div class="dropdown-label">
                <span class="text text-blue" v-if="config.prefix.main || config.prefix.custom === 'primary'">
               Primary
               </span>
                <span class="text text-orange" v-else>
               {{config.prefix.custom}}
            </span>
                <span class="text">
              {{config.prefix.territory}} : {{config.prefix.base}}
            </span>
                <i class="iconfont icon-arrow-down" :class="{ toggled: isExpanded }"></i>
            </div>
        </div>
    
        <div v-expand="isExpanded" class="options expand">
            <div v-for="building in buildings" :key="building.key">
                <div class="option" v-if="building.building === 'headquarters'">
                    <router-link class="text-green" :to="`/map/territory?location=${building.territory}`"><i class="iconfont icon-eye mr-1"></i>
                    </router-link>
                    <span class="text text-blue" v-if="building.main || building.custom === 'primary'" @click="setCurrentSelectedOption(building)">
               Primary
            </span>
                    <span class="text text-orange" v-else @click="setCurrentSelectedOption(building)">
               {{building.custom}}
            </span>
                    <span class="ml-1">
    				  {{ building.territory }}:{{ building.base }}
              </span>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <router-link class="text-green" :to="`/map`">
            SELECT A LOCATION
        </router-link>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'dropdown',
  data() {
    return {
      isBottomSectionToggled: false,
      optionHeight: 35,
      width: 100,
      configOptions: [],
      backgroundColor: '#cde4f5',
      backgroundExpandedColor: '#fff',
      hoverBackgroundColor: '#0084d4',
      border: '1px solid  #232b35',
      borderRadius: 0,
      textColor: '#fff',
      isExpanded: false,
    };
  },
  components: {},
  computed: {
    buildings() {
      return this.$store.state.game.user.buildings || null;
    },
    optionsHeight() {
      return this.configOptions.length * this.optionHeight;
    },
    config() {
      return {
        prefix: this.$store.state.game.mainbase || null,
        backgroundColor: 'green',
      };
    },
    computedStyles() {
      return [
        { '--options-height': `${this.optionsHeight}px` },
        { '--options-height-neg': `-${this.optionsHeight}px` },
        { '--option-height': `${this.optionsHeight}px` },
        { '--main-el-border-radius': this.borderRadius },
        { '--dropdown-width': `${this.width}px` },
        { '--dropdown-background-color': this.backgroundColor },
        { '--dropdown-expanded-color': this.backgroundExpandedColor },
        { '--dropdown-border': this.border },
        { '--dropdown-hover-background-color': this.hoverBackgroundColor },
        { '--dropdown-default-text-color': this.textColor },
      ];
    },
  },
  directives: {
    expand: {
      inserted(el, binding) {
        if (binding.value !== null) {
          function calcHeight() {
            const currentState = el.getAttribute('aria-expanded');
            el.classList.add('u-no-transition');
            el.removeAttribute('aria-expanded');
            el.style.height = null;
            el.style.height = `${el.clientHeight}px`;
            el.setAttribute('aria-expanded', currentState);

            setTimeout(() => {
              el.classList.remove('u-no-transition');
            });
          }
          el.classList.add('expand');
          el.setAttribute('aria-expanded', binding.value ? 'true' : 'false');
          calcHeight();
          window.addEventListener('resize', calcHeight);
        }
      },
      update(el, binding) {
        if (el.style.height && binding.value !== null) {
          el.setAttribute('aria-expanded', binding.value ? 'true' : 'false');
        }
      },
    },
  },
  methods: {
    ...mapActions(['setMainBase']),
    toggleRiskLevels() {
      this.isExpanded = !this.isExpanded;
    },
    setCurrentSelectedOption(building) {
      this.config.prefix = building;
      const territory = this.config.prefix.territory;
      const base = this.config.prefix.base;
      const custom = this.config.prefix.custom;
      const main = this.config.prefix.main;
      this.setMainBase({ territory, base, custom, main });
      // this.$emit("setSelectedOption", building);
    },
    setConfigData() {
      this.configOptions = this.config.options;
      this.width = this.config.width;
      this.placeholder = this.config.placeholder;
      if (this.config.backgroundColor) {
        this.backgroundColor = this.config.backgroundColor;
      }
      if (this.config.backgroundExpandedColor) {
        this.backgroundExpandedColor = this.config.backgroundExpandedColor;
      }
      if (this.config.border) {
        this.border = this.config.border;
      }
      if (this.config.hoverBackgroundColor) {
        this.hoverBackgroundColor = this.config.hoverBackgroundColor;
      }
      if (this.config.textColor) {
        this.textColor = this.config.textColor;
      }
      if (this.config.borderRadius) {
        this.borderRadius = this.config.borderRadius;
      }
    },
    setOptionsHeight() {
      if (this.config.prefix && this.config.prefix.length > 0)
        this.optionsHeight = this.optionHeight * this.config.prefix.length;
    },
  },
  created() {
    this.setConfigData();
    this.setOptionsHeight();
  },
  updated() {
    if (!this.config.prefix) {
      this.config = {};
      this.config.prefix = this.$store.state.game.mainbase;
      const territory = this.config.prefix.territory;
      const base = this.config.prefix.base;
      const custom = this.config.prefix.custom;
      const main = this.config.prefix.main;
      this.setMainBase({ territory, base, custom, main });
    }
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
// * * * Variables * * *
$default-text-hover-color: black;
$default-hover-color: #cde4f5;
$default-text-color: #fff;
$option-padding: 2px 10px;
.dropdown {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: var(--dropdown-width);
  position: relative;
  border: 1px solid transparent;
  border-radius: var(--main-el-border-radius);
  cursor: pointer;
  background: var(--dropdown-background-color);
  user-select: none;
  transition: all 0.7s linear;
  .dropdown-label-container {
    display: flex;
    width: 100%;
    .dropdown-label {
      display: flex;
      justify-content: space-between;
      flex: 1 1 auto;
      align-items: center;
      height: var(--option-height);
      .text {
        font-size: 17px;
        max-width: 70px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .angle-down {
        display: flex;
        justify-content: center;
        align-items: center;
        border: solid $default-text-color;
        background: transparent;
        border-width: 0 2px 2px 0;
        padding: 4px;
        width: 1px;
        height: 1px;
        margin: -3px 5px 0 0;
        border-color: var(--dropdown-default-text-color);
        transform: rotate(45deg);
        transition: all 0.7s;
      }
      .toggled {
        margin-bottom: 0px;
        transform: rotate(-180deg);
        transition: all 0.7s;
      }
    }
  }
  .options {
    width: 100%;
    .option {
      display: flex;
      align-items: center;
      height: 35px;
      font-size: 15px;
      .text {
        font-size: 17px;
        width: 90px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    .option:hover {
      color: #ffc508;
      transition: all 0.7s;
    }
    .option:last-child {
      border-radius: 0 0 var(--main-el-border-radius) var(--main-el-border-radius);
    }
    .option:last-child:hover {
      border-radius: 0 0 var(--main-el-border-radius) var(--main-el-border-radius);
    }
  }
}

.dropdown.expanded {
  background: var(--dropdown-expanded-color);
  border: var(--dropdown-border);
  transition: all 0.7s linear;
}

// Expand Class - Most important part
.expand {
  overflow: hidden;
  transition-property: height;
  transition-duration: 0.4s; // Durations can be changed without touching JS
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275); // Timing functions also!
  &[aria-expanded='false'] {
    height: 0 !important;
    transition-timing-function: cubic-bezier(0.6, -0.28, 0.735, 0.045);
  }
}

// Smartphones - Landscape + Portrait
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
}
</style>
