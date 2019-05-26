<template>
	<transition name="vb-transition">
		<div class="vb-wrapper" v-if="!closed">
			<div :class="classes">
				<div class="vb-header">
					<div class="vb-title">{{ title }}</div>
					<div class="vb-buttons">
						<i
							class="iconfont icon-arrow-up"
							aria-hidden="true"
							v-if="concise && !maximized && !hideConciseButton"
							@click="concise = false"
						></i>
						<i
							class="iconfont icon-arrow-down"
							aria-hidden="true"
							v-if="!concise && !maximized && !hideConciseButton"
							@click="concise = true"
						></i>
					</div>
				</div>
				<div class="black p-1">
					<button class="button button-black">Main</button>
					<button class="button button-black">
						Gang
						<span class="text-red">0</span>
					</button>
					<button class="button button-black">
						Private
						<span class="text-red">0</span>
					</button>
					<button class="button button-black">Users</button>
				</div>
				<div class="vb-content">
					<div class="vb-content-slot">
						<slot></slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
  props: {
    // balloon title
    title: {
      default: '',
      type: String,
    },

    // position: bottom-right, bottom-left, top-right, or top-left
    position: {
      default: 'bottom-right',
      type: String,
    },

    // enable the css transform: scale() effect
    zooming: {
      default: false,
      type: Boolean,
    },

    // hide the close (x) icon on the balloon
    hideCloseButton: {
      default: false,
      type: Boolean,
    },

    // hide the concise (chevron) icons on the balloon
    hideConciseButton: {
      default: false,
      type: Boolean,
    },

    // when balloon is created it will have this initial 'concise' state
    initiallyConcise: {
      default: false,
      type: Boolean,
    },

    // when balloon is maximized, it will still have the close button
    showCloseWhenMaximized: {
      default: false,
      type: Boolean,
    },

    //* vb internal props *//

    // keep track of state with multiple balloons
    balloonState: {
      default() {
        return {
          maximized: null,
        };
      },
      type: Object,
    },

    // remember the original balloon object to store in the balloon state
    balloon: {
      default() {
        return {};
      },
      type: Object,
    },

    // force the minimized state, used in the balloon set dock
    forceMinimized: {
      default: false,
      type: Boolean,
    },
  },

  data() {
    return {
      concise: this.initiallyConcise,
      closed: false,
    };
  },

  watch: {
    'balloonState.maximized': function(n, o) {
      // if maximized balloon changed from this one trigger a minimize event
      if (o === this.balloon && n !== this.balloon) {
        this.$emit('minimize', this);
        // else if maximized balloon changed to this one trigger a maximize event
      } else if (o !== this.balloon && n === this.balloon) {
        this.$emit('maximize', this);
      }
    },
  },

  computed: {
    classes() {
      return [
        'vb',
        this.position ? `vb-${this.position}` : '',
        this.concise ? 'vb-concise' : '',
        this.maximized ? 'vb-maximized' : '',
        !this.maximized && this.zooming ? 'vb-zoomed-out' : '',
      ];
    },

    maximized() {
      return this.balloonState.maximized === this.balloon && !this.forceMinimized;
    },
  },

  methods: {
    close() {
      this.closed = true;
      this.$emit('close', this);
    },

    open() {
      this.closed = false;
      this.$emit('open', this);
    },

    maximize() {
      this.balloonState.maximized = this.balloon;
    },

    minimize() {
      this.balloonState.maximized = null;
    },
  },
};
</script>

<style lang="scss" scoped>
$transition-length: 0.25s;
$transition-length-long: $transition-length * 2;
$balloon-base-width: 360px;
$content-ratio: 32/16;
$minimized-padding: 15px;
$maximized-padding: 20px;
$small-screen-width: 360px;
$small-screen-height: 450px;

.vb-set-maximized {
  transition: opacity $transition-length-long;
  opacity: 1;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10001;
}

.vb-wrapper:not(.vb-multiple) .vb,
.vb-set-minimized {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;

  &.vb-bottom-right {
    left: calc(100% - #{$minimized-padding});
    top: calc(100% - #{$minimized-padding});
    transform: translate(-100%, -100%);
  }

  &.vb-bottom-left {
    left: #{$minimized-padding};
    top: calc(100% - #{$minimized-padding});
    transform: translate(0%, -100%);
  }

  &.vb-top-left {
    left: #{$minimized-padding};
    top: #{$minimized-padding};
    transform: translate(0%, 0%);
  }

  &.vb-top-right {
    left: calc(100% - #{$minimized-padding});
    top: #{$minimized-padding};
    transform: translate(-100%, 0%);
  }
}

.vb-set-minimized {
  padding: 5px;
  width: calc(100vw - #{$minimized-padding * 2} - 10px);
  max-height: calc(100vh - #{$minimized-padding * 2} - 10px);
  white-space: nowrap;
  overflow: auto;

  .vb-content-slot {
    white-space: normal;
    text-align: left;
  }

  .vb-wrapper {
    position: relative;
    display: inline-block;
  }

  .vb {
    position: static;
    transform: none;
    top: 0;
    left: 0;
  }

  &.vb-top-right,
  &.vb-bottom-right {
    text-align: right;

    .vb-wrapper:not(:first-child) {
      margin-left: $minimized-padding;
    }
  }

  &.vb-top-left,
  &.vb-bottom-left {
    .vb-wrapper:not(:last-child) {
      margin-right: $minimized-padding;
    }
  }

  &.vb-top-left,
  &.vb-top-right {
    .vb-wrapper:not(:last-child) {
      margin-bottom: $minimized-padding;
    }
  }

  &.vb-bottom-left,
  &.vb-bottom-right {
    .vb-wrapper:not(:last-child) {
      margin-top: $minimized-padding;
    }
  }
}

.vb-wrapper,
.vb-wrapper:not(.vb-multiple) {
  transition: opacity $transition-length;

  .vb {
    @media screen and (max-width: $small-screen-width),
      screen and (max-height: $small-screen-height) {
      .vb-content {
        height: 0px;
        max-height: 0px;
      }

      .fa-chevron-down,
      .fa-chevron-up {
        display: none;
      }
    }

    &.vb-maximized {
      position: fixed;
      left: 50%;
      top: $maximized-padding;
      transform: translate(-50%, 0);

      box-shadow: 0px 0px 0px rgba(black, 0.4);

      .vb-content {
        width: calc(100vw - #{2 * $maximized-padding});
        max-width: 1200px;
        height: calc(100vh -200px);
        max-height: calc(100vh - 46px);
        overflow: auto;
      }

      .vb-content-slot {
        transform-origin: 0% 0%;
        transform: scale(1);
        width: 100%;
        height: 100%;
      }

      .vb-header {
        padding: 13px;

        i {
          font-size: 20px;
        }
      }

      .vb-title {
        max-width: calc(100% - 50px);
        top: 15px;
        left: 10px;
      }
    }

    &.vb-zoomed-out {
      .vb-content-slot {
        transform-origin: 0% 0%;
        transform: scale(1);
      }
    }
  }

  .vb-header {
    background: #030303;
    color: #fbbd08;
    padding: 5px;
    height: 20px;
    border-bottom: 1px solid rgb(10, 10, 10);
    box-sizing: content-box;

    .vb-title {
      transition: opacity $transition-length;
      float: left;
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      position: absolute;
      top: 5px;
      left: 5px;

      &:hover {
        opacity: 0.7;
      }
    }

    .vb-buttons {
      float: right;
    }

    i {
      transition: opacity $transition-length;

      cursor: pointer;
      font-size: 15px;
      margin-left: 5px;

      &:hover {
        opacity: 0.5;
      }
    }
  }

  .vb-content {
    position: relative;
    width: $balloon-base-width;
    height: calc(100vh - 200px);
    max-width: $balloon-base-width;
    max-height: calc(100vh - 200px);
    overflow: hidden;

    background: #000000;
  }

  .vb-content-slot {
    transform-origin: 0% 0%;
    transform: scale(1);
    width: 100%;
    height: 100%;
  }

  .vb-maximized-overlay {
    transition: opacity $transition-length-long;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: black;
    z-index: 9999;
    opacity: 0.7;
  }

  .vb-minimized-overlay {
    transition: opacity $transition-length;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    background: black;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    i {
      color: white;
      font-size: 3em;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

.vb-transition-enter,
.vb-transition-leave-active {
  opacity: 0 !important;
}

.vb-multiple .vb-maximized-overlay {
  z-index: -1;
}

.vb {
  box-shadow: 0px 1px 5px rgba(#444, 0.7);

  border-radius: 2px;
  overflow: auto;

  &.vb-concise {
    .vb-content {
      height: 0px;
      max-height: 0px;
    }
  }
}

.vb-front {
  z-index: 10004;
}

.black {
  background: black;
  color: gray !important;
}
.black button {
  background: black;
  color: rgb(51, 51, 51) !important;
}
</style>
