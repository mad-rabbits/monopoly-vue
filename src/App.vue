<template>
  <router-view id="wrapper" :class="{'theme__dark': isDark }"/>
</template>

<script>
import { mapActions } from 'vuex';
import store from './store';

export default {
  name: 'App',
  store,
  methods: {
    ...mapActions([
      'getProfile'
    ]),
  },
  created() {
    this.getProfile();
  },
  computed: {
    isDark: function () {
      return this.$store.state.isDarkTheme;
    }
  }
}
</script>