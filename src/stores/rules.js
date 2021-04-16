import Vue from 'vue'
import router from '../router/index'

import { RuleService } from '../services/rule.service'

const state = {
  rules: [],
  current_type: '',
  pagination: {},
  setting_object: {},
  rule_actions: [],
  created_object: {}
}

const getters = {}

const mutations = {
  UPDATE_RULE_LIST: (state, rules) => {
    state.rules = rules;
  },
  UPDATE_PAGINATE_INFO: (state, paginate) => {
    state.pagination = paginate
  },
  SET_CURRENT_TYPE: (state, type) => {
    state.current_type = type
  },
  UPDATE_CURRENT_SETTING_OBJECT: (state, rule) => {
    state.setting_object = rule
  },
  SET_RULE_ACTION: (state, actions) => {
    state.rule_actions = actions
  }
}

const actions = {
  set_type: ({ commit }, type) => {
    commit('SET_CURRENT_TYPE', type)
  },
  index: async({ commit, state }, page = 1) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const response = await RuleService.index(project_id, state.current_type, page)
    if(response.status === 200) {
      commit('UPDATE_RULE_LIST', response.data.data)
      commit('UPDATE_PAGINATE_INFO', response.data.paginate)
    }
  },
  create: async({ dispatch, state }, data) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const response = await RuleService.create(project_id, state.current_type, data)
    if(response.status === 201) {
      Vue.$toast.success('Tạo mới thành công')
      dispatch('index', state.pagination.current_page)
      router.push('/rules')
    }
  },
  show: async({ commit }, id) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const response = await RuleService.show(project_id, state.current_type, id)
    if(response.status === 200) {
      commit('UPDATE_CURRENT_SETTING_OBJECT', response.data.data)
    }
  },
  update: async({ commit, state }, id) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const data = state.setting_object.attributes
    const response = await RuleService.update(project_id, state.current_type, id, data)
    if(response.status === 200) {
      Vue.$toast.success('Cập nhật thành công')
      commit('UPDATE_CURRENT_SETTING_OBJECT', response.data.data)
      router.push(`/rules/${id}/show`)
    }
  },
  states: async({ commit, state }, id) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const response = await RuleService.states(project_id, state.current_type, id)
    if(response.status === 200) {
      commit('SET_DEVICE_STATES', response.data)
    }
  },
  destroy: async({ dispatch, state }, id) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const response = await RuleService.destroy(project_id, state.current_type, id)
    if(response.status === 200) {
      Vue.$toast.success('Xóa thành công')
      dispatch('index', state.pagination.current_page)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}