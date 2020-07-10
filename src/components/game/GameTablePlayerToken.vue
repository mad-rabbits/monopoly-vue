<template>
    <span class="token">
        <span
          v-for="(player, key) in players"
          :key="key"
          class="token__wrap"
          :style="{ 'background-color': player.color, 'border-color': player.border }"
        >
          <span class="token__avatar"></span>
        </span>
    </span>
</template>

<script>
import store from '../../store';

export default {
  name: 'GameTablePlayerToken',
  store,
  props: ['tile'],
  methods: {
    darken(color) {
      let amount = -50;
      return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
    }
  },
  computed: {
    players() {
      let aPlayers = [];
      Object.values(this.$store.state.game.players).forEach((player) => {
        if (player.position === this.tile.id) {
          player.border = this.darken(player.color);
          aPlayers.push(player);
        }
      });
      return aPlayers;
    }
  }
}
</script>

