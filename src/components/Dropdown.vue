<template>
    <div class="dropdown" @click="toggleRiskLevels" :class="{ expanded: isExpanded }" :style="computedStyles">
        <div v-expand="isExpanded" class="options expand" :class="{ toggled: isExpanded }">
            <div class="d-inline-flex" v-for="option in configOptions" :key="option.key" :class="option">
                <router-link v-if="option.value ==='Attack'" :to="`/actions?type=attack&nickname=${prefix}`"><span class="button button-red">{{ option.value }}</span>
                </router-link>
                <router-link v-if="option.value ==='Transport'" :to="`/actions?type=transport&nickname=${prefix}`"><span class="button button-blue">{{ option.value }}</span>
                </router-link>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'dropdown',
  data() {
    return {
      isBottomSectionToggled: false,
      optionsHeight: 0,
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
  props: ['config', 'prefix'],
  computed: {
    computedStyles() {
      return [
        { '--options-height': `${this.optionsHeight}px` },
        { '--options-height-neg': `-${this.optionsHeight}px` },
        { '--option-height': `${this.optionHeight}px` },
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
    toggleRiskLevels(event) {
      event.preventDefault();
      this.isExpanded = !this.isExpanded;
    },
    setCurrentSelectedOption(option) {
      if (option.value === 'Attack')
        this.$router.push(`/actions?type=attack&nickname=${this.prefix}`);
      if (option.value === 'Transport')
        this.$router.push(`/actions?type=transport&nickname=${this.prefix}`);
      this.$emit('setSelectedOption', option);
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
      this.optionsHeight = this.optionHeight * this.configOptions.length;
    },
  },
  created() {
    this.setConfigData();
    this.setOptionsHeight();
  },
};
</script>

<style lang="less" scoped>
.dropdown {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
  background: transparent;
  cursor: pointer;
  user-select: none;
  transition: all 0.7s linear;
  .dropdown-label-container {
    display: flex;
    width: 100%;
    .dropdown-label {
      justify-content: space-between;
      flex: 1 1 auto;
      align-items: center;
      width: 100%;
      .angle-down {
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;
        padding: 4px;
        width: 1px;
        height: 1px;
        transform: rotate(45deg);
        transition: all 0.7s;
      }
    }
  }
  .toggled {
    margin-bottom: 0px !important;
  }
  .options {
    width: 100%;
    .option {
      align-items: center;
    }
    .option:hover {
      color: #fbbd08 !important;
      background: transparent;
      transition: all 0.7s;
    }
    .option:last-child {
      margin-bottom: 18px !important;
    }
  }
}

.dropdown.expanded {
  background: transparent;
  transition: all 0.7s linear;
}

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

@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
}
</style>
