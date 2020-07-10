<template>
    <div>
        <hr>
        <div v-if="ownerId">
            <span
                    v-for="(uiAction, index) in tileActions"
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
        {{ownerId}} | tileActions
    </div>
</template>

<script>
import store from '../../store';
import oDomainGame from '../../assets/js/domain-game';

export default {
  name: 'GameTablePlayerTileAction',
  store,
  methods: {
    clickUiAction(action, data) {
      oDomainGame.clickUiAction(action, data);
    }
  },
  computed: {
    ownerId() {
      let id = ''
        , aTile = this.$store.state.aClickedTile
      ;
      if (aTile) {
        id = aTile.ownerId
      }

      return id
    }
    , tileActions() {
      let acts = []
        , state = this.$store.state
        , aTile = state.aClickedTile
        , playerId = state.userId
        , exchangeArr = {}
      ;
      if (aTile) {
        if (aTile.ownerId !== playerId && aTile.monopolyLevel<2) {
          exchangeArr = {
            want: {
              tiles: [aTile.id]
              , money: 0
            }
            , propose: {
              tiles: []
              , money: 500
            }
          };
          acts.push({ "description": "Exchange", "action": "exchangeTile", "data": exchangeArr });
        } else {
          if (aTile.isMortgaged ) {
            acts.push({ "description": "Redeem property", "action": "redeemProperty", "data": aTile.id });
          } else {
            if (aTile.monopolyLevel<2) {
              acts.push({ "description": "Mortgage property", "action": "mortgageProperty", "data": aTile.id });
            } else {
              acts.push({"description": "Sell branch", "action": "sellBranch", "data": aTile.id});
            }
            if (aTile.monopolyLevel>0 && aTile.monopolyLevel < aTile.payment.rent.length) {
              acts.push({ "description": "Build branch", "action": "buildBranch", "data": aTile.id });
            }
          }
        }
      }

      return acts;
    }
    , player() {
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
  }
}
</script>

