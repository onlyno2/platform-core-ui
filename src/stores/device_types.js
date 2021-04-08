import Vue from 'vue';
import router from '../router/index'

import { DeviceTypeService } from '../services/device_type.service'

const state = {
  device_types: [],
  pagination: {},
  setting_object: {},
}

const getters = {
  device_types: (state) => state.device_types,
}

const mutations = {
  UPDATE_DEVICE_TYPE_LIST: (state, device_types) => {
    state.device_types = device_types;
  },
  UPDATE_PAGINATE_INFO: (state, paginate) => {
    state.pagination = paginate
  },
  UPDATE_CURRENT_SETTING_OBJECT: (state, device_type) => {
    state.setting_object = device_type
  }
}

const actions = {
  index: async({ commit }, page = 1) => {
    let current_project = JSON.parse(localStorage.getItem('cprj'))
    const response = await DeviceTypeService.index(current_project.attributes.slug, page)
    if(response.status === 200) {
      commit('UPDATE_DEVICE_TYPE_LIST', response.data.data)
      commit('UPDATE_PAGINATE_INFO', response.data.paginate)
    }
  },
  set_current: ({ commit }, project) => {
    commit('SET_CURRENT', project)
  },
  show: async({ commit }, id) => {
    let current_project = JSON.parse(localStorage.getItem('cprj'))
    const response = await DeviceTypeService.show(current_project.attributes.slug, id)
    if(response.status === 200) {
      commit('UPDATE_CURRENT_SETTING_OBJECT', response.data.data)
    }
  },
  update: async({ commit, state }, id) => {
    let current_project = JSON.parse(localStorage.getItem('cprj'))
    const data = state.setting_object.attributes
    const response = await DeviceTypeService.update(current_project.attributes.slug, id, data)
    if(response.status === 200) {
      Vue.$toast.success('Cập nhật thành công')
      commit('UPDATE_CURRENT_SETTING_OBJECT', response.data.data)
    }
  },
  create: async({ dispatch, state }, data) => {
    let current_project = JSON.parse(localStorage.getItem('cprj'))
    const response = await DeviceTypeService.create(current_project.attributes.slug, data)
    if(response.status === 201) {
      Vue.$toast.success('Tạo mới thành công')
      dispatch('index', state.pagination.current_page)
      router.push('/device_types')
    }
  },
  destroy: async({ dispatch, state }, item) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const id = item.attributes.name
    const response = await DeviceTypeService.destroy(current_project.attributes.slug, id)
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