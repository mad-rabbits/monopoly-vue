<template>
  <div id="game-map__log" v-chat-scroll>
    <div v-for="(msg, key) in aData" :key="key"><b v-if="msg.owner">{{msg.owner}} </b>{{msg.text}}</div>
  </div>
</template>

<script>
import VueChatScroll from 'vue-chat-scroll'

export default {
  name: 'GameTableLog',
  props: ['aData']
}
</script>

