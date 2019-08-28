<template>
    <div>
        <GangsTabs/>
        <div class="anim-fade-in">
            <div v-if="embassy.lvl > 0">
                <div class="p-4 text-center">
                    <Loading v-if="isInit" />
                    <div v-else>
                        <h1 class="mb-4">
                            <GangImage class="mr-3" size="120" v-if="mygang && mygang.image" :image="mygang.image" />
                            <div v-if="mygang">{{ mygang.name || mygang.gang }}</div>
                            <span v-if="mygang.ticker">[{{ mygang.ticker }}]</span>
                        </h1>
                        <div>
                            <h3>Choose Action</h3>
                            <div class="py-3 px-0 m-1 columns text-left border-bottom" :key="gang.gang" v-for="gang in gangs" v-if="gang.gang !== mygang.gang">
                                <h2 class="mt-0 column col-6">
                                    <GangImage class="mr-2" size="40" v-if="gang.image" :image="gang.image" />
                                    <router-link v-if="gang && gang.ticker" :to="`/gangs/gang/${gang.gang}`">{{ gang.name || gang.gang }} [{{gang.ticker}}]
                                        <button v-if="otherEvents(gang.gang).event_type ==='alliance' && myEvents(gang.gang).event_type ==='alliance'" class="button ml-2 allies button-green ">
    										<span v-if="!isLoading">ALLIES</span>
    										<SmallLoading v-else/>
    									</button>
                                    </router-link>
    
                                </h2>
                                <div class="column col-6 text-right">
                                    <button v-if="otherEvents(gang.gang).event_type ==='war' || myEvents(gang.gang).event_type ==='war'" @click="handleStop('war',gang.gang)" class="button button-blue mb-2" :disabled="isLoading || otherEvents(gang.gang).event_type ==='war' ||  lastUpdate(myEvents(gang.gang)) && myEvents(gang.gang).event_type ==='war'  || myEvents(gang.gang).event_type !=='war'">
    										<span v-if="!isLoading">stop war</span>
    										<SmallLoading v-else/>
    									</button>
                                    <div v-else>
                                        <button @click="handleSubmit('war',gang.gang)" class="button button-red mb-2 mr-2" :disabled="isLoading || otherEvents(gang.gang).event_type ==='war' || myEvents(gang.gang).event_type ==='war' || myEvents(gang.gang).event_type ==='alliance'">
    										<span v-if="!isLoading">declare war</span>
    										<SmallLoading v-else/>
    									</button>
                                        <button @click="handleSubmit('alliance',gang.gang)" class="button button-green " :disabled="isLoading || myEvents(gang.gang).event_type ==='alliance' || myEvents(gang.gang).event_type ==='war'">
    										<span v-if="!isLoading">offer alliance</span>
    										<SmallLoading v-else/>
    									</button>
                                    </div>
                                    <button v-if="otherEvents(gang.gang).event_type ==='alliance' || myEvents(gang.gang).event_type ==='alliance' " @click="handleStop('alliance',gang.gang)" class="button button-blue mb-2 " :disabled="isLoading || myEvents(gang.gang).event_type !=='alliance'">
    										<span v-if="!isLoading">stop alliance</span>
    										<SmallLoading v-else/>
    									</button>
    
                                    <button v-if="otherEvents(gang.gang).event_type ==='alliance' && myEvents(gang.gang).event_type !=='alliance'" @click="handleSubmit('alliance',gang.gang)" class="button button-blue mb-2 ml-2" :disabled="isLoading || otherEvents(gang.gang).event_type !=='alliance'">
    										<span v-if="!isLoading">accept alliance</span>
    										<SmallLoading v-else/>
    									</button>
                                    <button v-if="otherEvents(gang.gang).event_type ==='alliance' && myEvents(gang.gang).event_type !=='alliance'" @click="handleStop('alliance',gang.gang)" class="button button-blue mb-2 ml-2" :disabled="isLoading || otherEvents(gang.gang).event_type !=='alliance'">
    										<span v-if="!isLoading">refuse alliance</span>
    										<SmallLoading v-else/>
    									</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="p-2 text-center">
                <h2>You must build an embassy first.</h2>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import Promise from 'bluebird';
import client from '@/helpers/client';

export default {
  data() {
    return {
      id: this.$route.params.id,
      isInit: false,
      isLoading: false,
      mygang: null,
      gangs: null,
      members: null,
      message: null,
      user: this.$store.state.game.user.user,
      events: null,
    };
  },
  created() {
    this.isLoading = true;
    this.load_buildings();
    const promises = [
      client.requestAsync('get_gangs', null),
      client.requestAsync('get_gang', this.id),
      client.requestAsync('get_gang_members', this.id),
      client.requestAsync('get_gang_events', this.id),
    ];
    Promise.all(promises).then(result => {
      [this.gangs, [this.mygang], this.members, this.events] = result;
      this.isInit = false;
      this.isLoading = false;
    });
  },
  computed: {
    embassy() {
      return (
        this.$store.state.game.gang_buildings.find(b => b.building === 'embassy') || {
          lvl: 0,
        }
      );
    },
    isBoss() {
      return this.user.role === 'boss' && this.user.gang === this.id;
    },
  },
  methods: {
    ...mapActions(['init', 'send', 'notify', 'refresh_gang_buildings']),
    handleSubmit(type, gang) {
      this.isLoading = true;
      const payload = {
        event: type,
        gang,
        type: 'dw-gang-event',
      };
      this.send(payload)
        .then(result => {
          this.load_events();
          this.isLoading = false;
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to create event' });
          console.error('Failed to create gang', e);
          this.isLoading = false;
        });
    },
    handleStop(type, gang) {
      this.isLoading = true;

      const payload = {
        event: type,
        gang,
        type: 'dw-gang-stop-event',
      };
      this.send(payload)
        .then(() => {
          this.load_events();
          this.isLoading = false;
        })
        .catch(e => {
          this.notify({ type: 'error', message: 'Failed to create event' });
          console.error('Failed to create gang', e);
          this.isLoading = false;
        });
    },
    load_buildings() {
      this.isLoading = true;
      this.refresh_gang_buildings()
        .then(() => {
          this.isLoading = false;
        })
        .catch(e => {
          console.error('Failed', e);
          this.isLoading = false;
        });
    },
    load_events() {
      this.isLoading = true;
      const promises = [
        client.requestAsync('get_gangs', null),
        client.requestAsync('get_gang', this.id),
        client.requestAsync('get_gang_members', this.id),
        client.requestAsync('get_gang_events', this.id),
      ];
      Promise.all(promises).then(result => {
        [this.gangs, [this.mygang], this.members, this.events] = result;
        this.isInit = false;
        this.isLoading = false;
      });
    },
    otherEvents(gang) {
      const event = this.events.filter(item => item.gang === gang);
      if (event[0]) return event[0];
      return event;
    },
    myEvents(gang) {
      const event = this.events.filter(item => item.others === gang);
      if (event[0]) return event[0];
      return event;
    },
    lastUpdate(event) {
      const now = new Date();
      if (now < new Date(Date.parse(event.next_update))) {
        return true;
      }

      return false;
    },
  },
};
</script>


<style scoped lang="less">
@import '../../vars.less';
.allies {
  margin-top: 5px !important;
  position: absolute;
}
</style>
