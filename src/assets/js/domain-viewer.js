let oVue;

const DomainViewer = {
  init : function (Vue) {
    oVue = Vue;
  }

  , resetLog: function() {
    oVue.$store.commit('setData', {game: {log: []}});
  }

  , setUserState: function(data) {
    oVue.$store.commit('setData', data);
  }

  , updateUserState: function(data) {
    oVue.$store.commit('replaceData', data);
  }

//Chats
  , showMessage: function(data) {
    console.log('showMessage', data);
    let currStore = oVue.$store;
    // data.id = currStore.state.chats.global.messages.length
    // data.nickname = currStore.state.nickname
    currStore.commit('addChatMessage', data);
  }
  , systemMessage: function(data) {
    console.log('systemMessage', data);
  }

//Requests
  , updateRequest: function(data) {
    console.log('systemMessage', data);
  }
};

export default DomainViewer;