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
    eventsTotal: 0,
    event: {}

  },
  mutations: {
    ADD_EVENT(state, event){
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    createEvent({commit}, event){
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    fetchEvents({commit}, {perPage, page}) {
      EventService.getEvents(perPage, page)
      .then((response) => {
        commit(
          'SET_EVENTS_TOTAL',
          parseInt(response.headers['x-total-count'])
        )
        console.log(1)
        commit('SET_EVENTS',response.data);
      })
      .catch((error) => {
        console.log("there was an error " + error.respone);
      });
    },
    fetchEvent({ commit, getters }, id) {
      var event = getters.getEventById(id) // See if we already have this event
      if (event) { // If we do, set the event
        commit('SET_EVENT', event)
      } else {  // If not, get it with the API.
        EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            console.log('There was an error:', error.response)
          })
      }
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
    },
  },
});
