import firebase from 'firebase/app'

export default {
  state: {
    currentCategory: 0
  },
  mutations: {
    setCurrentCategory(state, currentCategoryId) {
      state.currentCategory = currentCategoryId
    }
  },
  getters: {
    currentCategory: s => s.currentCategory
  },
  actions: {
    async fetchCategories({commit, dispatch}) {
      try {
        const uid = await dispatch('getUid')
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}

        return Object.keys(categories).map(key => ({...categories[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategoryById({commit, dispatch}, id) {
      try {
        const uid = await dispatch('getUid')
        const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}
        return {...category, id}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({commit, dispatch}, {title, limit, id}) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})
        commit('setCurrentCategory', id)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory({commit, dispatch}, {title, limit, type, archived}) {
      try {
        const uid = await dispatch('getUid')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit, type, archived})
        return {title, limit, type, archived, id: category.key}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async archiveCategory({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUid')
        return await firebase.database().ref(`/users/${uid}/categories`).child(id).update({archived : true})
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async activeCategory({dispatch, commit}, id) {
          try {
            const uid = await dispatch('getUid')
            return await firebase.database().ref(`/users/${uid}/categories`).child(id).update({archived : false})
          } catch(e) {
            commit('setError', e)
            throw e
          }
        },
  }
}