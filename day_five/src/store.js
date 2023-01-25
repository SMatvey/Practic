import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state: {
    count: 0,
    theme: "white",
  },
  mutations: {
    setCount: (state, count) => (state.count = count),
    setTheme: (state) => {
      if(state.theme == "white") state.theme = "red";
      else if(state.theme == "red") state.theme = "black";
      else if(state.theme == "black") state.theme = "white";
    },
  },
  getters: {
    getCount: (state) => {
      return state.count;
    },
    getTheme: (state) => {
      return state.theme;
    },
  },
  plugins: [createPersistedState()],
});
export default store;