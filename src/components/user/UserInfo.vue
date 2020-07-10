<template>
  <div> <img :src="state.avatar" align="left" width="30px"> {{ state.nickname }} <span class="label label-default">{{ state.status }}</span></div>
</template>


<script>
import store from '../../store';

export default {
  name: 'UserInfo',
  store,
  computed : {
    state() {
      return this.$store.state;
    }
  }
}
</script>

