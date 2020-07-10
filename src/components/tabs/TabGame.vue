<template>
  <div>
    <h6>Game room {{ state.statusId }}</h6><hr>
    <div v-if="!state.game" class="form-group row px-3"><img src="/assets/img/m-loader.gif"> Loading game room...</div>
    <div v-else>
      <GameTable></GameTable>
      <hr>
      <p>userId: {{ state.userId }}</p>
      <p>nickname: {{ state.nickname }}</p>
      <p>status: {{ state.status }}</p>
      <p>game: {{ state.game }}</p>
    </div>
  </div>
</template>


<script>
import store from '../../store';

export default {
  name: 'TabGame',
  store,
  computed : {
    state() {
      return this.$store.state;
    }
  }
}
</script>
