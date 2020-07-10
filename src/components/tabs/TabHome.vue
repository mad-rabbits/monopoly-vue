<template>
  <div>
    <p>jwtToken: {{ state.jwtToken }}</p>
    <p>userId: {{ state.userId }}</p>
    <p>nickname: {{ state.nickname }}</p>
    <p>status: {{ state.status }}</p>
    <p>state: {{ state }}</p>
  </div>
</template>

<script>
import store from '../../store';

export default {
  name: 'TabHome',
  store,
  computed : {
    state() {
      return this.$store.state;
    }
  }

}
</script>

