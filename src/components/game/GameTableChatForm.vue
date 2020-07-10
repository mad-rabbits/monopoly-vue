<template>
    <div id="game-map__chat">
        <form v-on:submit.prevent="playerSendMessage" class="send">
            <input id="m" autocomplete="off" v-model="msgText" placeholder="Enter text here" />
            <svg class="send__ico" width="20" @click="playerSendMessage" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="24 / basic / send">
              <path id="icon" fill-rule="evenodd" clip-rule="evenodd" d="M2.28369 1.87659L3.42119 9.83911L4.06432 9.99989L3.42119 10.1607L2.28369 18.1232L18.5303 9.99989L2.28369 1.87659ZM4.9123 8.49382L4.38314 4.78967L14.8032 9.9997L4.38314 15.2097L4.9123 11.5056L10.9358 9.9997L4.9123 8.49382Z" fill="#7289DA"/>
              </g>
            </svg>
        </form>
    </div>
</template>

<script>
import oDomainGame from '../../assets/js/domain-game';

export default {
  name: 'GameTableChatForm',
  data() {
    return {
      msgText: ''
    }
  },
  methods: {
    playerSendMessage() {
      oDomainGame.playerSendMessage({message: this.msgText});
      this.msgText = '';
    }
  },
  computed: {
    config() {

      return {};
    }
  }
}
</script>

