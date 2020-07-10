<template>
  <div>
    <button v-if="state.userId" v-on:click="logOut" class="btn btn-success mx-3">Log Out</button>
    <div v-else>You are not logged in</div>
  </div>
</template>

<script>
import oClientTransport from '../../assets/js/client-transport';
import axios from 'axios';
import store from '../../store';
import aConstants from '../../assets/js/constants';

export default {
  name: 'TabLogOut',
  store,
  computed : {
    state() {
      return this.$store.state;
    }
  },
  methods: {
    async logOut() {
      const config = {
        headers: {
          'Accept': 'application/hal+json, application/vnd.lm-error+json',
          'Authorization': 'Bearer ' + this.$store.state.token,
          'Content-Type': 'application/json',
        }
      };
      var gotResp;
      const response = await axios
              .delete(
                      `/security/logout`,
                      config
              )
              // .then(response => (this.response = response.data))
              .then(response => {
                gotResp = response;
              })
              .catch(e => console.log(e));
      console.log('gotResp', gotResp);
      if (gotResp) {
        oClientTransport.disconnect();
        this.$store.commit('setData', aConstants.aBlankUser);
      }
    }
  }
}
</script>

