import { api_v1 } from '../util/api_caller.util'

export class DeviceService {
  static async index(project_id, type_id, page) {
    const response = await api_v1.get(`/projects/${project_id}/device_types/${type_id}/devices?page=${page}`)
    if(response.status === 200) {
      return response
    }
  }

  static async show(project_id, type_id, device_id) {
    const response = await api_v1.get(`/projects/${project_id}/device_types/${type_id}/devices/${device_id}`)
    if(response.status === 200) {
      return response
    }
  }

  static async update(project_id, type_id, device_id, data) {
    const response = await api_v1.patch(`/projects/${project_id}/device_types/${type_id}/devices/${device_id}`, data)
    if(response.status === 200) {
      return response
    }
  }

  static async create(project_id, type_id, data) {
    const response = await api_v1.post(`/projects/${project_id}/device_types/${type_id}/devices`, data)
    if(response.status === 201) {
      return response
    }
  }

  static async destroy(project_id, type_id, device_id) {
    const response = await api_v1.delete(`/projects/${project_id}/device_types/${type_id}/devices/${device_id}`)
    if(response.status === 200) {
      return response
    }
  }

  static async state(project_id, type_id, device_id, state_id) {
    const response = await api_v1.get(`/projects/${project_id}/device_types/${type_id}/devices/${device_id}/states/${state_id}`)
    if(response.status === 200) {
      return response
    }
  }

  static async states(project_id, type_id, device_id) {
    const response = await api_v1.get(`/projects/${project_id}/device_types/${type_id}/devices/${device_id}/states`)
    if(response.status === 200) {
      return response
    }
  }
}