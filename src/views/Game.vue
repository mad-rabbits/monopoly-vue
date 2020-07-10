<template>
  <div>
    <div v-if="!state.game" class="form-group row px-3">Loading game room...</div>
    <GameTable v-else></GameTable>
  </div>
</template>

<script>
import store from '../store';
import oDomainGame from '../assets/js/domain-game';

export default {
  name: 'Game',
  store,
  created () {
    if (!this.state.game) {
      oDomainGame.init(this);
    }
    else {
      this.$router.push({ name: 'Home'})
    }
  },
  computed: {
    state() {
      return this.$store.state;
    }
  }
}
</script>
<style>

  .player-info {
    min-height: 170px;
  }

  .player-token {
    float: left;
    width: 15px;
    height: 15px;
    margin: 1px;
    border-radius: 7px;
    border-color: #7d8293;
  }

  .game-info {
    height: 170px;
  }

  .game-log {
    height: 350px;
    overflow-y: scroll;
    overscroll-behavior-y: contain;
    scroll-snap-type: y mandatory    }

  .game-log > div > div:last-child {
    scroll-snap-align: end;
  }
</style>

