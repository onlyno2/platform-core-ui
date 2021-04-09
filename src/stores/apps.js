import Vue from 'vue';
import router from '../router/index'

import { AppService } from '../services/app.service'

const state = {
  apps: [],
  pagination: {},
  setting_object: {},
  created_object: {}
}

const getters = {
  apps: (state) => state.apps,
}

const mutations = {
  UPDATE_APP_LIST: (state, apps) => {
    state.apps = apps;
  },
  UPDATE_PAGINATE_INFO: (state, paginate) => {
    state.pagination = paginate
  },
  UPDATE_CURRENT_SETTING_OBJECT: (state, app) => {
    state.setting_object = app
  },
  SET_CREATED_OBJECT: (state, created_object) => {
    state.created_object = created_object
  }
}

const actions = {
  index: async({ commit }, page = 1) => {
    let current_project = JSON.parse(localStorage.getItem('cprj'))
    const response = await AppService.index(current_project.attributes.slug, page)
    if(response.status === 200) {
      console.log(response.data)
      commit('UPDATE_APP_LIST', response.data.data)
      commit('UPDATE_PAGINATE_INFO', response.data.paginate)
    }
  },
  set_current: ({ commit }, project) => {
    commit('SET_CURRENT', project)
  },
  show: async({ commit }, id) => {
    let current_project = JSON.parse(localStorage.getItem('cprj'))
    const response = await AppService.show(current_project.attributes.slug, id)
    if(response.status === 200) {
      commit('UPDATE_CURRENT_SETTING_OBJECT', response.data.data)
    }
  },
  update: async({ commit, state }, id) => {
    let current_project = JSON.parse(localStorage.getItem('cprj'))
    const data = state.setting_object.attributes
    const response = await AppService.update(current_project.attributes.slug, id, data)
    if(response.status === 200) {
      Vue.$toast.success('Cập nhật thành công')
      commit('UPDATE_CURRENT_SETTING_OBJECT', response.data.data)
      router.push(`/apps/${id}/show`)
    }
  },
  create: async({ commit, state }, data) => {
    let current_project = JSON.parse(localStorage.getItem('cprj'))
    const response = await AppService.create(current_project.attributes.slug, data)
    if(response.status === 201) {
      Vue.$toast.success('Tạo mới thành công')
      commit('SET_CREATED_OBJECT', response.data.data)
      console.log(state.created_object)
      router.push('/apps/after_create')
    }
  },
  destroy: async({ dispatch, state }, id) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const response = await AppService.destroy(current_project.attributes.slug, id)
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