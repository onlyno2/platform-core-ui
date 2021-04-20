import Vue from 'vue'
import router from '../router/index'

import { SchemaService } from '../services/schema.service'

const state = {
  schemas: [],
  current_type: '',
  pagination: {},
  setting_object: {},
  content: {}
}

const getters = {}

const mutations = {
  UPDATE_SCHEMAS_LIST: (state, schemas) => {
    state.schemas = schemas;
  },
  UPDATE_PAGINATE_INFO: (state, paginate) => {
    state.pagination = paginate
  },
  SET_CURRENT_TYPE: (state, type) => {
    state.current_type = type
  },
  UPDATE_CURRENT_SETTING_OBJECT: (state, schema) => {
    state.setting_object = schema
  },
  CURRENT_SCHEMA_CONTENT: (state, content) => {
    state.content = content
  }
}

const actions = {
  set_type: ({ commit }, type) => {
    commit('SET_CURRENT_TYPE', type)
  },
  index: async({ commit }, page = 1) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const response = await SchemaService.index(project_id, page)
    if(response.status === 200) {
      commit('UPDATE_SCHEMAS_LIST', response.data.data)
      commit('UPDATE_PAGINATE_INFO', response.data.paginate)
    }
  },
  create: async({ dispatch, state }, data) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const response = await SchemaService.create(project_id, data)
    if(response.status === 201) {
      Vue.$toast.success('Tạo mới thành công')
      dispatch('index', state.pagination.current_page)
      router.push('/schemas')
    }
  },
  show: async({ commit }, id) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const response = await SchemaService.show(project_id, id)
    if(response.status === 200) {
      commit('UPDATE_CURRENT_SETTING_OBJECT', response.data.data)
    }
  },
  destroy: async({ dispatch, state }, id) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const response = await SchemaService.destroy(project_id, id)
    if(response.status === 200) {
      Vue.$toast.success('Xóa thành công')
      dispatch('index', state.pagination.current_page)
    }
  },
  content: async({ commit }, id) => {
    const current_project = JSON.parse(localStorage.getItem('cprj'))
    const project_id = current_project.attributes.slug
    const response = await SchemaService.content(project_id, id)
    if(response.status === 200) {
      console.log(response.data)
      commit('CURRENT_SCHEMA_CONTENT', response.data)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}