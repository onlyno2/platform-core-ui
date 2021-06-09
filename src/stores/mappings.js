import Vue from 'vue'
import router from '../router/index'

import { MappingService } from '../services/state_mapping.service'

const state = {
  mappings: [],
  current_event: '',
  current_type: '',
  setting_object: {},
  pagination: {}
}

const getters = {}

const mutations = {
  UPDATE_MAPPING_LIST: (state, mappings) => {
    state.mappings = mappings;
  },
  UPDATE_PAGINATE_INFO: (state, paginate) => {
    state.pagination = paginate
  },
  SET_CURRENT_EVENT: (state, event) => {
    state.current_event = event
  },
  SET_CURRENT_TYPE: (state, type) => {
    state.current_type = type
  },
  UPDATE_CURRENT_SETTING_OBJECT: (state, device) => {
    state.setting_object = device
  },
  SET_DEVICE_STATES: (state, states) => {
    state.device_states = states
  },
  SET_CREATED_OBJECT: (state, created_object) => {
    state.created_object = created_object
  }
}

const actions = {
  set_event: ({ commit }, event) => {
    commit('SET_CURRENT_EVENT', event)
  },
  set_type: ({ commit }, type) => {
    commit('SET_CURRENT_TYPE', type)
  },
  index: async({ commit, state }, page = 1) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const response = await MappingService.index(project_id, state.current_type, state.current_event, page)
    if(response.status === 200) {
      commit('UPDATE_MAPPING_LIST', response.data.data)
      commit('UPDATE_PAGINATE_INFO', response.data.paginate)
    }
  },
  create: async({ dispatch, state }, data) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const response = await MappingService.create(project_id, state.current_type, state.current_event, data)
    if(response.status === 201) {
      Vue.$toast.success('Tạo mới thành công')
      dispatch('index', state.pagination.current_page)
    }
  },
  show: async({ commit }, id) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const response = await MappingService.show(project_id, state.current_type, id)
    if(response.status === 200) {
      commit('UPDATE_CURRENT_SETTING_OBJECT', response.data.data)
    }
  },
  update: async({ commit, state }, id) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const data = state.setting_object.attributes
    const response = await MappingService.update(project_id, state.current_type, id, data)
    if(response.status === 200) {
      Vue.$toast.success('Cập nhật thành công')
      commit('UPDATE_CURRENT_SETTING_OBJECT', response.data.data)
      router.push(`/devices/${id}/show`)
    }
  },
  destroy: async({ dispatch, state }, id) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const response = await MappingService.destroy(project_id, state.current_type, id)
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