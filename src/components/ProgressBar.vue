<template>
    <div class="v-circle" v-bind:style="circleStyle">
        <div class="total">{{total | amount}}/{{cost | amount}}</div>
        <div class="mask full" v-bind:style="[maskStyle, transitionStyle, rotateStyle]">
            <div class="fill" v-bind:style="[fillStyle, transitionStyle, rotateStyle]"></div>
        </div>
        <div class="mask half" v-bind:style="[maskStyle]">
            <div class="fill" v-bind:style="[fillStyle, transitionStyle, rotateStyle]"></div>
            <div class="fill fix" v-bind:style="[fillStyle, fixStyle, transitionStyle]"></div>
        </div>
        <div class="pv" v-bind:style="pvStyle">
            <Icon class="icon" :name="icon" size="36" />
            <div class="progress" v-bind:style="progressTextStyle">
                {{ pv +'%'|| 0 }}
            </div>
        </div>
    </div>
</template>

<script>
const DEFAULT_WIDTH = 150,
  DEFAULT_BOLD = 0,
  DEFAULT_FONT_SIZE = 64,
  DEFAULT_BORDER_COLOR = '#bdc3c7',
  DEFAULT_TEXT_COLOR = '#bdc3c7',
  DEFAULT_FILL_COLOR = '#2ecc71',
  DEFAUTL_BG_COLOR = '#f9f9f9';
export default {
  methods: {
    setClip(t, r, b, l) {
      return `rect(${t}px, ${r}px, ${b}px, ${l}px)`;
    },
    setTransformStyle(pv, type) {
      const deg = Math.floor((pv / 100) * 180);
      if (type === 'fix') {
        // remove the gap between two half circles
        return `rotate(${deg * 2}deg)`;
      }
      return `rotate(${deg}deg)`;
    },
    setTransitionStyle(t) {
      return `transform ${t}s`;
    },
    setPv(pv) {
      this.pv = pv;
      const types = ['fix', 'rotate'];
      // map styles
      types.map(type => {
        this[`${type}Style`] = {
          transform: this.setTransformStyle(this.pv, type),
        };
      });
    },
  },
  props: [
    'icon',
    'color',
    'width',
    'fontSize',
    'pv',
    'total',
    'cost',
    'textColor',
    'bold',
    'textBgColor',
    'borderColor',
    'during',
    'bgColor',
    'selected',
  ],
  watch: {
    pv(val, oldVal) {
      if (val < 50) {
        this.setPv(this.pv);
      } else {
        this.setPv(this.pv);
      }
    },
  },
  data() {
    const transformStyleValue = this.setTransformStyle(this.pv);
    const innerCircleWidth = `${(this.width || DEFAULT_WIDTH) - 2 * (this.bold || DEFAULT_BOLD)}px`;
    const fixTransformStyleValue = this.setTransformStyle(this.pv, 'fix');
    const transitionStyleValue = this.setTransitionStyle(this.during || 0.8);
    return {
      circleStyle: {
        borderColor: this.borderColor || DEFAULT_BORDER_COLOR,
        borderStyle: 'solid',
        borderWidth: `${DEFAULT_BOLD}px`,
        width: `${this.width || DEFAULT_WIDTH}px`,
        height: `${this.width || DEFAULT_WIDTH}px`,
        backgroundColor: this.bgColor || DEFAUTL_BG_COLOR,
        backgroundImage: 'linear-gradient(147deg, #FFDD00 0%, #FBB034 74%)',
      },
      progressTextStyle: {
        fontSize: `${this.fontSize || DEFAULT_FONT_SIZE}px`,
        color: this.textColor || DEFAULT_TEXT_COLOR,
      },
      fillStyle: {
        backgroundColor: this.color || DEFAULT_FILL_COLOR,
        width: `${this.width || DEFAULT_WIDTH}px`,
        height: `${this.width || DEFAULT_WIDTH}px`,
        clip: this.setClip(0, this.width / 2, this.width, 0),
      },
      rotateStyle: {
        transform: transformStyleValue,
        webkitTransform: transformStyleValue,
        msTransform: transformStyleValue,
        oTransform: transformStyleValue,
        mozTransform: transformStyleValue,
      },
      transitionStyle: {
        transition: transitionStyleValue,
        webkitTransition: transitionStyleValue,
        mozTransition: transitionStyleValue,
        oTransition: transitionStyleValue,
        msTransition: transitionStyleValue,
      },
      maskStyle: {
        width: `${this.width || DEFAULT_WIDTH}px`,
        height: `${this.width || DEFAULT_WIDTH}px`,
        clip: this.setClip(0, this.width, this.width, this.width / 2),
      },
      pvStyle: {
        width: innerCircleWidth,
        height: innerCircleWidth,
        lineHeight: innerCircleWidth,
      },
      fixStyle: {
        transform: fixTransformStyleValue,
        webkitTransform: fixTransformStyleValue,
        mozTransform: fixTransformStyleValue,
        oTransform: fixTransformStyleValue,
        msTransform: fixTransformStyleValue,
      },
    };
  },
};
</script>


<style lang="less" scoped>
@import '../vars.less';
.icon {
  position: relative;
  top: 5px;
  z-index: 0;
}

.total {
  z-index: 45;
  font-size: 16px;
  text-align: center;
  margin-left: calc(50% - 50px);
  width: 100px;
  height: 20px;
  top: -25px;
  position: absolute;
  border-radius: 5px;
  padding-top: 12px;
  background-color: #2d3436;
  background-image: linear-gradient(180deg, #141414 0%, #000000 74%);
}

.v-circle {
  font-family: @heading-font;
  line-height: 0px;
  border-radius: 50%;
  margin-top: 15px;
  box-shadow: 0px 0px 7px #919191;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  .mask,
  .fill {
    position: absolute;
    border-radius: 50%;
    backface-visibility: hidden;
  }
  .pv {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 1;
    border-radius: 50%;
    line-height: 0px !important;
    text-align: center;
    .progress {
      position: relative;
      margin-top: 40px;
      padding: 0;
      text-shadow: 5px 5px 5px black;
      text-align: center;
      margin-left: calc(50% - 40px);
      width: 80px;
    }
  }
}
</style>
