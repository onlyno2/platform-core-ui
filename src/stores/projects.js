import { ProjectService } from '../services/project.service'

const state = {
  projects: [],
  current_project: {},
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
  }
}

const actions = {
  get_list: async({ commit }, page = 1) => {
    const response = await ProjectService.index(page)
    if(response.status === 200) {
      commit('UPDATE_PROJECT_LIST', response.data.data)
      commit('UPDATE_PAGINATE_INFO', response.data.paginate)
    }
  },
  set_current: ({ commit }, project) => {
    commit('SET_CURRENT', project)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}