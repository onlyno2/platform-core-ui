import { DeviceTypeService } from '../services/device_type.service'

const state = {
  device_types: [],
  pagination: {}
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
  }
}

const actions = {
  get_list: async({ commit }, page = 1) => {
    let current_project = JSON.parse(localStorage.getItem('cprj'))
    const response = await DeviceTypeService.index(current_project.attributes.slug, page)
    if(response.status === 200) {
      console.log(response.data)
      commit('UPDATE_DEVICE_TYPE_LIST', response.data.data)
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