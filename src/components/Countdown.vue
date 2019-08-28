<template>
    <div class="countdown">
        <div v-show="statusType !== 'expired'">
            <div class="hour">
                <div class="format">Hours</div>
                <span class="number">{{ hours }}</span>
            </div>
            <div class="min">
                <div class="format">Minutes</div>
                <span class="number">{{ minutes }}</span>
            </div>
            <div class="sec">
                <div class="format">Seconds</div>
                <span class="number">{{ seconds }}</span>
            </div>
        </div>
        <div class="message">{{ message }}</div>
        <!-- <div class="status-tag" :class="statusType">{{ statusText }}</div> -->
    </div>
</template>

<script>
export default {
  props: ['starttime', 'endtime', 'trans'],
  data() {
    return {
      timer: '',
      wordString: {},
      start: '',
      end: '',
      interval: '',
      days: '',
      minutes: '',
      hours: '',
      seconds: '',
      message: '',
      statusType: '',
      statusText: '',
    };
  },
  created() {
    this.wordString = JSON.parse(this.trans);
  },
  mounted() {
    this.start = new Date(this.starttime).getTime();
    this.end = new Date(this.endtime).getTime();
    // Update the count down every 1 second
    this.timerCount(this.start, this.end);
    this.interval = setInterval(() => {
      this.timerCount(this.start, this.end);
    }, 1000);
  },
  methods: {
    timerCount(start, end) {
      // Get todays date and time
      const now = new Date().getTime();
      // Find the distance between now an the count down date
      const distance = start - now;
      const passTime = end - now;

      if (distance < 0 && passTime < 0) {
        this.message = this.wordString.expired;
        this.statusType = 'expired';
        this.statusText = this.wordString.status.expired;
        clearInterval(this.interval);
      } else if (distance < 0 && passTime > 0) {
        this.calcTime(passTime);
        this.message = this.wordString.running;
        this.statusType = 'running';
        this.statusText = this.wordString.status.running;
      }
    },
    calcTime(dist) {
      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(dist / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((dist % (1000 * 60)) / 1000);
    },
  },
};
</script>

<style scoped lang="less">
@import '../vars';
.countdown {
  font-size: 20px;
  color: rgb(211, 211, 211);
  text-align: center;
  margin-bottom: 10px;
}

.day,
.hour,
.min,
.sec {
  line-height: 24px;
  font-size: 30px;
  display: inline-block;
  font-weight: 500;
  text-align: center;
  margin: 0 3px;
  font-size: 18px;
  .format {
    font-weight: 300;
    font-size: 14px; //@include margin-start(5);
    //display: inline-block;
    opacity: 0.5;
  }
}

.number {
  color: black;
  font-weight: 600;
  background: #fbbd08;
  border-radius: 5px;
  display: inline-block;
  width: 50px;
  text-align: center;
}

.message {
  font-size: 14px;
  font-weight: 400;
  margin-top: 5px;
}

.status-tag {
  font-weight: 500;
  color: #000;
  text-align: center;
  border-radius: 15px;
  &.upcoming {
    background-color: lightGreen;
  }
  &.running {
    background-color: #fbbd08;
  }
  &.expired {
    background-color: silver;
  }
}
</style>
