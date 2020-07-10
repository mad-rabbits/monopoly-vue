<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-3">
        <GameTablePlayer
          v-for="player in game.players"
          :aData="player"
          :playerTurn="game.playerTurn"
          :key="player.id">
        </GameTablePlayer>
        <GameTableUiAction></GameTableUiAction>
        <GameTablePlayerTileAction></GameTablePlayerTileAction>
        <!--                <GameTablerules :aData="game.rules"></GameTablerules>-->
        <GameTableInfo :aData="game"></GameTableInfo>
      </div>
      <div class="col-sm-9">
        <GameTableLayer :aData="game.table" :aLog="game.log"></GameTableLayer>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store';

export default {
  name: 'GameTable',
  store,
  computed : {
    game() {
      return this.$store.state.game;
    }
  }
}
</script>

