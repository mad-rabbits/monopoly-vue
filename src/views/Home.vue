<template>
  <div>
    <the-header />
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <button
                  v-for="tab in tabs"
                  v-bind:key="tab"
                  v-bind:class="['tab-button', { active: currentTab === tab }]"
                  v-on:click="currentTab = tab"
          >{{ tab }}</button>
        </div>
        <div class="col-md-2">
          <ServerConnection></ServerConnection>
        </div>
        <div class="col-md-2">
          <UserInfo></UserInfo>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <component
                  v-bind:is="currentTabComponent"
                  class="tab"
          ></component>
        </div>
      </div>
      <Chats></Chats>
    </div>
  </div>
</template>

<script>
import store from '../store';
import oDomainViewer from '../assets/js/domain-viewer'
import oClientTransport from '../assets/js/client-transport'
import oClientChat from '../assets/js/client-chat'
import oClientRequest from '../assets/js/client-request'

export default {
  name: 'Home',
  store,
  data: function() {
    return {
        currentTab: 'LogIn',
        tabs: ['Home', 'Request', 'LogIn', 'LogOut']
      };
    },
  computed: {
    currentTabComponent: function () {
      let currentTab = this.currentTab
        , state = this.$store.state
      ;

      if (state.userId) {
        switch (state.status) {
          case 'none':
            // currentTab = 'Home';
            this.$store.commit('setData', {'game': ''});
            break;
          case 'request':
            currentTab = 'Request';
            this.$store.commit('setData', {'game': ''});
            break;
        }
      }

      // return 'tab-' + currentTab.toLowerCase();
      return 'Tab' + currentTab;
    },
    state() {

      return this.$store.state;
    },
  }
  , components: {
  },
  created() {
    oDomainViewer.init(this);
    oClientTransport.init();
    oClientChat.init();
    oClientRequest.init();
  },
}
</script>

<style lang="scss">
  .tab-button {
    font-family: 'Helvetica Neue', sans-serif;
    padding: 6px 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border: 1px solid #ccc;
    cursor: pointer;
    background: #f0f0f0;
    margin-bottom: -1px;
    margin-right: -1px;
  }
  .tab-button:hover {
    background: #e0e0e0;
  }
  .tab-button.active {
    background: #e0e0e0;
  }
  .tab {
    border: 1px solid #ccc;
    padding: 10px;
  }
</style>

