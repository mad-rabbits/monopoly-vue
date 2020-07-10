<template>
  <div>
    <button v-if="state.socketConnected" v-on:click="disconnect" class="btn btn-warning mx-3">Disconnect</button>
    <button v-else-if="state.userId" v-on:click="connect" class="btn btn-success mx-3">Connect</button>
    <button v-if="state.socketConnected" v-on:click="getData" class="btn btn-success mx-3">Get Data</button>
  </div>
</template>


<script>
import store from '../../store';
import oClientTransport from '../../assets/js/client-transport'
import aConstants from '../../assets/js/constants';

export default {
  name: 'ServerConnection',
  store,
  computed : {
    state() {
      return this.$store.state;
    }
  },
  methods: {
    connect() {
      oClientTransport.connect();
    }
    , disconnect() {
      oClientTransport.disconnect();
      oClientTransport.sendEvent(aConstants.aConfig.events.game.GET_GAME_DATA, {});
    }
    , getData() {
      oClientTransport.sendEvent(aConstants.aConfig.events.game.GET_GAME_DATA, {});
    }
  }

}
</script>

