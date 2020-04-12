<template>
    <div>
        <div class="black p-0">
            <!-- <button class="button white" @click="displayChat()">Public</button> -->
            <button v-if="user.gang" class="button white" @click="displayGangChat()">
    				Gang 	<span class="text-red">{{gangresponses.length}}</span>
    			</button>
            <button class="button white" @click="displayPrivateChat()">
    				Private 		<span class="text-red">{{privateresponses.length}}</span>
    			</button>
            <button @click="displayUsers()" class="button white">
    				Users
    				<span class="text-red">{{members.length}}</span>
    			</button>
        </div>
        <!-- <div v-if="showChat" class="chat">
            <div :key="response.id" v-for="response in responses" class="border-bottom">
                <div class="text-left item width-full p-2">
                    <div class="columns">
                        <div class="column pl-3 pr-0 col-2">
                            <div v-if="response.sender != user.nickname" :to="`/actions?target=${response.sender}`">
                                <ChatAvatar :size="30" :username="response.sender" :picture="response.picture" :reputation="'none'" />
                                 <i class="iconfont icon-comment-discussion" @click="sendPm(response.sender)"></i>
                            </div>
                            <ChatAvatar v-else :size="30" :username="response.sender" :picture="response.picture" :reputation="'none'"/>
                        </div>
                        <div class="column col-8 mt-0 px-0 message text-left">
                        <h5 class="my-0 py-0 sender" :class="{'text-blue' : response.sender === user.nickname}"><span @click="sendMessage(response.sender)">{{response.sender}}</span> <router-link v-if="response.gang" :to="`/gangs/gang/${response.gang}`"><span class="gang">[{{response.gang}}]</span></router-link></h5>
                      <div  v-if="response.text" v-html="checkUrl(response.text)"></div>
                        </div>
                        <div class="column date pr-0 col-1">{{response.date}}</div>
                    </div>
                </div>
            </div>
        </div> -->
        <div v-if="gangChat" class="gangchat">
            <div :key="response.id" v-for="response in gangresponses" class="border-bottom">
                <div  class="text-left item width-full p-2">
                                     <div class="columns">
                        <div class="column pl-3 pr-0 col-2">
                            <div v-if="response.sender != user.nickname" :to="`/actions?target=${response.sender}`">
                                <ChatAvatar :size="30" :username="response.sender" :picture="response.picture" :reputation="'none'" />
                                 <i class="iconfont icon-comment-discussion" @click="sendPm(response.sender)"></i>
                            </div>
                            <ChatAvatar v-else :size="30" :username="response.sender" :picture="response.picture" :reputation="'none'"/>
                        </div>
                        <div class="column col-8 mt-0 px-0 message text-left">
                        <h5 class="my-0 py-0 sender" :class="{'text-blue' : response.sender === user.nickname}"><span @click="sendMessage(response.sender)">{{response.sender}}</span>  <router-link v-if="response.gang" :to="`/gangs/gang/${response.gang}`"><span class="gang">[{{response.gang}}]</span></router-link></h5>
                      <div  v-if="response.text" v-html="checkUrl(response.text)"></div>
                        </div>
                        <div class="column date pr-0 col-1">{{response.date}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="privateChat" class="privatechat">
           <div class="text-center" v-if="receiver"> TO {{receiver}} </div>
            <div :key="response.id" v-for="response in privateresponses" class="border-bottom">
                <div  class="text-left item width-full p-2">
                                     <div class="columns">
                        <div class="column pl-3 pr-0 col-2">
                            <div v-if="response.sender != user.nickname" :to="`/actions?target=${response.sender}`">
                                <ChatAvatar :size="30" :username="response.sender" :picture="response.picture" :reputation="'none'" />
                                <i v-if="!receiver" class="iconfont icon-comment-discussion" @click="sendPm(response.sender)"></i>
                            </div>
                            <ChatAvatar v-else :size="30" :username="response.sender" :picture="response.picture" :reputation="'none'"/>
                        </div>
                        <div class="column col-8 mt-0 px-0 message text-left">
                        <h5 class="my-0 py-0 sender" :class="{'text-blue' : response.sender === user.nickname}"><span @click="sendMessage(response.sender)">{{response.sender}}</span><router-link v-if="response.gang" :to="`/gangs/gang/${response.gang}`"><span class="gang">[{{response.gang}}]</span></router-link></h5>
                      <div  v-if="response.text" v-html="checkUrl(response.text)"></div>
                        </div>
                        <div class="column date pr-0 col-1">{{response.date}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showUsers" class="users text-center">
            <div :key="member.id" v-for="member in members" class="border-bottom text-center">
                <ChatAvatar class="pt-3" :size="40" :username="member.name" :picture="member.picture" :reputation="'none'"/>
                <h5 class="mt-1 sender">{{member.name}} {{member.gang}}</h5>
                  <i v-if="member.name != user.nickname" class="iconfont icon-comment-discussion" @click="sendPm(member.name)"></i>
            </div>
        </div>
        <div v-else class="px-4 pt-2 reply text-center">
            <Loading v-if="isLoading" />
            <div v-else>
                <div class="columns" v-if="showChat || gangChat || receiver">
                    <h5 class="pt-0 mt-0">your message</h5>
                    <div class="column pl-0 col-10">
                        <textarea type="text" class="input input-block mb-2" placeholder="Write here." v-model="message" v-on:keyup.13="handleSubmit" maxlength="280"></textarea>
                    </div>
                    <div class="column pr-0 col-2">
                        <button @click="handleSubmit()" class="button button-green btn-block mb-2" :disabled="isLoading">Send</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import Promise from 'bluebird';
import client from '@/helpers/client';
import io from 'socket.io-client';

// if (socket) socket.disconnect();
// let socket = new io.connect('https://drugwars-chat.herokuapp.com/');

export default {
  data() {
    return {
      id: this.$route.params.id,
      isInit: false,
      isLoading: false,
      gang: null,
      members: [],
      gangmembers: [],
      showChat: true,
      showGangChat: false,
      showUsers: false,
      gangChat: false,
      privateChat: false,
      receiver: null,
      message: null,
      user: this.$store.state.game.user.user,
      applies: null,
      info: null,
      autoscroll: false,
      responses: [],
      gangresponses: [],
      privateresponses: [],
    };
  },
  created() {
    // socket = new io.connect('https://drugwars-chat.herokuapp.com/');
    // const token = localStorage.getItem('access_token');
    // const self = this;
    // socket.emit('add-user', { token });
    // socket.on('read-gang-msg', message => {
    //   self.gangresponses.push({
    //     text: message.text,
    //     sender: message.sender,
    //     gang: message.gang,
    //     picture: message.picture,
    //     date: message.date,
    //   });
    //   self.scrollToEnd();
    // });
    // socket.on('read-msg', message => {
    //   self.responses.push({
    //     text: message.text,
    //     sender: message.sender,
    //     gang: message.gang,
    //     picture: message.picture,
    //     date: message.date,
    //   });
    //   self.scrollToEnd();
    // });
    // socket.on('read-private-msg', message => {
    //   self.privateresponses.push({
    //     text: message.text,
    //     sender: message.sender,
    //     gang: message.gang,
    //     picture: message.picture,
    //     date: message.date,
    //   });
    //   self.scrollToEnd();
    // });
    // socket.on('user-connected', userId => {
    //   self.members.push(userId);
    // });
    // socket.on('init-chat', messages => {
    //   self.responses = messages;
    // });
    // socket.on('update-chat', messages => {
    //   this.$parent.$data.newmessage = true;
    //   self.responses = messages;
    // });
    // socket.on('update-private-chat', messages => {
    //   this.$parent.$data.newprivatemessage = true;
    //   self.privateresponses = [];
    //   self.privateresponses = messages;
    // });
    // socket.on('update-gang-chat', messages => {
    //   this.$parent.$data.newgangmessage = true;
    //   self.gangresponses = messages;
    // });
    // socket.on('blocked', messages => {
    //   self.responses = messages;
    //   self.responses.push({
    //     text: 'Please wait before sending another message',
    //     sender: 'DrugWars',
    //     gang: 'government',
    //     picture: message.picture,
    //     date: new Date(),
    //   });
    // });
    // socket.on('update-users', users => {
    //   self.members = users;
    // });
    // setTimeout(() => {
    //   this.scrollToEnd();
    // }, 500);
  },
  updated() {
    if (this.isAtBottom()) this.scrollToEnd();
  },
  destroyed() {
    socket.disconnect();
  },
  methods: {
    ...mapActions(['init', 'notify', 'refresh_gang_buildings']),
    handleSubmit() {
      if (this.message.length > 0) {
        let channel = '';
        const self = this;
        if (self.showChat) {
          channel = 'public';
        } else if (self.gangChat) {
          channel = self.user.gang;
        } else if (self.privateChat) {
          channel = self.receiver;
        }
        this.isLoading = true;
        const message = this.message;
        const token = localStorage.getItem('access_token');
        socket.emit('send-msg', {
          token,
          message,
          channel,
        });
        this.message = null;
        setTimeout(() => {
          self.scrollToEnd();
        }, 1500);
        this.isLoading = false;
      }
    },
    displayUsers() {
      this.showChat = false;
      this.gangChat = false;
      this.privateChat = false;
      this.showUsers = true;
    },
    displayChat() {
      this.privateresponses = [];
      this.showChat = true;
      this.gangChat = false;
      this.privateChat = false;
      this.showUsers = false;
      this.$parent.$data.newmessage = false;
      setTimeout(() => {
        this.scrollToEnd();
      }, 500);
    },
    displayGangChat() {
      this.privateresponses = [];
      this.showChat = false;
      this.gangChat = true;
      this.privateChat = false;
      this.showUsers = false;
      this.$parent.$data.newgangmessage = false;
      setTimeout(() => {
        this.scrollToEnd();
      }, 500);
    },
    displayPrivateChat() {
      this.receiver = null;
      this.showChat = false;
      this.gangChat = false;
      this.privateChat = true;
      this.showUsers = false;
      this.$parent.$data.newprivatemessage = false;
      setTimeout(() => {
        this.scrollToEnd();
      }, 500);
    },
    scrollToEnd() {
      const container =
        this.$el.querySelector('.gangchat') ||
        this.$el.querySelector('.chat') ||
        this.$el.querySelector('.privatechat');
      if (container) container.scrollTop = container.scrollHeight;
    },
    isAtBottom() {
      const container =
        this.$el.querySelector('.gangchat') ||
        this.$el.querySelector('.chat') ||
        this.$el.querySelector('.privatechat');
      if (container && container.scrollTop + 650 > container.scrollHeight) this.autoscroll = true;
      else this.autoscroll = false;
      if (container) return container.scrollTop + 650 > container.scrollHeight;
    },
    checkUrl(url) {
      try {
        url = url.replace(
          /(https?:\/\/.*?\.(?:png|jpe?g|gif)(.*))(\w|$)/gi,
          "<br><img width='100%' src='$1'>",
        );
        return url;
      } catch (e) {
        return url;
      }
    },
    sendPm(name) {
      const self = this;
      const token = localStorage.getItem('access_token');
      self.displayPrivateChat();
      self.receiver = name;
      const channel = name;
      socket.emit('private-msg', {
        token,
        channel,
      });
    },
    sendMessage(name) {
      const self = this;
      if (this.message) this.message = `${this.message} @${name}`;
      else this.message = ` @${name}`;
    },
  },
};
</script>

<style scoped lang="less">
@import '../vars.less';
.message {
  color: whitesmoke;
  overflow-wrap: break-word;
  font-size: 13px;
}

.sender {
  font-size: 10px;
}

img {
  max-width: 100% !important;
}

.chat {
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100vh - 360px);
  width: 100%;
}

.gangchat {
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100vh - 360px);
  width: 100%;
}

.privatechat {
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100vh - 360px);
  width: 100%;
}

.sender {
  padding-top: 10px;
  padding-bottom: 0px;
  font-size: 14px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
}

.gang {
  color: #fd0000;
  font-size: 12px;
  margin-left: 4px;
}

.reply {
  bottom: 0px;
}

.black {
  background: black;
  color: gray !important;
}

.white {
  color: white;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: black !important;
}

::-webkit-scrollbar-thumb {
  background: rgb(124, 124, 124);
  border-radius: 0;

  &:hover {
    background: white;
  }
}
</style>
