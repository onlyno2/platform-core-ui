import Vue from 'vue'
import router from '../router/index'

import { DeviceService } from '../services/device.service'

const state = {
  devices: [],
  current_type: '',
  pagination: {},
  setting_object: {},
  device_states: [],
  created_object: {}
}

const getters = {}

const mutations = {
  UPDATE_DEVICE_LIST: (state, devices) => {
    state.devices = devices;
  },
  UPDATE_PAGINATE_INFO: (state, paginate) => {
    state.pagination = paginate
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
  set_type: ({ commit }, type) => {
    commit('SET_CURRENT_TYPE', type)
  },
  index: async({ commit, state }, page = 1) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const response = await DeviceService.index(project_id, state.current_type, page)
    if(response.status === 200) {
      commit('UPDATE_DEVICE_LIST', response.data.data)
      commit('UPDATE_PAGINATE_INFO', response.data.paginate)
    }
  },
  create: async({ commit, dispatch, state }, data) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const response = await DeviceService.create(project_id, state.current_type, data)
    if(response.status === 201) {
      Vue.$toast.success('Tạo mới thành công')
      dispatch('index', state.pagination.current_page)
      commit('SET_CREATED_OBJECT', response.data.data)
      console.log('test inside create store', state.created_object, response.data.data)
      router.push('/devices/after_create')
    }
  },
  show: async({ commit }, id) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const response = await DeviceService.show(project_id, state.current_type, id)
    if(response.status === 200) {
      commit('UPDATE_CURRENT_SETTING_OBJECT', response.data.data)
    }
  },
  update: async({ commit, state }, id) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const data = state.setting_object.attributes
    const response = await DeviceService.update(project_id, state.current_type, id, data)
    if(response.status === 200) {
      Vue.$toast.success('Cập nhật thành công')
      commit('UPDATE_CURRENT_SETTING_OBJECT', response.data.data)
    }
  },
  states: async({ commit, state }, id) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const response = await DeviceService.states(project_id, state.current_type, id)
    if(response.status === 200) {
      commit('SET_DEVICE_STATES', response.data)
    }
  },
  destroy: async({ dispatch, state }, id) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const response = await DeviceService.destroy(project_id, state.current_type, id)
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