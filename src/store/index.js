import Vue from 'vue';
import Vuex from 'vuex';
import aConstants from '../assets/js/constants';

Vue.use(Vuex);

const mergeData = function(state, data) {
  if (!state && !data) {
    // console.log('Empty : state and data', state, data);
    return state;
  }
  Object.keys(data).forEach((index) => {
    let val = data[index];
    if (index === 'uiAction') {
      state[index] = val;
    } else if (state && !(index in state)) {
      if (Array.isArray(state)) {
        state.push(val);
      } else {
        state[index] = val;
        console.log('Added: index, state, val', index, state, val);
      }
    } else if (typeof val === 'object') {
      mergeData(state[index], val);
    } else {
      state[index] = val;
    }
  });

  return state;
};

export default new Vuex.Store({
  state: {
    ...aConstants.aBlankUser,
    isDarkTheme: JSON.parse(window.localStorage.getItem('isDark')),

  },
  mutations: {
    toggleTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
      window.localStorage.setItem('isDark', state.isDarkTheme);
    },
    setData: (state, data) => {
      console.log('setdata', data);
      Object.keys(data).forEach((index) => {
        Vue.set(state, index, data[index]);
      });
    },
    replaceData: (state, data) => {
      console.log('replacedata', data);
      Object.keys(data).forEach(function(index) {
        let newState = data[index];
        if (typeof state[index] === 'object') {
          newState = mergeData(state[index], newState);
        }
        window.localStorage.setItem(index, JSON.stringify(newState));
        Vue.set(state, index, newState);
      });
    }, 
    addChatMessage: (state, data) => {
      state.chats.global.messages.push(data);
    }
  },
  actions: {
    updateProfile(context, data) {
      context.commit('replaceData', data);
    },
    toggleTheme(context) {
      context.commit('toggleTheme');
    },
    getProfile(context) {
      const profile = JSON.parse(window.localStorage.getItem('user'));
      if (profile) context.commit('replaceData', profile);
      else console.warn('Not logged in...');
    }
  }
});