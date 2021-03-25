import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {id: "abc123", name: "Adam jarh"},
    categories: ["sustainability", "nature", "animal welfare", "housing", "education", "food", "community"],
    todos: [
      { id: 1, text: "...", done: true },
      { id: 2, text: "...", done: false },
      { id: 3, text: "...", done: true },
      { id: 4, text: "...", done: false },
    ],
    events: [
      { id: 1, text: "...", organizer: "..."},
      { id: 2, text: "...", organizer: "..." },
      { id: 3, text: "...", organizer: "..."},
      { id: 4, text: "...", organizer: "..." },
    ],
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    catLength: state => state.categories.length,
    doneTodos: state => state.todos.filter(todos => todos.done),
    activeTods: state => state.todos.filter(todos => !todos.done),
    getEventById: state => id => {
      console.log(id)
      return state.events.find(event => event.id === id)
    }
  }
});
