<template>
    <div>
        <div v-if="player.uiAction">
            <span
                    v-for="(uiAction, index) in player.uiAction"
                    :key="index"
            >
                <button v-if="uiAction.action"
                        :key="uiAction.action"
                        v-on:click="clickUiAction(uiAction.action, uiAction.data)"
                        class="btn btn-success mr-1"
                >
                    {{uiAction.description}}
                </button>
                <span v-else>{{uiAction.description}}</span>
            </span>
        </div>
        <div v-else>Waiting for any action...</div>
        &nbsp;{{player.uiAction}}
    </div>
</template>

<script>
import store from '../../store';
import oDomainGame from '../../assets/js/domain-game';

export default {
  name: 'GameTableUiAction',
  store,
  methods: {
    clickUiAction(action, data) {
      oDomainGame.clickUiAction(action, data);
    }
  },
  computed: {
    player() {
      let player
        , state = this.$store.state
        , game = state.game
      ;
      Object.values(game.players).some((plr) => {
        if (plr.id === state.userId) {
          player = plr;

          return true;
        }
      });

      return player;
    },
    playerTurn() {

      return this.$store.state.game.playerTurn;
    }
  }
}
</script>

