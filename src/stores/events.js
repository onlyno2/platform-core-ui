import Vue from 'vue'
import router from '../router/index'

import { EventService } from '../services/event.service'

const state = {
  events: [],
  current_type: '',
  setting_object: {}
}

const getters = {}

const mutations = {
  UPDATE_EVENT_LIST: (state, events) => {
    state.events = events;
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
  set_type: ({ dispatch, commit }, type) => {
    commit('SET_CURRENT_TYPE', type)
    dispatch('index')
  },
  index: async({ commit, state }, page = 1) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const response = await EventService.index(project_id, state.current_type, page)
    if(response.status === 200) {
      commit('UPDATE_EVENT_LIST', response.data.data)
    }
  },
  create: async({ dispatch, state }, data) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const response = await EventService.create(project_id, state.current_type, data)
    if(response.status === 201) {
      Vue.$toast.success('Tạo mới thành công')
      dispatch('index')
    }
  },
  show: async({ commit }, id) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const response = await EventService.show(project_id, state.current_type, id)
    if(response.status === 200) {
      commit('UPDATE_CURRENT_SETTING_OBJECT', response.data.data)
    }
  },
  update: async({ commit, state }, id) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const data = state.setting_object.attributes
    const response = await EventService.update(project_id, state.current_type, id, data)
    if(response.status === 200) {
      Vue.$toast.success('Cập nhật thành công')
      commit('UPDATE_CURRENT_SETTING_OBJECT', response.data.data)
      router.push(`/devices/${id}/show`)
    }
  },
  destroy: async({ dispatch, state }, id) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const response = await EventService.destroy(project_id, state.current_type, id)
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