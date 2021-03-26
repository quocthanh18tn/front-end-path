export const namespaced = true

export const state = {
  notifications:[]
}

let nextID = 1

export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      ...notification,
      id: nextID++
    })
  },
  DELETE(state, notificationRemove) {
    state.notifications = state.notifications.filter(
      notification => notification.id !== notificationRemove.id
    )
  }
}

export const actions = {
  add({commit}, notification) {
    commit('PUSH', notification)
  },
  delete( {commit}, notificationRemove) {
    commit('DELETE', notificationRemove)
  }
}