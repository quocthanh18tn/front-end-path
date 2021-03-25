import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js";

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
    events: [],
  },
  mutations: {
    ADD_EVENT(state, event){
      state.events.push(event)
    }
  },
  actions: {
    createEvent({commit}, event){
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    }
  },
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
