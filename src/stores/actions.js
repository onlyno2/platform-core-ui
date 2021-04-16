import { ActionService } from '../services/action.service'
import Vue from 'vue'

const state = {
  actions: []
}

const getters = {

}

const mutations = {
  UPDATE_ACTIONS_LIST: (state, actions) => {
    state.actions = actions;
  },
  UPDATE_PAGINATE_INFO: (state, paginate) => {
    state.pagination = paginate
  }
}

const actions = {
  index: async({ commit }, { type_id, rule_id, page = 1 }) => {
    let current_project = JSON.parse(localStorage.getItem('cprj'))
    const response = await ActionService.index(current_project.attributes.slug, type_id, rule_id, page)
    if(response.status === 200) {
      commit('UPDATE_ACTIONS_LIST', response.data.data)
      commit('UPDATE_PAGINATE_INFO', response.data.paginate)
    }
  },
  create: async({ dispatch }, { type_id, rule_id, data }) => {
    let current_project = JSON.parse(localStorage.getItem('cprj'))
    const response = await ActionService.create(current_project.attributes.slug, type_id, rule_id, data)
    if(response.status === 201) {
      dispatch('index', { type_id: type_id, rule_id: rule_id, page: state.pagination.current_page })
      Vue.$toast.success('Tạo mới thành công')
    }
  },
  destroy: async({ dispatch }, { type_id, rule_id, action_id }) => {
    let current_project = JSON.parse(localStorage.getItem('cprj'))
    const response = await ActionService.destroy(current_project.attributes.slug, type_id, rule_id, action_id)
    if(response.status === 200) {
      dispatch('index', { type_id: type_id, rule_id: rule_id, page: state.pagination.current_page })
      Vue.$toast.success('Xóa thành công')
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}