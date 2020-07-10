<template>
  <div class="player" :style="{'background-color': aData.color}">
    <div class="player__wrap">
      <div class="player__avatar" />
      <div class="player__info">
        <div class="player__name">{{aData.nickname}}</div>
        <div class="player__status" />
        <div class="player__payment">
          <span class="player__money">
            Assets
            <p class="digit">{{aData.revenue | digit | k}}</p>
          </span>
          <span class="player__score">
            score
            <p class="digit">{{aData.revenue}}</p>
          </span>
        </div>
      </div>
    </div>
    <!-- <div>{{aData.nickname}}</div>
    <div>{{aData.money}}</div>
    <div>jailCounter: {{aData.jailCounter}}</div>
    <div>jailDiceCounter: {{aData.doubleDiceCounter}}</div>
    <div>revenue: {{aData.revenue}}</div>
          <div>uiAction: {{aData.uiAction}}</div>
    <div v-if="aData.id===playerTurn"><button v-on:click="throwDices" class="btn btn-warning mt-2">Throw dices</button></div>
    <div><button v-on:click="throwDices" class="btn btn-danger mt-2">Sell from tile</button></div>
    <div><button v-on:click="throwDices" class="btn btn-success mt-2">Build on tile</button></div>

  {{playerTurn}}
    <div>{{aData.id}}</div> -->
  </div>
</template>

<script>
import oDomainGame from '../../assets/js/domain-game';

export default {
  name: 'GameTablePlayer',
  props: ['aData', 'playerTurn'],
  methods: {
    throwDices() {
      oDomainGame.throwDices();
    }
  }
}
</script>

