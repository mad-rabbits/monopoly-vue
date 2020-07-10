<template>
  <div class="field"
    :aData="tile"
    :class="tile.classes"
    @click="toggleTooltip"
  >
    <div 
      class="field__wrap"
    >
      <span v-if="bgImage()" class="field__bg" :style="{ 'background-image': 'url('+bgImage()+')' }" />
      <span v-else class="field__bg" :class="tile.tileType"/>
      <span v-if="ownerColor" class="field__owner" :style="{ 'background-color': ownerColor }"></span>
      <span
        :style="[{ 'top': '0' }, { 'position': 'absolute' }, { 'background-color': 'rgba(25,55,55,0.3)' }, {'font-size': '0.8em'}, {'opacity': 0.2}]"
      >{{tile.isMortgaged}} / {{tile.monopolyLevel}}</span>
    </div>
    <div 
      v-if="tile.payment" 
      :style="{ 'background-color': tile.bgColor }" 
      class="field__price"
    >
      <span>{{ tile.payment.cardPrice | digit | k }}</span>
    </div>
    <GameTablePlayerToken :tile="tile" />
    <tooltip 
      v-if="tile.payment"
      :transition="transition" 
      :show="showToolTip" 
      :data="aData"
      :classes="'field__tooltip'"
    />
  </div>
</template>

<script>
import store from "../../store";

export default {
  name: 'GameTableTile',
  props: ['aData'],
  store,
  methods: {
    toggleTooltip() {
      this.showToolTip = !this.showToolTip;
    },
    clickTile(tile) {
      let data = '';
      if (
        'ownerId' in tile
        && 'rent' in tile.payment
      ) {
        data = tile;
      }
      this.$store.commit('setData', {aClickedTile: data});
    }
    , renderArrayBlock(item, data) {
      let html = '';
      if (item in data) {
        html += '<div><b>' + item + ':</b></div>';
        Object.keys(data[item]).forEach((key) => {
          html += '<div class="row">';
          html += `<div class="col-sm-4">${key}</div>`;
          html += `<div class="col-sm-8">${data[item][key]}</div>`;
          html += '</div>'
        });
      }

      return html;
    },
    renderBlock(item, data) {
      let html = '';
      if (item in data) {
        html += `<div><b>${item}:</b></div>`;
        html += `<div>${data[item]}</div>`;
      }

      return html;
    },
    getOwner() {
      let aOwner = '';
      if (this.aData.ownerId) {
        Object.values(this.$store.state.game.players).some((player) => {
          if (player.id === this.aData.ownerId) {
            aOwner = player;

            return true;
          }
        });
      }

      return aOwner;
    },
    bgImage() {
      let bg = './assets/images/board';
      if (this.aData.type || this.aData.tileType.startsWith('multiplexor_')) bg += '/theme/'+this.aData.index+'.svg';
      else bg = false
      return bg;
    }
  },
  data() {
    let data = this.aData
            , toolTip = ''
    ;
    toolTip += this.renderArrayBlock('payment', data);
    toolTip += this.renderBlock('description', data);
    toolTip += this.renderBlock('money', data);
    if (!toolTip) {
      toolTip = data.name;
    }

    return {
      tile: data, showToolTip: false, transition: 'fade', toolTip: toolTip};
  }
  , computed: {
    canBuySell() {
      let result = ''
        , aOwner = this.getOwner()
        , game = this.$store.state.game
      ;
      if (
        game.phase === 'Main'
        && aOwner
        && game.playerTurn === aOwner.id
      ) {
        result = {border: '#000 dotted 3px'};
      }

      return result;
    },
    canExchange() {
      let result = ''
        , aOwner = this.getOwner()
        , game = this.$store.state.game
      ;
      if (
        game.phase === 'Main'
        && aOwner
        && game.playerTurn !== aOwner.id
      ) {
        result = {border: '#000 solid 3px'};
      }

      return result;
    },
    ownerColor() {
      let result = ''
        ,aOwner = this.getOwner()
      ;
      if (aOwner) {
        result = aOwner.color;
      }

      return result;
    }
  }
}
</script>

