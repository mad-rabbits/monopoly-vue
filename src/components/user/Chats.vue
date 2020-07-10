<template>
  <div>
    <div class="border rounded overflow-auto" style="height: 150px;">
      <ul class="h-100 list-group">
        <li class="list-group-item py-1"
            v-for="message in messages"
            v-bind:key="message.id"
        >
          <i v-if="message.myMsg"><b>{{ message.nickname }}</b></i>
          <b v-else>{{ message.nickname }}</b>
          : {{ message.text }}</li>
      </ul>
    </div>
    <div class="clearfix" v-if="userId != ''">
      <form v-on:submit.prevent="sendChatMessage">
        <input id="m" autocomplete="off" v-model="msgText" placeholder="Enter text here" /><button type="submit" class="btn-small btn-primary">Send</button>
      </form>
    </div>
  </div>
</template>


<script>
import store from '../../store';
import oClientChat from '../../assets/js/client-chat'

export default {
  name: 'Chats',
  store,
  data() {
    return {
      msgText: ''
    }
  },
  computed : {
    messages() {
      let aChat = []
        , state = this.$store.state
      ;
      if (state.chats && 'global' in state.chats) {
        aChat = state.chats.global.messages;
      }

      return aChat;
    },
    userId() {
      return this.$store.state.userId;
    }
  },
  methods: {
    sendChatMessage() {
      oClientChat.sendGlobalMessage(this.msgText);
      this.msgText = '';
    }
  }
}
</script>

