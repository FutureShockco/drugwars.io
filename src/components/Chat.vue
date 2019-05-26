<template>
	<div>
		<div class="chat">
			<div :key="response.id" v-for="response in responses" class="border-bottom">
				<div class="text-left item width-full">
					<div class="columns">
					<div class="column pl-1 col-3">
										<router-link
					v-if="response.sender != user.nickname"
					:to="`/fight?target=${response.sender}`">
					<Avatar :size="40" :username="response.sender" :picture="response.picture"/>
						</router-link>
											<Avatar v-else :size="40" :username="response.sender" :picture="response.picture"/>
						<h5 class="mt-1 sender">{{response.sender}} {{response.gang}}</h5>
					</div>
						<div class="column col-7 message text-left" v-html="response.text"></div>
											<div class="column pr-0 col-1">{{response.date}}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="p-4 reply text-center">
			<Loading v-if="isLoading"/>
			<div v-else>
				<div>
					<h5>your message</h5>
					<textarea
						type="text"
						class="input input-block mb-2"
						placeholder="Write here."
						v-model="message"
						maxlength="280"
					></textarea>
					<button
						@click="handleSubmit()"
						class="button button-green btn-block mb-2"
						:disabled="isLoading"
					>Send</button>
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
import axios from 'axios';

const socket = new io.connect('https://drugwars-chat.herokuapp.com/');

export default {
  data() {
    return {
      id: this.$route.params.id,
      isInit: false,
      isLoading: false,
      gang: null,
      members: null,
      message: null,
      user: this.$store.state.game.user.user,
      applies: null,
      info: null,
      responses: [],
    };
  },
  created() {
    const token = localStorage.getItem('access_token');
    const self = this;
    socket.emit('add-user', { token });
    socket.on('read-msg', message => {
      self.responses.push({
        text: message.text,
        sender: message.sender,
        gang: message.gang,
        picture: message.picture,
        date: message.date,
      });
    });

    socket.on('user-connected', userId => {
      self.members.push(userId);
    });

    socket.on('init-chat', messages => {
      self.responses = messages;
    });

    socket.on('update-chat', messages => {
      console.log(messages);
      self.responses = messages;
    });

    socket.on('blocked', messages => {
      self.responses = messages;
      self.responses.push({
        text: 'Please wait before sending another message',
        sender: 'DrugWars',
        gang: 'government',
        picture: message.picture,
        date: new Date().toString(),
      });
    });

    socket.on('update-users', users => {
      self.members = users;
    });
  },
  updated() {
    this.scrollToEnd();
  },
  methods: {
    ...mapActions(['init', 'notify', 'refresh_gang_buildings']),
    handleSubmit() {
      if (this.message.length > 0) {
        this.isLoading = true;
        const self = this;
        const message = this.message;
        const token = localStorage.getItem('access_token');
        socket.emit('send-msg', {
          token,
          message,
        });
        this.message = null;
        this.isLoading = false;
      }
    },
    scrollToEnd() {
      const container = this.$el.querySelector('.chat');
      container.scrollTop = container.scrollHeight;
    },
  },
};
</script>

<style scoped lang="less">
@import '../vars.less';

.message {
  color: whitesmoke;
}

.chat {
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100vh - 380px);
  width: 100%;
}

.sender {
  padding-top: 10px;
  padding-bottom: 0px;
  left: 20px !important;
  font-size: 14px;
}

.reply {
  bottom: 0px;
}
</style>
