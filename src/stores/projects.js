import { ProjectService } from '../services/project.service'

const state = {
  projects: [],
  current_project: {},
  setting_object: {},
  pagination: {}
}

const getters = {
  project_list: (state) => state.projects,
  current_project: (state) => state.current_project
}

const mutations = {
  UPDATE_PROJECT_LIST: (state, projects) => {
    state.projects = projects;
  },
  UPDATE_PAGINATE_INFO: (state, paginate) => {
    state.pagination = paginate
  },
  SET_CURRENT: (state, project) => {
    state.current_project = project
  },
  UPDATE_CURRENT_SETTING_OBJECT: (state, project) => {
    state.setting_object = project
  }
}

const actions = {
  get_list: async({ commit }, page = 1) => {
    const response = await ProjectService.index(page)
    if(response.status === 200) {
      commit('UPDATE_PROJECT_LIST', response.data.data)
      if (localStorage.getItem('cprj') !== undefined)
        commit('SET_CURRENT', response.data.data[0])
      commit('UPDATE_PAGINATE_INFO', response.data.paginate)
    }
  },
  set_current: ({ commit }, project) => {
    commit('SET_CURRENT', project)
    localStorage.setItem('cprj', JSON.stringify(project))
  },
  create: async({ dispatch }, data) => {
    const response = await ProjectService.create(data)
    if (response.status === 200) {
      dispatch('get_list', state.pagination.current_page)
    }
  },
  delete: async({ dispatch, state }, project) => {
    const response = await ProjectService.delete(project.attributes.slug)
    if (response.status === 200) {
      dispatch('get_list', state.pagination.current_page)
    }
  },
  show: async({ commit }, id) => {
    const response = await ProjectService.show(id)
    if (response.status === 200) {
      commit('UPDATE_CURRENT_SETTING_OBJECT', response.data.data)
    }
  },
  update: async({ state }) => {
    const { id, attributes } = state.setting_object
    const response = await ProjectService.update(id, attributes)
    if (response.status === 200) {
      dispatch('show', id)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}