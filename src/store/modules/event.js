import EventService from "@/services/EventService.js";

export const namespaced = true

export const state = {
    events: [],
    eventsTotal: 0,
    event: {}

}
export const  mutations = {
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
}

export const  actions = {
    createEvent({commit, dispatch}, event){
    // createEvent({commit, state}, event){
      // how to we access another state in another module
      // example:
      // console.log("user state is +" state.user.user.name)
      // it's not going to work, because the state only local module (state is in event module)
      // you shoule using rootState instead of using state
      // createEvent({commit, rootState}, event){
        // console.log("user state is +" rootState.user.user.name)
        // rootState is state in store/index.js, so we can access event.js or user.js

        // how do we dispatch user.js action in event.js action
        // createEvent({commit, dispatch, rootState}, event){
        //  dispatch('actionWeNeedToCall')
        // If you want to call an action inside another namespaced module, you’ll need to use the action’s module name, provide a payload as the second argument (null if there is none), and pass { root: true } as the third argument, like so:
        // dispatch('moduleName/actionToCall', null, { root: true })

      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Your event have been create success'
        }
        dispatch('notification/add', notification, { root: true })
      }).catch (error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: '+ error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
    },
    fetchEvents({commit, dispatch}, {perPage, page}) {
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
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: '+ error.message
        }
        dispatch('notification/add', notification, { root: true })
        // console.log("there was an error " + error.respone);
      });
    },
    fetchEvent({ commit, getters, dispatch }, id) {
      var event = getters.getEventById(id) // See if we already have this event
      if (event) { // If we do, set the event
        commit('SET_EVENT', event)
        return event
      } else {  // If not, get it with the API.
         return EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
            return response.data
          })
          .catch(error => {
            const notification = {
              type: 'error',
              message: 'There was a problem fetching event: '+ error.message
            }
            dispatch('notification/add', notification, { root: true })
            console.log('There was an error:', error.response)
          })
      }
    }
}
export const  getters = {
    catLength: state => state.categories.length,
    doneTodos: state => state.todos.filter(todos => todos.done),
    activeTods: state => state.todos.filter(todos => !todos.done),
    getEventById: state => id => {
      console.log(id)
      return state.events.find(event => event.id === id)
    },
}